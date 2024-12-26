import React from "react";
import { GetMovieClipsDocument } from "@/__generated__/graphql";
import MovieClipsMenu from "../MovieClipsMenu";
import { getClient } from "@/lib/client";
import VideoPLayer from "../VideoPlayer";
import Loader from "../Loader";

async function MovieClip({
  id,
  selectedClip,
}: {
  id: string;
  selectedClip?: string;
}) {
  const { data, loading } = await getClient().query({
    query: GetMovieClipsDocument,
    variables: { getMovieClipsId: id },
  });

  if (loading) return <Loader size="lg" />;

  if (!data) {
    return null;
  }

  const { getMovieClips } = data;

  return (
    <div className="max-w-screen-2xl mx-auto md:py-4 -px-4 md:px-8 flex flex-col gap-4 w-full ">
      <div className="w-full h-full grow">
        <VideoPLayer
          videoId={
            getMovieClips.find((clip) => clip.id === selectedClip)?.key ||
            getMovieClips.length > 0
              ? getMovieClips[0].key
              : ""
          }
        />
      </div>

      <MovieClipsMenu clips={getMovieClips} movieId={id} />
    </div>
  );
}

export default MovieClip;
