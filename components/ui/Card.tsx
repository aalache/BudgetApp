import { View, ViewStyle } from "react-native";

interface CardProps{
    style?: ViewStyle ;
}

export default function Card({ children ,style ={}}:CardProps){

    return (
        <View className=" h-auto  rounded-md bg-white shadow-black shadow-md my-1 p-3 ">
            {children}
        </View>
    )
}