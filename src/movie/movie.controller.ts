import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

/**
 * Controller handling routes related to movies.
 */
@Controller('movies')
export class MovieController {
  /**
   * Creates an instance of the MovieController.
   * @param {MovieService} movieService - Service managing movie operations.
   */
  constructor(private readonly movieService: MovieService) {}

  /**
   * Endpoint to create a new movie.
   * @param {CreateMovieDto} createMovieDto - Data Transfer Object for movie creation.
   * @returns The created movie.
   */
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  /**
   * Endpoint to retrieve all movies with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of movies per page.
   * @returns An array of movies for the specified page and limit.
   */
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 10;
    return this.movieService.findAll(page, limit);
  }

  /**
   * Endpoint to retrieve a specific movie by its ID.
   * @param {string} id - The ID of the movie to retrieve.
   * @returns The movie with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  /**
   * Endpoint to update a specific movie by its ID.
   * @param {string} id - The ID of the movie to update.
   * @param {UpdateMovieDto} updateMovieDto - Data Transfer Object for movie update.
   * @returns The updated movie.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  /**
   * Endpoint to delete a specific movie by its ID.
   * @param {string} id - The ID of the movie to delete.
   * @returns The result of the deletion operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }

  /**
   * Endpoint to search movies by title or genre.
   * @param {string} query - The search query.
   * @returns An array of movies matching the search query.
   */
  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.movieService.search(query);
  }
}
