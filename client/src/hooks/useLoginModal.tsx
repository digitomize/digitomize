import {create} from "zustand";

interface loginProps{
    isOpen:boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<loginProps>((set)=>({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}));

export default useLoginModal;