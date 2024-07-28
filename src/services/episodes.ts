import HTTP from "@/config/fetch";

const initializer = HTTP.getInstance()


export const getListEpisodes = async () => {
    return await initializer.get('episodes')
}

export const getPaginationsEpisodes = async (url: string) => {
    return await initializer.get(url)
}