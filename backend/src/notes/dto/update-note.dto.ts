import { z } from 'zod';
import { TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, CONTENT_MIN_LENGTH, CONTENT_MAX_LENGTH } from '../constant/validation.constants';

export const updateNoteSchema = z.object({
  title: z
    .string()
    .min(TITLE_MIN_LENGTH, { message: `Must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters long` })
    .max(TITLE_MAX_LENGTH, { message: `Must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters long` })
    .optional(),
  content: z
    .string()
    .min(CONTENT_MIN_LENGTH, { message: `Must be between ${CONTENT_MIN_LENGTH} and ${CONTENT_MAX_LENGTH} characters long` })
    .max(CONTENT_MAX_LENGTH, { message: `Must be between ${CONTENT_MIN_LENGTH} and ${CONTENT_MAX_LENGTH} characters long` })
    .optional(),
  archived: z.boolean().optional()
});

export type UpdateNoteDto = z.infer<typeof updateNoteSchema>;
