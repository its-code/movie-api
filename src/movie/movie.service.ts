import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './../schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

/**
 * Service managing operations related to movies.
 */
@Injectable()
export class MovieService {
  /**
   * Creates an instance of the MovieService.
   * @param {Model<Movie>} movieModel - The Mongoose model for movies.
   */
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  /**
   * Creates a new movie.
   * @param {CreateMovieDto} createMovieDto - Data Transfer Object for movie creation.
   * @returns {Promise<Movie>} A promise that resolves to the created movie.
   */
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    return await createdMovie.save();
  }

  /**
   * Retrieves all movies with pagination.
   * @param {number} page - The page number (default is 1).
   * @param {number} limit - The number of movies per page (default is 10).
   * @returns {Promise<Movie[]>} A promise that resolves to an array of movies.
   */
  async findAll(page: number = 1, limit: number = 10): Promise<Movie[]> {
    const skip = (page - 1) * limit;
    return await this.movieModel.find().skip(skip).limit(limit).exec();
  }

  /**
   * Retrieves a specific movie by its ID.
   * @param {string} id - The ID of the movie to retrieve.
   * @returns {Promise<Movie>} A promise that resolves to the retrieved movie.
   */
  async findOne(id: string): Promise<Movie> {
    return await this.movieModel.findById(id).exec();
  }

  /**
   * Updates a specific movie by its ID.
   * @param {string} id - The ID of the movie to update.
   * @param {UpdateMovieDto} updateMovieDto - Data Transfer Object for movie update.
   * @returns {Promise<Movie>} A promise that resolves to the updated movie.
   */
  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
  }

  /**
   * Deletes a specific movie by its ID.
   * @param {string} id - The ID of the movie to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion operation is complete.
   */
  async remove(id: string): Promise<void> {
    await this.movieModel.findByIdAndDelete(id).exec();
  }

  /**
   * Searches movies by title or genre.
   * @param {string} query - The search query.
   * @returns {Promise<Movie[]>} A promise that resolves to an array of movies matching the search query.
   */
  async search(query: string): Promise<Movie[]> {
    return await this.movieModel
      .find({
        $or: [
          { title: new RegExp(query, 'i') },
          { genre: new RegExp(query, 'i') },
        ],
      })
      .exec();
  }
}
