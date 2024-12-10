import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NoteService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/notes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [NoteService]
})
export class NotesModule {}