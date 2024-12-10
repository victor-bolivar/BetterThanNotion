import { useEffect, useRef } from 'react';

const useClickOutsideModal = (onClose: () => void) => {
    // If the click happened outside the modal content, it closes it

    const modalContentRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
          onClose();
        }
      };
  
      document.addEventListener('mousedown', handleOutsideClick);
  
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [onClose]);
  
    return modalContentRef;
  };

export default useClickOutsideModal