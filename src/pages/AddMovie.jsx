import { useDispatch, useSelector } from "react-redux";
import { postMovies, getMovieStatus } from "../features/movieSlice.js";
import { useEffect, useState } from "react";

export default function AddMovie() {
  //FORM DATA STATE
  const [formData, setFormData] = useState({
    name: "",
    director: "",
    genre: "",
  });

  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //GETTING ADD STATUS FROM STORE
  const addStatus = useSelector((state) => state.movies.addStatus);

  //HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(postMovies(formData));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //RESET FORM WHEN DATA ADDED
  useEffect(() => {
    if (addStatus === "success") {
      setFormData({
        name: "",
        director: "",
        genre: "",
      });
    }
  }, [addStatus, dispatch]);

  return (
    <>
      <main className="container my-4">
        <h1>Add Movies</h1>
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
            disabled={addStatus === "loading"}
          >
            {addStatus === "loading" ? "Adding" : "Add Movie"}
          </button>
        </form>
      </main>
    </>
  );
}
