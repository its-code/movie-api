import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './../schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    return await createdMovie.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Movie[]> {
    const skip = (page - 1) * limit;
    return await this.movieModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Movie> {
    return await this.movieModel.findById(id).exec();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.movieModel.findByIdAndDelete(id).exec();
  }

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
