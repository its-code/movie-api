import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';

/**
 * Controller handling routes for 'genres'.
 */
@Controller('genres')
export class GenreController {
  /**
   * Creates an instance of the GenreController.
   * @param {GenreService} genreService - Service handling genre operations.
   */
  constructor(private readonly genreService: GenreService) {}

  /**
   * Endpoint to create a new genre.
   * @param {CreateGenreDto} createGenreDto - Data Transfer Object for genre creation.
   * @returns The created genre.
   */
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  /**
   * Endpoint to retrieve all genres.
   * @returns An array of all genres.
   */
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  /**
   * Endpoint to retrieve a specific genre by its ID.
   * @param {string} id - The ID of the genre to retrieve.
   * @returns The genre with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  /**
   * Endpoint to delete a specific genre by its ID.
   * @param {string} id - The ID of the genre to delete.
   * @returns The result of the deletion operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(id);
  }
}
