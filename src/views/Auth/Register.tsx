import { useToast } from "@/Hooks/useToast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { firebaseAuth } from "@/config/firebase";
import { Input, Button, LoadingComponent } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormRegister = {
  email: string;
  password: string;
};

export const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormRegister>();
  const { toast } = useToast();
  const goPage = useNavigate();
  const [loading, setLoading] = useState(false);

  const registerUser = async (data: FormRegister) => {
    const { email, password } = data;
    setLoading(true);

    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        goPage("/");
        toast({
          title: "User register sucsess",
        });
      })
      .catch((error) => {
        toast({
          title: "error in register services firebase",
          description: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form
      className="p-10 w-[30%] shadow-lg space-y-5"
      onSubmit={handleSubmit(registerUser)}
    >
      <div className="text-center text-xl">Register In</div>
      <Input
        placeholder="Email"
        {...register("email", { required: "Campo Requerido" })}
      />{" "}
      <span className="text-sm text-red-500">{errors.email?.message}</span>
      <Input
        {...register("password", { required: "Campo Requerido" })}
        type="password"
        placeholder="Password"
      />{" "}
      <span className="text-sm text-red-500">{errors.password?.message}</span>
      <div className="flex justify-center items-center ">
        {loading ? (
          <LoadingComponent />
        ) : (
          <Button
            onClick={handleSubmit(registerUser)}
            className="border rounded-lg hover:text-white hover:bg-black"
          >
            Register in
          </Button>
        )}
      </div>
      <div className="text-center">
        ¿Ready Account?{" "}
        <span
          className="hover:underline cursor-pointer"
          onClick={() => goPage("/")}
        >
          Login Here
        </span>
      </div>
    </form>
  );
};
