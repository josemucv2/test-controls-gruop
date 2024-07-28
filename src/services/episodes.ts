import HTTP from "@/config/fetch";
import { IEpisodes, PaginationInfo } from "@/interfaces";

const initializer = HTTP.getInstance()

export interface IResponseEpisodes {
    info: PaginationInfo,
    results: IEpisodes[]
}


export const getListEpisodes = async () => {
    return await initializer.get<IResponseEpisodes>('episode')
}
