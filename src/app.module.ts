import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/movie-api'),
    MovieModule,
    GenreModule,
  ],
})
export class AppModule {}
