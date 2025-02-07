import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getAllMovies,
  getMovies,
  getMovieStatus,
  updateMovie,
} from "../features/movieSlice";

export default function EditMovie() {
  //USE NAVIGATE
  const navigate = useNavigate();

  //GETTING NAME WITH USEPARAM
  const { id } = useParams();

  //FORM DATA STATE
  const [formData, setFormData] = useState({
    name: "",
    director: "",
    genre: "",
  });

  //GET ALL MOVIES FROM STATE
  const movies = useSelector(getAllMovies);

  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //GETTING UPDATE STATUS FROM STORE
  const { updateStatus, fetchStatus } = useSelector(getMovieStatus);

  //FINDING THE MOVIE DETAILS WITH ID
  const foundMovie = movies.find((movie) => movie._id === id);

  //FETCHING MOVIES
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  //SETTING FORM VALUE
  useEffect(() => {
    if (foundMovie) {
      setFormData({
        name: foundMovie.name,
        director: foundMovie.director,
        genre: foundMovie.genre,
      });
    }
  }, [foundMovie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateMovie({ id: id, formData }));
      navigate(`/movies`);
    } catch (error) {
      console.log("Update Error: ", error);
    }
  };

  return (
    <>
      <main className="container my-4">
        {fetchStatus === "loading" && <p>Loading...</p>}
        <h1>Edit Movies</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="bookName" className="form-label">
              Movie Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <label htmlFor="author" className="form-label">
              Movie Director:
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={formData.director}
              onChange={(e) =>
                setFormData({ ...formData, director: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <label htmlFor="genre" className="form-label">
              Movie Genre:
            </label>
            <input
              type="text"
              className="form-control"
              id="genre"
              required
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
            />
          </div>
          <button
            className="btn btn-primary mt-4"
            disabled={updateStatus === "loading"}
          >
            {updateStatus === "loading" ? "Saving" : "Save Changes"}
          </button>
        </form>
      </main>
    </>
  );
}
