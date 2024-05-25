import {AntDesign} from '@expo/vector-icons'
import { Transaction,Category } from '../types';
import { Text, View } from 'react-native';
import Card from './ui/Card';
import { AutoSizeText,ResizeTextMode} from "react-native-auto-size-text";
import { categoryColors,categoryEmojies } from '../screens/constants';

interface TransactionListItemProps{
    transaction :Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionListItem({transaction,categoryInfo}:TransactionListItemProps){

    const iconName = transaction.type ==="Expense" ? "minuscircle" : "pluscircle";
    const color = transaction.type === "Expense" ? "red" : "green";
    const categoryColor = categoryColors[categoryInfo?.name ?? "Default"];
    const emoji = categoryEmojies[categoryInfo?.name ?? "Default" ];

    return (
        <Card >
                <View>
                    <Amount amount={transaction.amount} color={color} iconName={iconName} />
                    <CategoryItem 
                        categoryColor={categoryColor}
                        categoryInfo={categoryInfo}
                        emoji={emoji}
                    />
                </View>
                <TransactionInfo 
                    date={transaction.date}
                    id={transaction.id}
                    description={transaction.description}
                />
        </Card>
    )
}


function Amount(
    {
        iconName,
        color ,
        amount,
    } : {
        iconName : "minuscircle" | "pluscircle";
        color : string;
        amount : number;
    }
    ){

    return (
        <View className='flex  flex-row items-center justify-start space-x-3  py-2 '>
            <AntDesign className='' name={iconName} size={20} color={color}/>
            <AutoSizeText
                fontSize={22}
                mode={ResizeTextMode.max_lines}
                numberOfLines={1}
                className=' text-lg font-semibold py-2'
            >
                    ${amount}
            </AutoSizeText>
        </View>
    )
}

function CategoryItem(
    {
        categoryColor,
        categoryInfo ,
        emoji,
    } : {
        categoryColor: string;
        categoryInfo:Category | undefined;
        emoji: string;
    }
    ){

    return (
        <View className=' rounded-full px-3 py-2 self-start ' style={{backgroundColor:categoryColor + "40"}}>
            <Text>
                {emoji} {categoryInfo?.name}
            </Text>
        </View>
    )
}

function TransactionInfo({
    id,
    date,
    description,
}:{
    id:number;
    date:number;
    description:string;
}){
    return (
        <View className=' grow gap-1 flex-shrink py-2'>
            <Text className='text-base font-medium '>{description}</Text>
            <Text>Transaction number {id}</Text>
            <Text className='text-sm text-gray-600'>{new Date(date*1000).toDateString()}</Text>
        </View>
    )
}