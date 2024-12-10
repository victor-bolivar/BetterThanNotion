import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/notes.schema';
import { Model } from 'mongoose';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel({
        title: createNoteDto.title,
        content: createNoteDto.content,
        archived: false
    });
    return createdNote.save();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note | null> {
    return this.noteModel.findByIdAndUpdate(id, updateNoteDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.noteModel.findByIdAndDelete(id);
    return result ? true : false;
  }

  async findAll(filter: any = {}): Promise<Note[]> {
    return this.noteModel.find(filter).exec();
  }
}