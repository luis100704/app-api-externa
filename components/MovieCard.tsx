type MovieCardProps = {
    title: string;
}

export default function MovieCard({ title }: MovieCardProps) {
    return (
        <li>
            {title}
        </li>
    );
}