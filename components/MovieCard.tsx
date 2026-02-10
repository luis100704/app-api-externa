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
        const storedFavorites = localStorage.getItem("favorites");
    
        if (storedFavorites) {
            const favoritesIds = JSON.parse(storedFavorites);
            setIsFavorite(favoritesIds.includes(id));
        }
    }, [id]);
    

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
            onClick={() => {
                const storedFavorites = localStorage.getItem("favorites");
                let favoritesIds = storedFavorites ? JSON.parse(storedFavorites) : [];
              
                if (favoritesIds.includes(id)) {
                  favoritesIds = favoritesIds.filter((favId: number) => favId !== id);
                  setIsFavorite(false);
                } else {
                  favoritesIds.push(id);
                  setIsFavorite(true);
                }
              
                localStorage.setItem("favorites", JSON.stringify(favoritesIds));
              }}
              
            className="text-xl"
            >
                {isFavorite ? "❤️" : "🤍"}
            </button>
        </li>
    );
}