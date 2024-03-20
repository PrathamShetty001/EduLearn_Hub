import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import CourseList from '../Components/HomeScreen/CourseList'
import { useAuth, useUser } from '@clerk/clerk-expo'
import CourseProgress from '../Components/HomeScreen/CourseProgress'
import { ScrollView } from 'react-native-gesture-handler'
// import { UserPointsContext } from '../Context/UserPointsContext'
// import { createNewUser } from '../Services'

// const{isLoaded,signOut}=useAuth()
// const {user}=useUser
// const {userPoints,setUserPoints}=useContext(UserPointsContext)

// useEffect(()=>{
//   user&&createUser()
// },[user])

// const createUser=()=>{
//   if(user)
//   {
//     createNewUser(user.fullName,user.primaryEmailAddress.emailAddress,user.imageUrl)
//     .then(resp=>{
//       if(resp)
//       GetUser()
//     })
//   }
// }

// const GetUser=()=>{
//   getUserDetail(user.primaryEmailAddress.emailAddress).then(resp=>{
//     console.log("--",resp.userDetail?.point)
//     setUserPoints(resp.userDetail?.point)
//   })
// }

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