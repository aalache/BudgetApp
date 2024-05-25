import { TouchableOpacity, View ,Text } from "react-native";
import { Category,Transaction } from "../types";
import TransactionListItem from './TransactionListItem';

export default function TransactionList(
{
    transactions,
    categories,
    deleteTransaction,
}:{
    transactions: Transaction[];
    categories:Category[];
    deleteTransaction: (id:number) => Promise<void>;
}){

    return (
        <View className="">
            {transactions.map((transaction)=>{
                const categoryForCurrentItem = categories.find(
                    (category) => category.id === transaction.category_id
                )
                return (
                    <TouchableOpacity
                        key={transaction.id}
                        activeOpacity={.8}
                        onLongPress={() => deleteTransaction(transaction.id)}
                    >
                        <TransactionListItem transaction={transaction} categoryInfo={categoryForCurrentItem} />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}