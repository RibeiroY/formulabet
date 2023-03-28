import{Center, Spinner } from 'native-base';

export function Loading(){
    return(
        <Center flex={1}bg="black">
        <Spinner color="red.500" size="lg" />
        </Center>
    )

}