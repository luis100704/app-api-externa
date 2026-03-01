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

  if (!response.ok) {
    throw new Error("Error al obtener películas");
  }

  return response.json();
}

async function searchMovies(page: number, search: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${search}&page=${page}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener películas");
  }

  return response.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams
  const searchQuery = params.search;

  const currentPage =
    params.page && !isNaN(Number(params.page))
      ? Number(params.page)
      : 1;

  let data: { results: Movie[]; total_pages: number};

  if(searchQuery) {
    data = await searchMovies(currentPage, searchQuery);
  } else {
    data = await getPopularMovies(currentPage);
  }

  const movies = data.results;
  const totalPages = data.total_pages

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Películas populares (Página {currentPage})
      </h1>

      <form className="mb-4">
        <input
        type="text"
        name="search"
        placeholder="Buscar película..."
        defaultValue={searchQuery || ""}
        className="border px-3 py-2 rounded w-full"
      />
      </form>

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