"use client";

import { useEffect, useState } from "react";

type MovieCardProps = {
    id: number;
    title: string;
    posterPath: string | null;
}

export default function MovieCard({ id, title, posterPath }: MovieCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w300${posterPath}`
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