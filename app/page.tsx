import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/types/movie";
import Link from "next/link";


async function getPopularMovies(page: number): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${page}`,
    { cache: "no-store"}
  );

  return response.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams

  const currentPage =
    params.page && !isNaN(Number(params.page))
      ? Number(params.page)
      : 1;

  console.log("Página actual:", currentPage);

  const data = await getPopularMovies(currentPage);
  const movies = data.results;
  const totalPages = data.total_pages

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Películas populares (Página {currentPage})
      </h1>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard 
          key={movie.id} 
          movie={movie} />
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        {currentPage > 1 ? (
          <Link 
          href={`/?page=${currentPage - 1}`} className="px-4 py-2 bg-gray-200 rounded">
            Anterior
          </Link>
        ) : (
          <div />
        )}

        {currentPage < totalPages ? (
          <Link 
          href={`/?page=${currentPage + 1}`} className="px-4 py-2 bg-gray-200 rounded">
            Siguiente
          </Link>
        ) : (
          <div />
        )}
      </div>

    </main>
  )
}