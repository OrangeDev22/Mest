import { HttpException, Injectable } from '@nestjs/common';
import { MovieType } from './entities/movie.entity';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MoviesService {
  private readonly endpoint = process.env.API_URL;
  private readonly accessToken = process.env.ACCESS_TOKEN;
  private readonly imageEndpoint = process.env.IMAGES_API_URL;

  constructor(private readonly httpService: HttpService) {}

  async fetchMovies(): Promise<String> {
    console.log('fetching movies');
    return 'these movies';
  }

  async getTrendingMovies(): Promise<MovieType[]> {
    const data = await firstValueFrom(
      this.httpService
        .get(`${this.endpoint}/trending/movie/day?language=en-US`, {
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

    return data.map((movie) => {
      return {
        ...movie,
        backdrop_path: `${this.imageEndpoint}/original/${movie.backdrop_path}`,
      };
    });
  }

  // curl --request GET \
  //    --url 'https://api.themoviedb.org/3/trending/movie/day?language=en-US' \
  //    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDZmY2ViZjIzYTgxMjY2OWJiY2M4Y2ZmYjhkZjk5MyIsInN1YiI6IjY1MzA5ZDE2NTFhNjRlMDBjOGZkOWJlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59Fsd9dZdPtm32n27ndEzhrKtMAUfbyFqXPHVmsjutI' \
  //    --header 'accept: application/json'
}
