import { HTTPS } from "@/config/fetch";
import { IEpisodes, PaginationInfo } from "@/interfaces";


export interface IResponseEpisodes {
    info: PaginationInfo,
    results: IEpisodes[]
}


export const getListEpisodes = async () => {
    return await HTTPS.get<IResponseEpisodes>('episode')
}
