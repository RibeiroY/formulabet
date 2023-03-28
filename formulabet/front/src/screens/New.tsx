import {Heading, VStack, Text, useToast} from 'native-base';
import { Alert } from 'react-native';
import { useState } from 'react';
import {api} from '../services/api';

import { Input } from '../components/Input';
import iconRed from '../assets/iconRed.svg';
import { Button } from '../components/Button';

export function New(){
    const[title, setTitle]=useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    async function handlePoolCreate(){
        if(!title.trim()){
            return toast.show({
                title: "Preencha o nome do seu bolão",
                placement: "top",
                bgColor: "red.500",
            });
        }
        try {
            setIsLoading(true);
            await api.post('/pools',{
                title: title.toUpperCase(),
            })
            toast.show({
                title: "Bolão criado com sucesso",
                placement: "top",
                bgColor: "green.500",
            });

            setTitle('');

        } catch (error) {
            console.log(error);
            toast.show({
                title: "Não foi possível criar o bolão",
                placement: "top",
                bgColor: "red.500",
            });
        }finally{
            setIsLoading(false);
        }
        
    }

    return(
        <VStack flex={1} bgColor="black">
            <VStack mt={8} mx={5} alignItems="center">
                

                <Heading fontFamily="heading" color="#E10600" my={8}>
                    Crie seu próprio bolão da Fórmula 1 e compartilhe com seus amigos!
                </Heading>
                <Input
                    mb={12}
                    placeholder="Qual o nome do seu bolão?"
                    onChangeText={setTitle}
                    value={title}
                />
                <Button
                    title="CRIAR MEU BOLÃO"
                    onPress={handlePoolCreate}
                    isLoading={isLoading}
                />
                <Text color='gray.400' fontSize="sm" textAlign="center" px={10} mt={4}>
                    Ao criar seu bolão, você receberá um código único{'\n'}
                    que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>    


        </VStack>


    );
}