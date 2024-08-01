
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTPS } from "@/config/fetch";
import { useToast } from "./useToast"






export const useGetInformation = () => {

    const { toast } = useToast()


    const getInformation = async <T>(url: string) => {

        try {
            const getAll = await HTTPS.get<T>(url)

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