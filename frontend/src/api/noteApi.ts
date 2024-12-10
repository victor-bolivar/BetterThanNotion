import { TNote } from "../lib/types";

type NoteStatus = 'all' | 'active' | 'archived';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchNotes = async (status: NoteStatus = 'all'): Promise<any> => {

  let endpoint = '/notes';
  if (status === 'active') {
    endpoint += '?archived=false';
  } else if (status === 'archived') {
    endpoint += '?archived=true';
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Error fetching notes: ${response.statusText}`);
    }

    const notes: TNote[] = await response.json();
    return notes
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error; // TODO implement/throw custom errors
  }
};

export const createNote = async (title: string, content: string): Promise<TNote> => {
  const endpoint = '/notes';

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content}),
    });

    if (!response.ok) {
      throw new Error(`Error creating note: ${response.statusText}`);
    }

    const createdNote: TNote = await response.json();
    return createdNote;
  } catch (error) {
    console.error('Failed to create note:', error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<unknown> => {
  const endpoint = `/notes/${id}`;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting note: ${response.statusText}`);
    }

    const deleteResponse: unknown = await response.json();
    return deleteResponse;

  } catch (error) {
    console.error('Failed to delete note:', error);
    throw error;
  }
};

export const patchNote = async (
  id: string,
  updates: Partial<{ title: string; content: string; archived: boolean }>
): Promise<TNote> => {
  const endpoint = `/notes/${id}`;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Error updating note: ${response.statusText}`);
    }

    const updatedNote: TNote = await response.json();
    return updatedNote;
  } catch (error) {
    console.error('Failed to update note:', error);
    throw error;
  }
};

export const archiveNote = async (noteId: string) =>{
  const response = await patchNote(noteId, {archived: true})
  return response
}