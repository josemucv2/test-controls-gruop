import HTTP from "@/config/fetch";
import { ICharacter, PaginationInfo } from "@/interfaces";


const initializer = HTTP.getInstance()

interface IResponseListCharacter {
    info: PaginationInfo,
    results: ICharacter[]
}

export const getListCharacter = async () => {
    return await initializer.get<IResponseListCharacter>('character')
}


export const getListPaginations = async (url: string) => {
    return await initializer.get<IResponseListCharacter>(url)
}