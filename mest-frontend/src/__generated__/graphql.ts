/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type MovieType = {
  __typename?: 'MovieType';
  adult: Scalars['Boolean']['output'];
  backdrop_path: Scalars['String']['output'];
  genre_ids?: Maybe<Array<Scalars['ID']['output']>>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  media_type: Scalars['String']['output'];
  original_language: Scalars['String']['output'];
  original_title: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  popularity: Scalars['Float']['output'];
  poster_path: Scalars['String']['output'];
  release_date: Scalars['String']['output'];
  title: Scalars['String']['output'];
  video: Scalars['Boolean']['output'];
  vote_average: Scalars['Float']['output'];
  vote_count: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getOneMmovie: MovieType;
  getSimilarMovies: Array<MovieType>;
  getTrendingMovies: Array<MovieType>;
  searchMovie: Array<MovieType>;
};


export type QueryGetOneMmovieArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSimilarMoviesArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTrendingMoviesArgs = {
  page: Scalars['Float']['input'];
};


export type QuerySearchMovieArgs = {
  search: Scalars['String']['input'];
};

export type QueryQueryVariables = Exact<{
  page: Scalars['Float']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', getTrendingMovies: Array<{ __typename?: 'MovieType', id: string, adult: boolean, backdrop_path: string, title: string, original_language: string, original_title: string, overview: string, poster_path: string, media_type: string, genre_ids?: Array<string> | null, popularity: number, release_date: string, video: boolean, vote_average: number, vote_count: number, genres?: Array<{ __typename?: 'Genre', id: string, name: string }> | null }> };


export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTrendingMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adult"}},{"kind":"Field","name":{"kind":"Name","value":"backdrop_path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"original_language"}},{"kind":"Field","name":{"kind":"Name","value":"original_title"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"poster_path"}},{"kind":"Field","name":{"kind":"Name","value":"media_type"}},{"kind":"Field","name":{"kind":"Name","value":"genre_ids"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"popularity"}},{"kind":"Field","name":{"kind":"Name","value":"release_date"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"vote_average"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;