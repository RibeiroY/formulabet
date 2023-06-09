import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';


import { Avatar } from 'native-base';
import axios from 'axios';
import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
  
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user,setUser]=useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [request,response, promptAsync]=Google.useAuthRequest({
        clientId: CLIENT_ID, //SEU GOOGLE CLIENT ID DEVE SER COLOCADO AQUI, ENTRE ASPAS SIMPLES 
        //E NO LUGAR DE CLIENT_ID
        redirectUri:AuthSession.makeRedirectUri({useProxy:true}),
        scopes:['profile', 'email']
    })
   
    async function signIn() {
        try {
            setIsUserLoading(true);
            await promptAsync();
            if(response?.type === 'success'){
                const {email, name, picture} = response.params;
                axios.post('/users',{
                    email,
                    name, 
                    avatar_url:picture
                });
            }
        } catch (error) {
            console.log(error)
            throw error;
        }finally{
            setIsUserLoading(false);
        }
    }
    async function signInWithGoogle(access_Token:string) {
        try {
          setIsUserLoading(true);
          console.log(access_Token);

          const tokenResponse = await api.post('/users', {access_Token});
          api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

          const userInfoResponse = await api.get('/me');
          setUser(userInfoResponse.data.user);

        } catch (error) {
          console.log(error);
          throw error;
        }finally{
          setIsUserLoading(false);
        }
    }

    useEffect(() => {

        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken);
            
        }
    },[response])

 

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}