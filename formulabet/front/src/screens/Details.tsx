import { useToast, VStack, HStack } from "native-base"
import {useRoute} from '@react-navigation/native'
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { Guesses } from "../components/Guesses";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from '../components/Options'

interface RouteParams{
    id: string;
}

export function Details(){
    const[optionSelected, setOptionSelected] = useState<'Seus Palpites' | 'Classificação'>('Seus Palpites');
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(true);
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
    const toast = useToast();

    const {id} = route.params as RouteParams;
    async function fetchPoolDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/pools/${id}`);
            setPoolDetails(response.data.pool);
            
           
        } catch (error) {
            console.log(error);
            toast.show({
                title: "Não foi possível carregar os bolões",
                placement: "top",
                bgColor: "red.500",
            })

        }finally{
            setIsLoading(false);
        }
        
    }

    useEffect(()=>{
        fetchPoolDetails();
    },[id])

    if(isLoading){
        return <Loading/>
    }

    return(
        <VStack flex={1} bgColor='black'>
            
        {
            poolDetails._count?.participants > 0 ? 
            <VStack px={5} flex={1}>
                <PoolHeader data={poolDetails}/>
                <HStack bgColor='gray.800' rounded = 'sm' mb={5} p={1}>
                    <Option 
                        title="Seus palpites" 
                        isSelected={optionSelected === 'Seus Palpites'}
                        onPress={()=>setOptionSelected('Seus Palpites')}
                    />
                    <Option 
                        title="Classificação" 
                        isSelected={optionSelected === 'Classificação'}
                        onPress={()=>setOptionSelected('Classificação')}
                    />
                </HStack>

                <Guesses poolId={poolDetails.id}/>
                
            </VStack>
            : <EmptyMyPoolList code={poolDetails.code}/>
        }
            
        
        </VStack>


    );
}