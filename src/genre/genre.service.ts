import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from '@schemas/genre.schema';
import { Movie } from '@schemas/movie.schema';
import { CreateGenreDto } from './dto/create-genre.dto';

/**
 * Service managing operations related to genres.
 */
@Injectable()
export class GenreService {
  /**
   * Creates an instance of the GenreService.
   * @param {Model<Genre>} genreModel - The Mongoose model for genres.
   * @param {Model<Movie>} movieModel - The Mongoose model for movies.
   */
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<Genre>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) {}

  /**
   * Creates a new genre.
   * @param {CreateGenreDto} createGenreDto - Data Transfer Object for genre creation.
   * @returns {Promise<Genre>} A promise that resolves to the created genre.
   */
  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const createdGenre = new this.genreModel(createGenreDto);
    return await createdGenre.save();
  }

  /**
   * Retrieves all genres.
   * @returns {Promise<Genre[]>} A promise that resolves to an array of genres.
   */
  async findAll(): Promise<Genre[]> {
    return await this.genreModel.find().exec();
  }

  /**
   * Retrieves a specific genre by its ID.
   * @param {string} id - The ID of the genre to retrieve.
   * @returns {Promise<Genre>} A promise that resolves to the retrieved genre.
   */
  async findOne(id: string): Promise<Genre> {
    return await this.genreModel.findById(id).exec();
  }

  /**
   * Deletes a specific genre by its ID and removes the genre from associated movies.
   * @param {string} id - The ID of the genre to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion operation is complete.
   */
  async remove(id: string): Promise<void> {
    const genre = await this.genreModel.findByIdAndDelete(id).exec();

    if (genre) {
      await this.movieModel
        .updateMany({ genre: genre.name }, { $pull: { genre: genre.name } })
        .exec();
    }
  }
}
