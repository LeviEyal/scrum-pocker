import { BiHide, BiShow } from 'react-icons/bi';
import { FiUser } from "react-icons/fi";
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { BiReset } from 'react-icons/bi';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import {MdOutlinePendingActions} from 'react-icons/md';

export const ICONS = {
  hide: BiHide,
  show: BiShow,
  user: FiUser,
  eyeClosed: RxEyeClosed,
  eyeOpen: RxEyeOpen,
  reset: BiReset,
  checkboxUnchecked: ImCheckboxUnchecked,
  checkboxChecked: ImCheckboxChecked,
  pending: MdOutlinePendingActions
};

export const ANIMALS = ["🐵", "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸"];
export const randomAnimal = () => ANIMALS[Math.floor(Math.random() * ANIMALS.length)];