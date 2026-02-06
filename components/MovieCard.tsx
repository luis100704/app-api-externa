type MovieCardProps = {
    title: string;
    posterPath: string | null;
}

export default function MovieCard({ title, posterPath }: MovieCardProps) {
    const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w300${posterPath}`
    : "/placeholder.png";

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
        </li>
    );
}