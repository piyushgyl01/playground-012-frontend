import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMovies,
  deleteMovie,
  getMovieStatus,
  getMovies,
} from "./movieSlice";
import { Link } from "react-router";

export default function MovieList() {
  //DELETE ID
  const [deletingId, setDeletingId] = useState(null);

  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //GET ALL MOVIES
  const movies = useSelector(getAllMovies);

  //GET STATUS STATES FROM STORE
  const { fetchStatus, deleteStatus } = useSelector(getMovieStatus);

  //FETCHING DATA USING USE EFFECT
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  //HANDLE DELTE FUNCTION
  const handleDelete = async (bookId) => {
    setDeletingId(bookId);
    await dispatch(deleteMovie(bookId));
    setDeletingId(null);
  };

  return (
    <>
      <ul className="list-group">
        {fetchStatus === "loading" && <p>Loading</p>}
        {fetchStatus === "error" && (
          <p>Error occured while fetching the movies</p>
        )}
        {deleteStatus === "error" && (
          <p>Error occured while deleting the movie</p>
        )}
        {movies.length === 0 && <p>No book found</p>}
        {movies.map((movie) => (
          <li className="list-group-item" key={movie._id}>
            {movie.name} by {movie.director} in {movie.genre}
            <Link className="btn btn-primary btn-sm ms-2" to={`/movies/${movie._id}/${movie.name}/edit-movie`}>Edit</Link>
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => handleDelete(movie._id)}
              disabled={deletingId === movie._id}
            >
              {deletingId === movie._id ? "Deleting" : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
