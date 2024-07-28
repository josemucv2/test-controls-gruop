/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/Hooks/useToast";
import { PaginationInfo } from "@/interfaces";
import { getListCharacter, getListPaginations } from "@/services/character";
import { useCharacterStore } from "@/store/characters";
import { useState } from "react";

export const useHome = () => {
  const [loading, setLoading] = useState(false);
  const { set_character_list } = useCharacterStore();
  const [pagination, setPaginations] = useState<PaginationInfo>();
  const { toast } = useToast();

  const getList = async () => {
    setLoading(true);
    try {
      const list = await getListCharacter();
      setPaginations(list.info);
      set_character_list(list.results);
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
        const restList = await getListPaginations(url);
        setPaginations(restList.info);
        set_character_list(restList.results);
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
