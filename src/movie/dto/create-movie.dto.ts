import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @IsArray()
  @IsNotEmpty()
  genre: string[];
}
