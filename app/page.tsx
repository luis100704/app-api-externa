type Movie = {
  id: number;
  title: string;
};

async function getPopularMovies(): Promise<Movie[]> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`
  );

  const data = await response.json();
  return data.results;
}

export default async function HomePage() {
  const movies = await getPopularMovies();

  return (
    <main>
      <h1>Películas populares</h1>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </main>
  )
}