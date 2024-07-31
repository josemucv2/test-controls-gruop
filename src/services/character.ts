import HTTP from "@/config/fetch";
import { ICharacter, PaginationInfo } from "@/interfaces";


const initializer = HTTP.getInstance()

export interface IResponseListCharacter {
    info: PaginationInfo,
    results: ICharacter[]
}

type Filters = {
    status?: string
    gender?: string,
    name?: string,
}

export const getListCharacter = async ({ status, gender, name }: Filters) => {
    return await initializer.get<IResponseListCharacter>(`character?status=${status}&gender=${gender}&name=${name}`);
};

