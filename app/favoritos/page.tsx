"use client"
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import type { Movie } from "@/types/movie";

export default function FavoritosPage() {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");

        if(!storedFavorites) return;

        const favoritesIds = JSON.parse(storedFavorites);

        async function fetchfavoriteMovies() {
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

            const movies = await Promise.all(
                favoritesIds.map(async (id: number) => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`
                    );
                    return response.json();
                })
            );

            setFavoriteMovies(movies);
        }

        fetchfavoriteMovies();
    }, []);

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold">Mis películas favoritas</h1>

            {favoriteMovies.length === 0 ? (
                <p>No tienes películas favoritas todavía.</p>
            ) : (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {favoriteMovies.map((movie) => (
                        <MovieCard
                        key={movie.id}
                        movie={movie}
                        />
                    ))}
                </ul>
            )}
        </main>
    );
}