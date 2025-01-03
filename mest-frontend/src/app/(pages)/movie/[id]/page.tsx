import React from "react";
import { GetOneMmovieDocument } from "@/__generated__/graphql";
import { getClient } from "../../../../../lib/graphql-client";
import MovieClip from "@/app/components/MovieClip";
import MovieDetailsCard from "@/app/components/MovieDetailsCard";
import SimilarMovies from "@/app/components/SimilarMovies";

async function Movie({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await getClient().query({
    query: GetOneMmovieDocument,
    variables: { getOneMmovieId: params.id },
  });

  const selectedClip =
    typeof searchParams.selectedClip === "string"
      ? searchParams.selectedClip
      : "";

  const {
    getOneMmovie: {
      id,
      title,
      poster_path,
      overview,
      original_title,
      genres,
      vote_average,
      release_date,
      production_companies,
    },
  } = data;

  return (
    <div className="flex flex-col space-y-4">
      <MovieClip id={id} selectedClip={selectedClip} />
      <div className="p-4 md:p-0">
        <MovieDetailsCard
          id={id}
          title={title}
          image={poster_path}
          details={overview}
          originalTitle={original_title}
          genres={
            genres?.map(({ name, id }) => {
              return { id: +id, name };
            }) || []
          }
          score={vote_average}
          released={release_date}
          studio={
            production_companies && production_companies.length > 0
              ? production_companies[0].name
              : ""
          }
        />
        <SimilarMovies movieId={id} />
      </div>
    </div>
  );
}

export default Movie;
