import {Heading, VStack, Text, useToast} from 'native-base';

import { Input } from '../components/Input';
import iconRed from '../assets/iconRed.svg';
import { Button } from '../components/Button';
import { useState } from 'react';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export function Find(){
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [code, setCode] = useState('');

    const {navigate} = useNavigation();


    async function handleJoinPool() {
        try {
            setIsLoading(true);

            if(!code.trim()){
                return toast.show({
                    title: "Preencha o código do bolão",
                    placement: "top",
                    bgColor: "red.500",
                });
            }

            await api.post('/pools/join', {code});
            toast.show({
                title: "Entrou no bolão com sucesso!",
                placement: "top",
                bgColor: "green.500",
            });
            navigate('pools');


        } catch (error) {
            console.log(error);
            setIsLoading(false);

            toast.show({
                title: "Não foi possível encontrar o bolão ou você já está participando dele",	
                placement: "top",
                bgColor: "red.500",
            })
        }
    }

    return(
        <VStack flex={1} bgColor="black">
            <VStack mt={8} mx={5} alignItems="center">
                

                <Heading fontFamily="heading" color="#E10600" mb={8}>
                    Encontre seu bolão através de um código único!
                </Heading>
                <Input
                    mb={4}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize='characters'
                    onChangeText={setCode}
                />
                <Button mb={4}
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
                <Text color="gray.500">Ou, se preferir, crie seu próprio bolão na barra inferior.</Text>
                
                
            </VStack>    


        </VStack>


    );
}