/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCharacterStore } from "@/store/characters";
import { useToast } from "@/Hooks/useToast";

type FormLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const { toast } = useToast();
  const goPage = useNavigate();
  const { register, handleSubmit } = useForm<FormLogin>();
  const getAll = async (data: FormLogin) => {
    try {
      goPage("/app");
    } catch (error: any) {
      toast({
        title: "Ha ocurrido un error inesperado",
        description: error.message,
      });
    }
  };
  return (
    <form
      className="p-10 w-[30%] shadow-lg space-y-5"
      onSubmit={handleSubmit(getAll)}
    >
      <div className="text-center">Iniciar Sesion</div>
      <Input placeholder="Email" {...register("email")} />
      <Input {...register("password")} type="password" placeholder="Password" />

      <div className="flex justify-center items-center ">
        <Button
          onClick={handleSubmit(getAll)}
          className="border rounded-lg hover:text-white hover:bg-black"
        >
          Entrar
        </Button>
      </div>
    </form>
  );
};
