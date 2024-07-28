import { ICharacter } from "@/interfaces";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ICharacterStore {
    character_list: Partial<ICharacter>[]
    set_character_list: (charracter: ICharacter[]) => void
}


export const useCharacterStore = create(persist<ICharacterStore>((set) => ({
    character_list: [],
    set_character_list: (characterList: ICharacter[]) => set({ character_list: characterList })
}), {
    name: 'character-store',
    storage: createJSONStorage(() => localStorage)
}))