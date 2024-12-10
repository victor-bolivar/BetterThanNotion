import { Controller, Query, Get, Patch, Post, Delete, Req, Param, Body, UsePipes, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { CreateNoteDto, createNoteSchema } from './dto/create-note.dto';
import { NoteService } from './notes.service';
import { Note } from './schemas/notes.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { updateNoteSchema, UpdateNoteDto } from './dto/update-note.dto'
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe'

@Controller('notes')
export class NotesController {

  constructor(private notesService: NoteService){}

  @Get()
  async findNotes(
    @Req() request: Request,
    @Query('archived') archived?: string,
  ): Promise<Note[]>{
    try {
      const filter: any = {};
      if (archived !== undefined) {
        filter.archived = archived === 'true';
      }

        return this.notesService.findAll(filter)
    } catch (error) {
        throw new Error('Failed to fetch notes')
    }
  }

  @Post()
  async addNote(@Body(new ZodValidationPipe(createNoteSchema)) createNoteDto: CreateNoteDto){
    return this.notesService.create(createNoteDto)
  }

  @Patch(':id')
  async patchNote(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body(new ZodValidationPipe(updateNoteSchema)) updateNoteDto: UpdateNoteDto,
  ) {
    try {
      const updatedNote = await this.notesService.update(id, updateNoteDto);
      if (!updatedNote) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return updatedNote;
    } catch (error) {
      throw new Error(`Failed to update note with ID ${id}: ${error.message}`);
    }
  }

  @Delete(':id')
  async deleteNote(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<{ message: string }> {
    try {
      const result = await this.notesService.delete(id);
      if (!result) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return { message: `Note with ID ${id} has been deleted successfully` };
    } catch (error) {
      throw new Error(`Failed to update note with ID ${id}: ${error.message}`);
    }
  }
}