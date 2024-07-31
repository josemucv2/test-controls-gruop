/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from '@/Hooks/useToast';
import { ICharacter, PaginationInfo } from '@/interfaces';
import { getListCharacter, IResponseListCharacter } from '@/services/character';
import { useCharacterStore } from '@/store/characters';
import { useState } from 'react';
import { useGetInformation } from '@/Hooks/useGetInformation';

export const useHome = () => {
  const [loading, setLoading] = useState(false);
  const { set_character_list, character_list } = useCharacterStore();
  const [pagination, setPaginations] = useState<PaginationInfo>();
  const { toast } = useToast();
  const { getInformation } = useGetInformation();
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');

  const getList = async (name?: string) => {
    setLoading(true);
    try {
      const list = await getListCharacter({ status, gender, name });
      setPaginations(list.info);
      set_character_list(list.results);
    } catch (error: any) {
      toast({
        title: 'Ha ocurrido un error inesperado',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const changePage = async (direction: 'next' | 'prev') => {
    setLoading(true);

    try {
      const url = direction === 'next' ? pagination?.next : pagination?.prev;
      if (url) {
        const restList = await getInformation<IResponseListCharacter>(url);

        if (restList) {
          setPaginations(restList.info);
          set_character_list(restList.results);
        } else {
          throw {
            message: 'error in el get',
          };
        }
      }
    } catch (error: any) {
      toast({
        title: 'Ha ocurrido un error inesperado',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const create = (body: ICharacter) => {
    const copyList = [...character_list];

    copyList.push(body);

    set_character_list(copyList as any);
  };
  return {
    loading,
    getList,
    pagination,
    changePage,
    setStatus,
    status,
    gender,
    setGender,
    create,
  };
};
