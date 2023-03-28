import { Box, useToast , FlatList} from 'native-base'
import { useState, useEffect } from 'react';
import { Loading } from "../components/Loading";

import { api } from "../services/api";	

import {Race, RaceProps} from "../components/Races"

interface Props {
    poolId: string;
}

export function Guesses({ poolId }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const [races, setRaces] = useState<RaceProps[]>([]);
    const [Winner, setWinner] = useState('');
    const [polePosition, setPolePosition] = useState('');
    const [fastestLap, setFastestLap] = useState('');

    async function fetchRaces() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${poolId}/races`);
            setRaces(response.data.races)
            
        } catch (error) {
            console.log(error);
            toast.show({
                title: "Não foi possível carregar as corridas",
                placement: "top",
                bgColor: "red.500",
            })

        }finally{
            setIsLoading(false);
        }
    }

    async function handleGuessConfirm(raceId: string) {
        try {
            if(!Winner.trim() || !polePosition.trim() || !fastestLap.trim()){
                toast.show({
                    title: "Preencha todos os campos",
                    placement: "top",
                    bgColor: "red.500",
                })
                return;
            }
            await api.post(`/pools/${poolId}/races/${raceId}/guesses`, {
                Winner,
                polePosition,
                fastestLap
            });
            toast.show({
                title: "Palpitou com sucesso!",
                placement: "top",
                bgColor: "green.500",
            })
            fetchRaces();

        } catch (error) {
            console.log(error);
            toast.show({
                title: "Não foi possível palpitar",
                placement: "top",
                bgColor: "red.500",
            }) 
        }

    }

    useEffect(() => {
        fetchRaces();
    }, [poolId])

    if(isLoading){
        return <Loading/>
    }

    return (
        <FlatList
        data={races}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <Race
                data={item}
                setWinner={setWinner}
                setPolePosition={setPolePosition}
                setFastestLap={setFastestLap}
                onGuessConfirm={() => {handleGuessConfirm(item.id)}}
            />
            )}
        />
    )
}