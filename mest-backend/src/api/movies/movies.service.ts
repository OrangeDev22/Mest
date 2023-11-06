import { HttpException, Injectable } from '@nestjs/common';
import { MovieType } from './entities/movie.entity';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { MovieClip } from './entities/movieClip.entity';

@Injectable()
export class MoviesService {
  private readonly endpoint = process.env.API_URL;
  private readonly accessToken = process.env.ACCESS_TOKEN;
  private readonly imageEndpoint = process.env.IMAGES_API_URL;

  constructor(private readonly httpService: HttpService) {}

  validateMovie = (data: MovieType, imageSize?: number) => {
    return {
      ...data,
      poster_path: data.poster_path
        ? `${this.imageEndpoint}/${imageSize ? `w${imageSize}` : 'w300'}${
            data.poster_path
          }`
        : '',
      media_type: data.media_type || '',
      backdrop_path: data.backdrop_path
        ? `${this.imageEndpoint}/${imageSize ? imageSize : 'w300'}${
            data.backdrop_path
          }`
        : '',
    };
  };

  remapDataWithImages = (data: MovieType[], imageSize?: number) => {
    console.log('--image size', imageSize);
    return data.map((movie) => {
      return this.validateMovie(movie, imageSize);
    });
  };

  async getOneMovie(id: number): Promise<MovieType> {
    console.log('--value', this.endpoint);
    const data = await firstValueFrom(
      this.httpService
        .get(`${this.endpoint}/movie/${id}?language=en-US`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .pipe(
          map((response) => {
            return response.data as MovieType;
          }),
          catchError((error) => {
            console.log('--error', error.message);
            return throwError(
              () => new HttpException(JSON.stringify(error.message), 400),
            );
          }),
        ),
    );
    return this.validateMovie(data);
  }

  async getSimilarMovies(id: number): Promise<MovieType[]> {
    const data = await firstValueFrom(
      this.httpService
        .get(`${this.endpoint}/movie/${id}/similar?language=en-US`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .pipe(
          map((response) => {
            // console.log('--data', response.data);
            return response.data.results as MovieType[];
          }),
          catchError((error) => {
            console.log('--error', error.message);
            return throwError(
              () => new HttpException(JSON.stringify(error.message), 400),
            );
          }),
        ),
    );
    return this.remapDataWithImages(data);
  }

  async searchMovie(search: String): Promise<MovieType[]> {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${this.endpoint}/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
        .pipe(
          map((response) => {
            return response.data.results as MovieType[];
          }),
          catchError((error) => {
            console.log('--error', error.message);
            return throwError(
              () => new HttpException(JSON.stringify(error.message), 400),
            );
          }),
        ),
    );
    return this.remapDataWithImages(data);
  }

  async getTrendingMovies(page: number): Promise<MovieType[]> {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${this.endpoint}/trending/movie/day?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
        .pipe(
          map((response) => {
            return response.data.results as MovieType[];
          }),
          catchError((error) => {
            console.log('--error', error.message);
            return throwError(
              () => new HttpException(JSON.stringify(error.message), 400),
            );
          }),
        ),
    );
    return this.remapDataWithImages(data);
  }

  async getTopTrendingMovies() {
    const data = await firstValueFrom(
      this.httpService
        .get(`${this.endpoint}/trending/movie/day?sort_by=vote_average.desc`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .pipe(
          map((response) => {
            return response.data.results as MovieType[];
          }),
          catchError((error) => {
            console.log('--error', error.message);
            return throwError(
              () => new HttpException(JSON.stringify(error.message), 400),
            );
          }),
        ),
    );
    return this.remapDataWithImages(data, 200).slice(0, 10);
  }
  //https://api.themoviedb.org/3/movie/{movie_id}/videos
  async getMovieCLip(id: number) {
    const data = await firstValueFrom(
      this.httpService
        .get(`${this.endpoint}/movie/${id}/videos`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .pipe(
          map((response) => {
            return response.data.results as MovieClip[];
          }),
          catchError((error) => {
            return throwError(
              () => new HttpException(JSON.stringify(error.message), 400),
            );
          }),
        ),
    );
    // console.log('--length', this.remapDataWithImages(data, 200).length);
    return data.filter(({ site }) => site !== 'Youtube');
  }
}
