import { Center, Text, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';

import { useAuth } from '../hooks/useAuth';
import iconRed from '../assets/iconRed.svg';
import {Image} from 'react-native'

import { Button } from '../components/Button';

export function SignIn() {
    const{signIn, user} = useAuth();
    

  return (
    <Center flex={1} bgColor="black" p={7}>
        
        <Button 
        type="PRIMARY"
        title='ENTRAR COM GOOGLE'
        leftIcon={<Icon as={Fontisto} name='google' color="white" size="md" />}
        mt={12}
        onPress={signIn}
        _loading={{
          _spinner: { color: 'white' }
        }}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}
