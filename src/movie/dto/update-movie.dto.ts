import {
  IsArray,
  IsDateString,
  //IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  releaseDate?: Date;

  @IsArray()
  @IsOptional()
  genre?: string[];
}
