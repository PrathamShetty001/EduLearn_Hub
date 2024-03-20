import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'
import { GetAllProgressCourse } from '../Services'
import { useState,useEffect } from 'react'
import CourseItem from '../Components/HomeScreen/CourseItem'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import CourseProgressItem from '../Components/MyCourse/CourseProgressItem'
import { ScrollView } from 'react-native-gesture-handler'

export default function MyCourse() {

  const {user}=useUser()
    const navigation=useNavigation()
    const [progressCourseList,setProgressCourseList]=useState()
    useEffect(()=>{
        user&&GetAllProgressCourseList()
    },[user])
    const GetAllProgressCourseList=()=>{
        GetAllProgressCourse(user.primaryEmailAddress.emailAddress)
        .then(resp=>{
            setProgressCourseList(resp.userEnrolledCourses)
        })
    }

  return (
    <GestureHandlerRootView>
      <ScrollView>
      <View style={{
        height:160,
        backgroundColor:Colors.PRIMARY,
        padding:30
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          color:Colors.WHITE,
          fontSize:30
        }}>
        My Course
        </Text>
      </View>
      <FlatList
        data={progressCourseList}
        showsHorizontalScrollIndicator={false}
        style={{marginTop:-50}}
        renderItem={({ item }) => (
          <TouchableOpacity 
          style={{margin:8,padding:5}}
          onPress={()=>navigation.navigate('course-detail',{
            course:item.course
          })}
          >
            <CourseProgressItem item={item.course}
            completedChapter={item?.completedChapter?.length}/>
          </TouchableOpacity>
        )}
      />
      </ScrollView>
      </GestureHandlerRootView>
  )
}