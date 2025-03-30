
import {useRecoilValue} from "recoil"
import { openModalAtom } from '../atoms/openModal'

const useOpenModal = () => {
  const value = useRecoilValue(openModalAtom);
  return value;
}

export default useOpenModal
