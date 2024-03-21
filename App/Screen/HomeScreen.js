import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import CourseList from '../Components/HomeScreen/CourseList'
import CourseProgress from '../Components/HomeScreen/CourseProgress'
import { ScrollView } from 'react-native-gesture-handler'


export default function HomeScreen() {
  return (
    <ScrollView>
    <View>
      <View style={{backgroundColor:Colors.PRIMARY,height:250, padding:20}}>
        <Header/>
      </View>
      <View style={{padding:20}}>
        <View style={{marginTop:-80}}>
        <CourseProgress/>
        <CourseList level={'Basic'}/>
        </View>
        <CourseList level={'Advance'}/>
      </View>
    </View>
    </ScrollView>
  )
}