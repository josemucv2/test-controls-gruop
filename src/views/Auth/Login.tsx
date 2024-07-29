/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, LoadingComponent } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/Hooks/useToast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";
import { useState } from "react";

type FormLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const { toast } = useToast();
  const goPage = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>();
  const [loading, setLoading] = useState(false);

  const login = (data: FormLogin) => {
    const { email, password } = data;

    setLoading(true);

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        toast({
          title: "Welcome",
        });
        goPage("/app");
      })
      .catch((err) => {
        toast({
          title: "Auth Error",
          description: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form
      className="p-10 w-[30%] shadow-lg space-y-5"
      onSubmit={handleSubmit(login)}
    >
      <div className="text-center text-xl">Sign In</div>
      <Input
        placeholder="Email"
        {...register("email", { required: "Campo Requerido" })}
      />
      <span className="text-sm text-red-500">{errors.email?.message}</span>
      <Input
        {...register("password", { required: "Campo Requerido" })}
        type="password"
        placeholder="Password"
      />
      <span className="text-sm text-red-500">{errors.password?.message}</span>

      <div className="flex justify-center items-center ">
        {loading ? (
          <LoadingComponent />
        ) : (
          <Button
            onClick={handleSubmit(login)}
            className="border rounded-lg hover:text-white hover:bg-black"
          >
            Sign In
          </Button>
        )}
      </div>

      <div className="text-center">
        ¿Not Account?{" "}
        <span
          className="hover:underline cursor-pointer"
          onClick={() => goPage("register")}
        >
          Register Here
        </span>
      </div>
    </form>
  );
};
