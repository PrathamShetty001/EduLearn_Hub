import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';
import { useUser } from '@clerk/clerk-expo';
// import { UserPointsContext } from '../Context/UserPointsContext';

export default function ChapterContentScreen() {
  const navigation=useNavigation()
  const {user} = useUser
  const param=useRoute().params;
  // const {userPoints,setUserPoints}=useContext(UserPointsContext)
  const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext)

  useEffect(()=>{
    console.log("ChapterId",param.chapterId)
    console.log("RecordId",param.userCourseRecordId)
  },[param])

  const onChapterFinish=()=>{
    // const totalPoints=Number(userPoints)+param.content?.length*10
    MarkChapterCompleted(param.chapterId,param.userCourseRecordId,
      user?.primaryEmailAddress?.emailAddress,50)
      .then(resp=>{
      if(resp){
        ToastAndroid.show('Course Completed!!',ToastAndroid.LONG)
        setIsChapterComplete(true)
        navigation.goBack()
      }
    })
  }

    return param.content&&(
    <View>
      <Content content={param.content}
      onChapterFinish={()=>onChapterFinish()}/>
    </View>
  )
}