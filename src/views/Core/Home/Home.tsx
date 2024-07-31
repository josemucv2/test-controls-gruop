/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Input,
} from '@/components/ui';
import { useCharacterStore } from '@/store/characters';
import { useEffect, useMemo } from 'react';
import s from './home.module.css';
import { useHome } from './Hooks/useHome';
import { debounce } from 'lodash';

const filters_status = [
  {
    _id: 1,
    name: 'alive',
  },

  {
    _id: 2,
    name: 'dead',
  },
  {
    _id: 3,
    name: 'unknown',
  },
];

const filters_gender = [
  {
    _id: 1,
    name: 'Female',
  },

  {
    _id: 2,
    name: 'Male',
  },
  {
    _id: 3,
    name: 'Genderless',
  },
  {
    _id: 4,
    name: 'unknown',
  },
];

export const Home = () => {
  const { character_list } = useCharacterStore();
  const { loading, getList, pagination, changePage, setStatus, status, gender, setGender } =
    useHome();

  const handleStatusChange = async (data: string) => {
    setStatus(data);
  };

  const handleGenderChange = async (data: string) => {
    setGender(data);
  };

  // Memorize the debounced function
  const debouncedSetNameAndFetch = useMemo(
    () =>
      debounce((name: string) => {
        getList(name);
      }, 2000),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    debouncedSetNameAndFetch(nextValue);
  };

  useEffect(() => {
    getList('');
  }, [status, gender]);
  return (
    <div className="w-full">
      <h1 className="text-xl bold mb-10">Character List</h1>

      <div className="flex space-x-10">
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Status" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white">
            <SelectGroup>
              {filters_status.map((element) => {
                return (
                  <SelectItem value={element.name} key={element._id}>
                    {element.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={handleGenderChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Gender" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white">
            <SelectGroup>
              {filters_gender.map((element) => {
                return (
                  <SelectItem value={element.name} key={element._id}>
                    {element.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input placeholder="wirte a name" onChange={handleChange} name="name" />
      </div>
      {loading ? (
        'Cargando....'
      ) : (
        <div className={s.container_table}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Gender</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {character_list.map((char) => (
                <TableRow key={char.id}>
                  <TableCell className="font-medium">{char.id}</TableCell>
                  <TableCell className="font-medium">{char.name}</TableCell>
                  <TableCell>{char.species}</TableCell>
                  <TableCell>{char.status}</TableCell>
                  <TableCell className="text-right">{char.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{pagination?.count}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
      <div>
        <Button onClick={() => changePage('prev')} disabled={!pagination?.prev}>
          Preview
        </Button>
        <Button onClick={() => changePage('next')} disabled={!pagination?.next}>
          Next
        </Button>
      </div>
    </div>
  );
};
