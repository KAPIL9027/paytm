import { atom } from "recoil";

export const openModalAtom = atom<boolean>({
    key: "openModal",
    default: false
})