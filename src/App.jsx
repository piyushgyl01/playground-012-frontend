import { Link } from "react-router";

export default function App() {
  return (
    <main className="container text-center">
      <section className="my-4 row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <img
            src="https://tse3.mm.bing.net/th?id=OIG1.DbxL1fSwzMgtuw_Ok_fG&pid=ImgGn"
            alt="hero-img"
            className="img-fluid rounded"
          />
          <h1 className="mt-4">Find the movies you love!!</h1>
          <p>Get the collection of premium handpicked movies</p>
          <Link className="btn btn-primary" to={"/movies"}>View Movies</Link>
        </div>
        <div className="col-md-2"></div>
      </section>
      <section className="my-4 row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <img
            src="https://tse3.mm.bing.net/th?id=OIG1.iANhT9MYh6rOYYp17gk.&pid=ImgGn"
            alt="hero-img"
            className="img-fluid rounded"
          />
          <h1 className="mt-4">Recommend Movies!!</h1>
          <p>Add the movie recommendations to the community</p>
          <Link className="btn btn-primary" to={"/add-movie"}>Add movie</Link>
        </div>
        <div className="col-md-2"></div>
      </section>
    </main>
  );
}