"use client";

import { useEffect, useState } from "react";
import type { Movie } from "@/types/movie";

type MovieCardProps = {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const { id, title, poster_path } = movie;
    const [isFavorite, setIsFavorite] = useState(false);

    const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "/placeholder.png";

    useEffect(() => {
        async function checkFavorite() {
            const response = await fetch("/api/favorites");
            const favorites = await response.json();

            const isFav = favorites.some(
                (fav: { movieId: number }) => fav.movieId === movie.id
            );

            setIsFavorite(isFav);
        }

        checkFavorite()
    }, [movie.id]);

    return (
        <li className="flex flex-col items-center gap-2">
            <img
            src={imageUrl}
            alt={title}
            className="w-40 rounded"
            />

            <h2 className="text-center text-sm font-medium">
                {title}
            </h2>

            <button
            className="text-xl"
            onClick={async() => {
                if (isFavorite) {
                    await fetch("/api/favorites", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ movieId: movie.id }), 
                    });

                    setIsFavorite(false);
                } else {
                    await fetch("/api/favorites", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ movieId: movie.id }),
                });

                setIsFavorite(true);
                }
              }}


              
            >
                {isFavorite ? "❤️" : "🤍"}
            </button>
        </li>
    );
}