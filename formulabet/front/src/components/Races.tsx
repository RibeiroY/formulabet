import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import{Input} from './Input'
import {Check} from 'phosphor-react-native';
import { getName } from 'country-list';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';

import { Team } from './Team';


interface GuessProps {
  id: string;
  raceId: string;
  createdAt: string;
  participantId: string;
  Winner: string;
  polePosition: string;
  fastestLap: string;
}

export interface RaceProps {
  id: string;
  date: Date;
  name: string;
  countryCode: string;
  
  guess: null | GuessProps;
};

interface Props {
  data: RaceProps;
  onGuessConfirm: () => void;
  setWinner: (value: string) => void;
  setPolePosition: (value: string) => void;
  setFastestLap: (value: string) => void;
};

export function Race({ data, setWinner, setPolePosition,setFastestLap, onGuessConfirm }: Props) {
  const { colors, sizes } = useTheme();

  const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY");
    //alterar aqui para configurar para FORMULA 1. TRANSFORME TEAM EM INPUT
  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="red.500"
      mb={3}
      p={4}
    >
        
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.countryCode)} - {data.name}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <VStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Input
            mb={4}
            placeholder="Quem será o vencedor da corrida?"
            onChangeText={setWinner}
            
        />


        <Input
            mb={4}
            placeholder="Quem será o pole position?"
            onChangeText={setPolePosition}
        />
        <Input
            mb={4}
            placeholder="De quem será a volta mais rápida?"
            onChangeText={setFastestLap}
        />
      </VStack>

      {
        !data.guess &&
        <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onGuessConfirm}>
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      }
    </VStack>
  );
}