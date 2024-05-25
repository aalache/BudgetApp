import { View,Text, ScrollView } from "react-native";
import * as React from 'react'
import { Category, Transaction } from "../types";
import { useSQLiteContext } from "expo-sqlite";
import TransactionList from '../components/TransactionList';
export default function Home(){

    const [categories,setCategories] = React.useState<Category[]>([]);
    const [transactions,setTransactions] = React.useState<Transaction[]>([]);

    const db = useSQLiteContext();

    React.useEffect(() => {
        db.withTransactionAsync(async () => {
            await getData();
        });
    },[db]);

    async function getData() {
        //? fetching Transactions 

        const transactionResult = await db.getAllAsync<Transaction>(`SELECT * FROM Transactions ORDER BY date DESC;`);
        setTransactions(transactionResult);

        //? fetching Categories

        const categoriesResult = await db.getAllAsync<Category>(`SELECT * FROM Categories;`);
        setCategories(categoriesResult);
    }

    async function deleteTransaction(id:number) {
        db.withTransactionAsync(async () => {
            await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`,[id])
            await getData();
        })
    }

    return (
        <ScrollView className=" h-full p-4 ">
            <TransactionList categories={categories} transactions={transactions} deleteTransaction={deleteTransaction}/>
        </ScrollView>
    )
}