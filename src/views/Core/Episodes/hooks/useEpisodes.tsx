/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetInformation } from "@/Hooks/useGetInformation";
import { useToast } from "@/Hooks/useToast";
import { PaginationInfo } from "@/interfaces";
import { useEpisodeStore } from "@/store/episodes";
import { useState } from "react";
import { getListEpisodes, IResponseEpisodes } from "@/services/episodes";

export const useEpisodes = () => {
  const [loading, setLoading] = useState(false);
  const { set_episode_list } = useEpisodeStore();
  const [pagination, setPaginations] = useState<PaginationInfo>();
  const { toast } = useToast();
  const { getInformation } = useGetInformation();

  const getList = async () => {
    setLoading(true);
    try {
      const list = await getListEpisodes();
      setPaginations(list.info);
      set_episode_list(list.results);
    } catch (error: any) {
      toast({
        title: "Ha ocurrido un error inesperado",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const changePage = async (direction: "next" | "prev") => {
    setLoading(true);

    try {
      const url = direction === "next" ? pagination?.next : pagination?.prev;
      if (url) {
        const restList = await getInformation<IResponseEpisodes>(url);

        if (restList) {
          setPaginations(restList.info);
          set_episode_list(restList.results);
        } else {
          throw {
            message: "error in el get",
          };
        }
      }
    } catch (error: any) {
      toast({
        title: "Ha ocurrido un error inesperado",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getList,
    pagination,
    changePage,
  };
};
