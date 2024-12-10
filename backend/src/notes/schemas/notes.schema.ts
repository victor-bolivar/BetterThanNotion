
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  archived: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
