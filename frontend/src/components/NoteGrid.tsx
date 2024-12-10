import NoteCard from "./NoteCard"
import { TNote } from '../lib/types'

type NoteGridProps = {
    isLoading: boolean
    isError: boolean
    data: TNote[]
    handleDelete: (noteId: string) => Promise<void>
    handleArchive: (noteId: string) => Promise<void>
    handleEdit: (callback: () => unknown) => Promise<void>
}

const NoteGrid = ({
    isLoading, isError, data, handleDelete, handleArchive, handleEdit
}: NoteGridProps) => {
  return (
    <div className="mt-6 flex flex-wrap max-sm:flex-col justify-center w-full mx-auto gap-4">

        {isLoading && <p className="mt-40">Loading data...</p>}

        {isError && <p className="mt-40">Failed to load notes :/</p>}

        {!isLoading && !isError && data && data.length > 0 && 
        data.map((note) => <NoteCard key={note._id} note={note} onDelete={handleDelete} onArchive={handleArchive} onEdit={handleEdit} />)
        }

        {!isLoading && !isError && data && data.length === 0 && 
        <p className="mt-40">No active notes found.</p>
        }
    </div>
  )
}

export default NoteGrid
