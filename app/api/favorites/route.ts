import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const favorites = await prisma.favoriteMovie.findMany();
    return NextResponse.json(favorites);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { movieId } = body;

    const favorite = await prisma.favoriteMovie.create({
        data: {
            movieId,
        }, 
    });

    return NextResponse.json(favorite);
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const { movieId } = body;

    await prisma.favoriteMovie.delete({
        where: {
            movieId,
        },
    });

    return NextResponse.json({ message: "Favorito eliminado"})
}