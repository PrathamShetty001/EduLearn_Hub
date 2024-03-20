import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import coin from '../../../assets/images/coin.png'
import { TextInput,GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const {isLoaded,isSignedIn,user}=useUser();
  return isLoaded&&(
    <View>
    <View style={[{marginTop:20,justifyContent:'space-between'},styles.rowStyle]}> 
      <View style={styles.rowStyle}>
        <Image source={{uri:user?.imageUrl}}
        style={{width:50,height:50, borderRadius:99}}/>
        <View>
            <Text style={{color:Colors.WHITE, fontFamily:'outfit-regular'}}>Welcome</Text>
            <Text style={styles.mainText}>{user?.fullName}</Text>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <Image source={coin} style={{width:35,height:35}}/>
        <Text style={styles.mainText}>3580</Text>
      </View>
    </View>
    <View style={[{backgroundColor:Colors.WHITE,paddingLeft:20,paddingRight:5,marginTop:25,borderRadius:99},styles.rowStyle]}>
    <GestureHandlerRootView>
        <TextInput placeholder='Search Courses' style={{fontFamily:'outfit-regular',fontSize:18}}/>
    </GestureHandlerRootView>
    <Ionicons name="search-circle" size={50} color={Colors.PRIMARY}/>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainText:{
        color:Colors.WHITE,
        fontSize:20,
        fontFamily:'outfit-regular'},
    rowStyle:{
        display:'flex',
        flexDirection:'row',gap:10,
        alignItems:'center',
        justifyContent:'space-between'
    }
})
