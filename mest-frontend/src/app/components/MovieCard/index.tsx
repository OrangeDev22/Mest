import React from "react";
import { upperFirst } from "lodash";
import Link from "next/link";
import { MovieType } from "@/__generated__/graphql";
import MovieButtons from "../MovieButtons";

interface Props {
  movie: Pick<MovieType, "id" | "title" | "poster_path">;
}

function MovieCard({ movie }: Props) {
  return (
    <div className="card card-compact max-w-2xs bg-base-100 shadow-xl aspect-[80/121] mx-auto">
      <Link href={`/movie/${movie.id}`}>
        <div className="rounded-lg h-full flex flex-col h-full">
          <figure className="w-full min-h-[450px] bg-neutral-500">
            {movie.poster_path && (
              <img
                src={movie.poster_path}
                className="h-full w-full"
                alt={`${movie.title}_poster`}
              />
            )}
          </figure>
          <div className="card-body w-full mt-auto self-end !py-2 mt-auto">
            <h2 className="card-title truncate">{upperFirst(movie.title)}</h2>
          </div>
        </div>
      </Link>
      <MovieButtons id={movie.id} />
    </div>
  );
}

export default MovieCard;
