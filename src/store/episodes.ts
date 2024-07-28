import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import { IEpisodes } from '@/interfaces';


interface IEpisodesStore {
    episode_list: Partial<IEpisodes>[]
    set_episode_list: (episodes: IEpisodes[]) => void
}

export const useEpisodeStore = create(persist<IEpisodesStore>((set) => ({
    episode_list: [],
    set_episode_list: (episodes: IEpisodes[]) => set({ episode_list: episodes })
}), {
    name: 'character-store',
    storage: createJSONStorage(() => localStorage)
}))