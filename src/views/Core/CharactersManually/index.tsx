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
} from "@/components/ui";
import { useCharacterStore } from "@/store/characters";
import s from "./character.module.css";
import { useForm } from "react-hook-form";
import { ICharacter } from "@/interfaces";
import { useToast } from "@/Hooks/useToast";
import { useState } from "react";

export const CharacterManually = () => {
  const { character_list, set_character_list } = useCharacterStore();
  const { register, handleSubmit, reset } = useForm<Partial<ICharacter>>();
  const { toast } = useToast();
  const [editingCharacterId, setEditingCharacterId] = useState<
    number | undefined
  >(undefined);

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
      title: "Agregado con Existo",
      description: "El elemento agregado solo sera valido para esta vista",
    });
  };

  const updateCharacter = (data: Partial<ICharacter>) => {
    const updatedCharacterList = character_list.map((char) =>
      char.id === editingCharacterId ? { ...char, ...data } : char
    );
    set_character_list(updatedCharacterList);
    toast({
      title: "Character Updated",
      description: "The character has been successfully updated.",
    });
    reset();
    setEditingCharacterId(undefined);
  };
  const editCharacter = (char: Partial<ICharacter>) => {
    reset(char);
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-10">Create New List</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => reset()}>
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
                <Input placeholder="name" {...register("name")} />
                <Input placeholder="species" {...register("species")} />
                <Input placeholder="status" {...register("status")} />
                <Input placeholder="gender" {...register("gender")} />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSubmit(
                  editingCharacterId ? updateCharacter : newCharacter
                )}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
