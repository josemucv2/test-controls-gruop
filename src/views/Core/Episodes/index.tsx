import { useEpisodeStore } from "@/store/episodes";
import { useEpisodes } from "./hooks/useEpisodes";
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
import { useEffect } from "react";
import s from "./episode.module.css";

export const Episodes = () => {
  const { episode_list } = useEpisodeStore();
  const { loading, getList, pagination, changePage } = useEpisodes();

  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-xl bold mb-10">Episode List</h1>
      {loading ? (
        "Cargando...."
      ) : (
        <div className={s.container_table}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Air Date</TableHead>
                <TableHead>Episode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {episode_list.map((episode) => (
                <TableRow key={episode.id}>
                  <TableCell className="font-medium">{episode.id}</TableCell>
                  <TableCell className="font-medium">{episode.name}</TableCell>
                  <TableCell>{episode.air_date}</TableCell>
                  <TableCell>{episode.episode}</TableCell>
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
