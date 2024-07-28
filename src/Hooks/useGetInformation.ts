
/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP from "@/config/fetch";
import { useToast } from "./useToast"


const initializer = HTTP.getInstance()




export const useGetInformation = () => {

    const { toast } = useToast()


    const getInformation = async <T>(url: string) => {

        try {
            const getAll = await initializer.get<T>(url)

            return getAll


        } catch (error: any) {

            toast({
                title: 'Error inesperado',
                description: error.message
            })

        }
    }

    return {
        getInformation
    }
}