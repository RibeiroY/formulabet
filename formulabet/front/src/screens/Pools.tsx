import { VStack ,Text, Heading, useToast, FlatList} from "native-base"
import {useCallback, useState} from 'react'
import { Button } from "../components/Button"
import { useNavigation } from "@react-navigation/native"
import { PoolCard, PoolCardProps } from "../components/PoolCard"
import { Loading } from "../components/Loading"
import { useFocusEffect } from "@react-navigation/native"

import { api } from "../services/api";

export function Pools(){
    const [isLoading, setIsLoading] = useState(true); 
    const [pools, setPools] = useState<PoolCardProps[]>([]);
    const navigation = useNavigation();
    const toast = useToast();


    async function fetchPools(){
        try {
            setIsLoading(true);
            const response = await api.get('/pools');
            setPools(response.data.pools);
           
        } catch (error) {
            console.log(error);
            toast.show({
                title: "Não foi possível buscar os bolões",
                placement: "top",
                bgColor: "red.500",
            })

        }finally{
            setIsLoading(false);
        }
    }
    useFocusEffect(useCallback(()=>{
        fetchPools();
    },[]))


    return(
        <VStack flex={1} bgColor="black">
            <Heading fontFamily="heading" color="#E10600"  textAlign='center'>
                    Meus bolões:
            </Heading>
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.500" alignItems='center' mb={4}>
                <Button title="BUSCAR BOLÃO POR CÓDIGO" 
                mb={4}
                onPress={()=>navigation.navigate('find')}
                />
            </VStack>
            {
                isLoading ? <Loading/> :
                <FlatList
                    px={10}
                    showsVerticalScrollIndicator={false}
                    data={pools}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>(
                    <PoolCard 
                    data={item}
                    onPress={()=>navigation.navigate('details',{id: item.id})}
                    />)}
                />
            }
        </VStack>
    )

} 