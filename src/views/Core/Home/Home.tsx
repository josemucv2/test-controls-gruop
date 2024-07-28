/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useCharacterStore } from "@/store/characters";
import { useEffect } from "react";
import s from "./home.module.css";
import { useHome } from "./Hooks/useHome";

export const Home = () => {
  const { character_list } = useCharacterStore();
  const { loading, getList, pagination, changePage } = useHome();

  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-xl bold mb-10">Character List</h1>
      {loading ? (
        "Cargando...."
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
                <TableCell className="text-right">
                  {pagination?.count}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
      <div>
        <Button onClick={() => changePage("prev")} disabled={!pagination?.prev}>
          Preview
        </Button>
        <Button onClick={() => changePage("next")} disabled={!pagination?.next}>
          Next
        </Button>
      </div>
    </div>
  );
};
