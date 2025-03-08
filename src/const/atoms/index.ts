import { atom } from 'jotai'
import ResType from "@/type/ResType"

export const resAtom = atom<ResType | null>(null)