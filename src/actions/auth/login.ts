'use server'

// import { sleep } from "@/utils";
import { signIn } from "../../auth.config";

export async function authenticate(
    prevState:string|undefined,
    formData: FormData
){
    try {
        
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false
        });

        return 'Success';

    } catch (error) {
        // if((error as Error).message.includes('CredentialsSignin')){
            return 'CredentialsSignin'
        // }

        // return 'Error desconocido'

        // throw Error
    }
}

export const login = async(email:string, password: string) => {

    try {
  
      await signIn('credentials',{ email, password })
  
      return {ok: true};
      
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'No se pudo iniciar sesión'
      }
      
    }
  
  
  }