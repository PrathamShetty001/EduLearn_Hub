import { View, Text, Animated, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DetailSection from '../Components/CourseDetailsScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailsScreen/ChapterSection';
import { enrollCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';
import { getUserEnrolledCourse } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';


export default function CourseDetailScreen() {
    const navigate = useNavigation();
    const params = useRoute().params;
    const {user} = useUser()
    const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext)
    const [userEnrolledCourse,setUserEnrolledCourse]=useState([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000, // Adjust the duration as needed
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim]);

    useEffect(()=>{
        console.log(params.course);
        if(user&&params.course){
            GetUserEnrolledCourse()
        }
    },[params.course,user])

    useEffect(()=>{
        isChapterComplete&&GetUserEnrolledCourse()
    },[isChapterComplete])

    const UserEnrolledCourse=()=>{
        enrollCourse(params.course.id,user.primaryEmailAddress.emailAddress)
        .then(resp=>{
            // console.log(resp)
            if(resp){
                ToastAndroid.show('Course Enrolled successfully!', ToastAndroid.LONG);
                GetUserEnrolledCourse()
            }
        })
    }

    const GetUserEnrolledCourse=()=>{
        getUserEnrolledCourse(params.course.id,user.primaryEmailAddress.emailAddress)
        .then(resp=>{
            // console.log("--",resp.userEnrollCourses)
            setUserEnrolledCourse(resp.userEnrolledCourses)
        })
    }

    return params.course && (
        <ScrollView>
        <Animated.View style={{ padding: 20, marginTop: 10, opacity: fadeAnim }}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <Ionicons name="arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>
            <DetailSection course={params.course} 
            userEnrolledCourse={userEnrolledCourse}
            enrollCourse={()=>UserEnrolledCourse()} />
            <ChapterSection chapterList={params.course.chapters}
            userEnrolledCourse={userEnrolledCourse}/>
        </Animated.View>
        </ScrollView>
    );
}
