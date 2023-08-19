import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './../schemas/genre.schema';
import { Movie } from './../schemas/movie.schema';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<Genre>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const createdGenre = new this.genreModel(createGenreDto);
    return await createdGenre.save();
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreModel.find().exec();
  }

  async findOne(id: string): Promise<Genre> {
    return await this.genreModel.findById(id).exec();
  }

  async remove(id: string): Promise<void> {
    const genre = await this.genreModel.findByIdAndDelete(id).exec();

    if (genre) {
      await this.movieModel
        .updateMany({ genre: genre.name }, { $pull: { genre: genre.name } })
        .exec();
    }
  }
}
