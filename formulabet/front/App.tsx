
import { NativeBaseProvider, StatusBar } from 'native-base';
import{useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import React from 'react';
import { AuthContextProvider } from './src/contexts/AuthContext';
//CONTINUAR AULA 3 1H30MIN
export default function App() {
  const [fontsLoaded]=useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold});

  

  return (
    <NativeBaseProvider>
      <AuthContextProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
        {fontsLoaded ? <Routes/> : <Loading/>}
      </AuthContextProvider>
      
      
    </NativeBaseProvider>
    
  );
}

