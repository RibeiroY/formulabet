import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

interface Props extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="25%"
      h={16}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'SECONDARY' ? 'red.500' : "#E10600"}
      _pressed={{
        bg: type === 'SECONDARY' ? "red.400" : "red.600"
      }}
      _loading={{
        _spinner: { color: "black" }
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === 'SECONDARY' ? 'white' : "white"}
      >
        {title}
      </Text>
    </ButtonNativeBase >
  );
}