import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";

type FormRegister = {
    email: string,
    password: string
}

export const registerWithEmailAndPassword = async ({ email, password }: FormRegister) => {

    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;

};
