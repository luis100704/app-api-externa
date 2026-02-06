import MovieCard from "@/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
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
    <main className="p-4">
      <h1>Películas populares</h1>

      <ul>
        {movies.map((movie) => (
          <MovieCard 
          key={movie.id} 
          title={movie.title}
          posterPath={movie.poster_path} />
        ))}
      </ul>
    </main>
  )
}