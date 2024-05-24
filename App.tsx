import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import * as React from 'react';
import { SQLiteProvider } from 'expo-sqlite/next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';



const Stack = createNativeStackNavigator()

const loadDatabase = async () => {
  const dbName = "myDb.db";
  const dbAsset = require("./assets/myDb.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if(!fileInfo.exists){
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`,{intermediates:true});
    await FileSystem.downloadAsync(dbUri,dbFilePath);
  }
};

export default function App() {
  const [dbLoaded,setDbLoaded] = React.useState<boolean>(false);

  React.useEffect(()=> {
    loadDatabase().then(()=> setDbLoaded(true)).catch((e) => console.error(e));
  },[]);

  if(!dbLoaded){
    return (
      <View >
          <ActivityIndicator size={"large"}/>
          <Text className=' font-semibold text-md'>Loading Database...</Text>
          <StatusBar style="auto" />
      </View>
      ); 
  }

  return (
    <NavigationContainer>
      <React.Suspense fallback={
        <View >
          <ActivityIndicator size={"large"}/>
          <Text className=' font-semibold text-md'>Loading Database...</Text>
          <StatusBar style="auto" />
        </View>
      }>
        <SQLiteProvider databaseName='myDb.db' useSuspense>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{
              headerLargeTitle:true,
              headerTitle:"Budget Manager",
            }}/> 
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
}


