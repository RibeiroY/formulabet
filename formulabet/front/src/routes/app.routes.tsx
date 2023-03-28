import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {New} from '../screens/New';
import {Pools} from '../screens/Pools';
import { Find } from '../screens/Find';
import { Details } from '../screens/Details';
import { Image } from 'react-native';
import React from 'react';
import { PlusCircle } from 'phosphor-react-native';

const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{
            tabBarActiveTintColor: 'yellow',
            tabBarInactiveTintColor: 'black',
            tabBarStyle: {
                backgroundColor: '#E10600',
            },
            headerTitle:()=>       
                <Image 
                source={require('../assets/iconRed.svg')}
                style={{width: 150, height: 30}}
                resizeMode="contain"
                />,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#E10600',
                },
                
            
        }}>
            <Screen name="new" 
            component={New}
            options={{
                tabBarLabel: 'Novo bolão',
            }}
            />


            <Screen name="pools" 
            component={Pools}
            options={{
                tabBarLabel: 'Meus bolões',
            }}            
            />
            <Screen name="find" 
            component={Find}
            options={{
                tabBarButton:()=>null
            }}
            />
            <Screen name="details" 
            component={Details}
            options={{
                tabBarButton:()=>null
            }}
            />

        </Navigator>
    )

}