-- CreateTable
CREATE TABLE "FavoriteMovie" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteMovie_movieId_key" ON "FavoriteMovie"("movieId");
