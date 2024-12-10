import { z } from 'zod';
import { TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, CONTENT_MIN_LENGTH, CONTENT_MAX_LENGTH } from '../constant/validation.constants';

export const createNoteSchema = z
  .object({
    title: z
        .string({required_error: "A title is required"})
        .min(TITLE_MIN_LENGTH, { message: `Must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters long` })
        .max(TITLE_MAX_LENGTH, { message: `Must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters long` }),
    content: z
        .string({required_error: "Content is required"})
        .min(CONTENT_MIN_LENGTH, { message: `Must be between ${CONTENT_MIN_LENGTH} and ${CONTENT_MAX_LENGTH} characters long` })
        .max(CONTENT_MAX_LENGTH, { message: `Must be between ${CONTENT_MIN_LENGTH} and ${CONTENT_MAX_LENGTH} characters long` }),
  })
  .required();

export type CreateNoteDto = z.infer<typeof createNoteSchema>;