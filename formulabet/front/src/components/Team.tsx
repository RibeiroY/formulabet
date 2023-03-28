import { VStack } from 'native-base';
import CountryFlag from "react-native-country-flag";

import { Input } from './Input';

interface Props {
  code: string;
  
  onChangeText: (value: string) => void;
}

export function Team({ code, onChangeText }: Props) {
  return (
    <VStack alignItems="center">
      {<CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      <Input
        w={20}
        h={12}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
      />

      
    </VStack>
  );
}