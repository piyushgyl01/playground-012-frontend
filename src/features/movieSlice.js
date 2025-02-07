import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const response = await axios.get(
      "https://playground-012-backend.vercel.app/movies"
    );

    return response.data;
  } catch (error) {
    console.error("Get Error: ", error);
    throw error;
  }
});

export const postMovies = createAsyncThunk(
  "movies/postMovie",
  async (formData) => {
    try {
      const response = await axios.post(
        "https://playground-012-backend.vercel.app/movies",
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Post Error: ", error);
      throw error;
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `https://playground-012-backend.vercel.app/movies/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Update Error: ", error);
      throw error;
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id) => {
    try {
      const response = await axios.delete(
        `https://playground-012-backend.vercel.app/movies/${id}`
      );

      return { id };
    } catch (error) {
      console.error("Delete Error: ", error);
      throw error;
    }
  }
);

export const movieSlice = createSlice({
  name: "Movies",
  initialState: {
    movies: [],
    fetchStatus: "idle",
    error: null,
    addStatus: "idle",
    deleteStatus: "idle",
    updateStatus: "idle",
  },
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(getMovies.pending, (state) => {
      state.fetchStatus = "loading";
    })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.error = action.error.message;
      })
      .addCase(postMovies.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(postMovies.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.movies.push(action.payload);
      })
      .addCase(postMovies.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      })
      .addCase(updateMovie.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.updateStatus = "success";
        const updatedMovie = action.payload.movie;
        const movieIndex = state.movies.findIndex(
          (movie) => movie._id === updatedMovie._id
        );
        if (movieIndex !== -1) {
          state.movies[movieIndex] = updatedMovie;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload.id
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.deleteStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getMovieStatus = createSelector(
  (state) => state.movies.fetchStatus,
  (state) => state.movies.addStatus,
  (state) => state.movies.deleteStatus,
  (state) => state.movies.updateStatus,

  (fetchStatus, addStatus, deleteStatus, updateStatus) => ({
    fetchStatus,
    addStatus,
    deleteStatus,
    updateStatus,
  })
);

export default movieSlice.reducer;
