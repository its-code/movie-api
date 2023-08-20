import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsDateString()
  @IsOptional()
  @IsNotEmpty()
  releaseDate?: Date;

  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  genre?: string[];
}
