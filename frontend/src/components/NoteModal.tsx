import ReactDOM from 'react-dom';
import { TNote } from '../lib/types'
import { useForm, SubmitHandler } from "react-hook-form"
import { CONTENT_MAX_LENGTH, CONTENT_MIN_LENGTH, TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from '../lib/constants'
import Button from './Button'
import { createNote, patchNote } from '../api/noteApi';
import useClickOutsideModal from '../hooks/useClickOutsideModal'
import Input from './Input';

type NoteModalProps = {
    type: 'edit'
    note: TNote
    isOpen: boolean
    onClose: () => void
  } | {
    type: 'add'
    note?: undefined
    isOpen: boolean
    onClose: () => void
}
type TFormInput = {
  title: string
  content: string
}

const NoteModal = ({ type, note={ _id:'', title:'', content:'', archived: false}, isOpen, onClose }:NoteModalProps) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormInput>()

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    if(type === "add"){
      await createNote(data.title, data.content);
    } else if(type==="edit"){
      await patchNote(note._id, { title: data.title, content: data.content })
    }
    reset()
    onClose();
  }

  // to handle clicks outside modal content
  const modalContentRef = useClickOutsideModal(onClose)

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div>
      <div className="fixed z-50 flex items-center inset-0 w-full h-full bg-black bg-opacity-80">

        <div
          className="mx-auto card bg-white"
          ref={modalContentRef}
          >
            <h1 className='h1 pb-2'>{ type==='add' ? 'Add a new note:' : 'Edit as you wish:'}</h1>
            <hr />

            <form className='flex flex-col gap-3 pt-3' onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" name="id" defaultValue={note._id} />

              <Input
                id="title"
                label="Title"
                type="input"
                register={register}
                errors={errors}
                defaultValue={note.title}
                validationRules={{ required: "A title is required", minLength: {value: TITLE_MIN_LENGTH, message: `A minimun of ${TITLE_MIN_LENGTH} characters are required`},  maxLength: {value: TITLE_MAX_LENGTH, message: `A maximun of ${TITLE_MAX_LENGTH} characters are allowed`} }}
              />
              <Input
                id="content"
                label="Content"
                type="textarea"
                register={register}
                errors={errors}
                defaultValue={note.content}
                validationRules={{ required: "Content cannot be empty",  minLength: {value: CONTENT_MIN_LENGTH, message: `A minimun of ${CONTENT_MIN_LENGTH} characters are required`},  maxLength: {value: CONTENT_MAX_LENGTH, message: `A maximun of ${CONTENT_MAX_LENGTH} characters are allowed`} }}
              />

              <Button type='saveChanges' additionalStyles='w-full' />
            </form>

            <Button type='close' additionalStyles='w-full mt-1' handleOnClick={onClose} />
        </div>

        </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}

export default NoteModal
