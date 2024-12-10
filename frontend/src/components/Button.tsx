import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiArchive2Line } from "react-icons/ri";
import { IoSaveOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

type ButtonProps = {
    type: 'edit' | 'archive' | 'delete' | 'saveChanges' | 'close' | 'add' | 'custom'
    children?: JSX.Element | string
    handleOnClick?: ()=>void
    additionalStyles?: string
}

const baseStyle = 'transition ease-in-out border gap-2 rounded-sm px-2 py-2 text-sm flex items-center justify-center text-center hover:text-white'
const typeStyle = {
    edit: 'hover:bg-gray-500',
    archive: 'hover:bg-slate-500',
    delete: 'hover:bg-red-400',
    saveChanges: 'bg-slate-300 hover:bg-slate-500 border-slate-800',
    close: 'bg-red-400 hover:bg-red-800 hover:bg-slate-500 border-slate-800',
    add: 'bg-slate-300 hover:bg-slate-500 border-slate-800',
    custom: ''
}

const Button = ({
    type, children, handleOnClick, additionalStyles
}:ButtonProps) => {    

    const content = {
        edit:       <>
                        <FaRegEdit className="inline" /> Edit
                    </>,
        archive:    <>
                        <RiArchive2Line className="inline" /> Archive
                    </>,
        delete:     <>
                        <MdDelete className="inline" /> Delete
                    </>,
        saveChanges: <>
                        <IoSaveOutline  className="inline" /> Save Changes
                    </>,
        close: <>
                    <IoIosCloseCircleOutline  className="inline" /> Close
                </>,
        add: <>
                <IoAddCircleOutline   className="inline" /> Add new note
            </>,
        custom: children
    }

    const buttonType = type === 'saveChanges' ? 'submit' : 'button';
    const onClickHandler = type === 'saveChanges' ? undefined : handleOnClick;


  return (
    <button className={`${baseStyle} ${typeStyle[type]} ${additionalStyles}`}
        type={buttonType}
        onClick={onClickHandler}>
        {children ? children : content[type]}
    </button>    
  )
}

export default Button
