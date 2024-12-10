
import { TNote } from "../lib/types"
import NoteCard from "../components/NoteCard"
import { fetchNotes } from "../api/noteApi";
import Button from "../components/Button";
import useModal from "../hooks/useModal";
import NoteModal from "../components/NoteModal";
import { deleteNote, archiveNote } from "../api/noteApi";
import useFetch from "../hooks/useFetch";

// TODO show a toast after creating/editing/deleting/archiving a note

type NotesContentProps = {
  noteStatus: "active" | "archived"
}

const NotesContent = ({ noteStatus }:NotesContentProps) => {

  const { isModalOpen:isAddNoteOpen, openModal:openAddNote, closeModal:closeAddNote } = useModal()

  const { data, isLoading, isError, manuallyTriggerFetchData } = useFetch([], async ()=> await fetchNotes(noteStatus), [isAddNoteOpen])

  const handleDelete = async (noteId: string) => {
    // TODO a nice dialog to confirm the deletion
    await deleteNote(noteId) 
    manuallyTriggerFetchData() 
  }

  const handleArchive = async (noteId: string) => {
    await archiveNote(noteId) 
    manuallyTriggerFetchData() 
  }

  const handleEdit = async (callback:()=>unknown) => {
    await callback()
    manuallyTriggerFetchData() 
  }

  return (
    <>
      <div>
          <div className="flex gap-3 max-md:flex-col justify-between w-full items-center">
            <div className="max-md:w-full">
              <h1 className="h1">
                { noteStatus==="active" ? 'Because your brain is for having ideas, not storing them'
                                        : 'Here are your archived notes' }
              </h1>
              <p>
                {
                  noteStatus==="active" ? 'Store, edit or delete, your choice'
                                        : 'Don&apos;t worry, we&apos;ll keep them warm and safe'
                }
              </p>
            </div>
            <div className="max-md:w-full max-w-1/3">
              <Button type="add" additionalStyles="max-md:w-full" handleOnClick={openAddNote} />
            </div>
          </div>

          {/* TODO put this in a CardGrid.tsx ? So it becomes reusable for /archive too */}
          <div className="mt-6 flex flex-wrap max-sm:flex-col justify-center w-full mx-auto gap-4">

              {isLoading && <p className="mt-40">Loading data...</p>}

              {isError && <p className="mt-40">Failed to load notes :/</p>}

              {!isLoading && !isError && data && data.length > 0 && 
                data.map((note: TNote) => <NoteCard key={note._id} note={note} onDelete={handleDelete} onArchive={handleArchive} onEdit={handleEdit} />)
              }

              {!isLoading && !isError && data && data.length === 0 && 
                <p className="mt-40">No {noteStatus} notes found.</p>
              }
          </div>
      </div>

      <NoteModal type={'add'} isOpen={isAddNoteOpen} onClose={closeAddNote} />
    </>
  )
}

export default NotesContent
