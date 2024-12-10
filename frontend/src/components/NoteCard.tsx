import { TNote } from '../lib/types'
import NoteModal from './NoteModal';
import useModal from '../hooks/useModal';
import Button from './Button';

type NoteCardProps = { 
  note: TNote
  onDelete: (noteId: string)=>void
  onArchive: (noteId: string)=>void
  onEdit: (callback: ()=>unknown)=>void
}

const Note = ({
    note, onDelete, onArchive, onEdit
}:NoteCardProps) => {

    const { title, content } = note
    const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <div className='card flex flex-col gap-4 justify-between'>
            <div className='flex flex-col gap-4 flex-grow'>
              <h3 className='font-medium'>{title}</h3>
              <hr />
              <div className="flex-grow flex items-center justify-center">
                <p className='text-center'>{content}</p>
              </div>
            </div>
            <div className='flex gap-2 max-sm:flex-col max-md:gap-1'>
                <Button type='edit' additionalStyles='sm:w-1/3' handleOnClick={openModal} />
                <Button type='archive' additionalStyles='sm:w-1/3' handleOnClick={()=> onArchive(note._id)} />
                <Button type='delete' additionalStyles='sm:w-1/3' handleOnClick={() => onDelete(note._id)} />
            </div>
      </div>

      <NoteModal type='edit' note={note} isOpen={isModalOpen} onClose={()=> onEdit(closeModal)}/>
    </>
  )
}

export default Note
