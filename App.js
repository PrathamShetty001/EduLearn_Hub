import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './App/Screen/LoginScreen';
import { ClerkProvider,SignedIn,SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { useState } from 'react';
// import { UserPointsContext } from './App/Context/UserPointsContext';

export default function App() {
  const [isChapterComplete,setIsChapterComplete] =useState(false)
  // const [userPoints,setUserPoints] = useState(10)
  const [fontsLoaded] = useFonts({
    'outfit-regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-semibold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-light': require('./assets/fonts/Outfit-Light.ttf'),
  });
  return (
    <ClerkProvider publishableKey='pk_test_Y29uY2lzZS1vY3RvcHVzLTczLmNsZXJrLmFjY291bnRzLmRldiQ'>
    {/* <UserPointsContext.Provider value={{userPoints,setUserPoints}}> */}
    <CompleteChapterContext.Provider value={{isChapterComplete,setIsChapterComplete}}>
    <SignedIn>
    <NavigationContainer>
        <TabNavigation/> 
    </NavigationContainer>
    </SignedIn>
    <SignedOut>
    <View style={styles.container}>
      <LoginScreen/>
    </View>
    </SignedOut>
    </CompleteChapterContext.Provider>
    {/* </UserPointsContext.Provider> */}
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
