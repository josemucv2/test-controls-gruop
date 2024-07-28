import HTTP from "@/config/fetch";
import { ICharacter, PaginationInfo } from "@/interfaces";


const initializer = HTTP.getInstance()

export interface IResponseListCharacter {
    info: PaginationInfo,
    results: ICharacter[]
}

export const getListCharacter = async () => {
    return await initializer.get<IResponseListCharacter>('character')
}


