import {
  Button,
  DialogHeader,
  Input,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useCharacterStore } from '@/store/characters';
import s from './character.module.css';
import { useForm } from 'react-hook-form';
import { ICharacter } from '@/interfaces';
import { useToast } from '@/Hooks/useToast';
import { useState } from 'react';
import { FILTERS_GENDER, FILTERS_STATUS } from '@/constants/filters';
import { CHARACTER_GENDER, CHARACTER_STATUS } from '@/enums/character';

export const CharacterManually = () => {
  const { character_list, set_character_list } = useCharacterStore();
  const { register, handleSubmit, reset, setValue, getValues } = useForm<Partial<ICharacter>>();
  const { toast } = useToast();
  const [editingCharacterId, setEditingCharacterId] = useState<number | undefined>(undefined);

  const newCharacter = (data: Partial<ICharacter>) => {
    const { name, species, status, gender } = data;
    const newCharacter: Partial<ICharacter> = {
      id: character_list.length + 1,
      name: name!,
      species: species!,
      status: status!,
      gender: gender!,
    };
    set_character_list([...character_list, newCharacter]);
    toast({
      title: 'Agregado con Existo',
      description: 'El elemento agregado solo sera valido para esta vista',
    });
  };

  const updateCharacter = (data: Partial<ICharacter>) => {
    const updatedCharacterList = character_list.map((char) =>
      char.id === editingCharacterId ? { ...char, ...data } : char
    );
    set_character_list(updatedCharacterList);
    toast({
      title: 'Character Updated',
      description: 'The character has been successfully updated.',
    });
    reset();
    setEditingCharacterId(undefined);
  };
  const editCharacter = (char: Partial<ICharacter>) => {
    reset(char);
  };

  const handleStatusChange = async (data: CHARACTER_STATUS) => {
    setValue('status', data);
  };

  const handleGenderChange = async (data: CHARACTER_GENDER) => {
    setValue('gender', data);
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-10">Create New List</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => reset({})}>
            Create Character
          </Button>
        </DialogTrigger>

        <div className={s.container_table}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Gender</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          editCharacter(char);
                          setEditingCharacterId(char.id);
                        }}
                        variant="outline"
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <form onSubmit={handleSubmit(newCharacter)}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Create New Character</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <Input placeholder="name" {...register('name')} />
                <Input placeholder="species" {...register('species')} />

                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    <SelectGroup>
                      {FILTERS_STATUS.map((element) => {
                        return (
                          <SelectItem
                            value={element.name}
                            key={element._id}
                            defaultValue={getValues().status}
                          >
                            {element.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select onValueChange={handleGenderChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Gender" defaultValue={getValues().gender} />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    <SelectGroup>
                      {FILTERS_GENDER.map((element) => {
                        return (
                          <SelectItem
                            value={element.name}
                            key={element._id}
                            defaultValue={getValues().gender}
                          >
                            {element.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit(editingCharacterId ? updateCharacter : newCharacter)}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
