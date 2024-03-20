// import { View, Text, ToastAndroid } from 'react-native'
// import React from 'react'
// import { Ionicons } from '@expo/vector-icons';
// import Colors from '../../Utils/Colors';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';

// export default function ChapterSection({chapterList,userEnrolledCourse}) {
  
//   const navigation=useNavigation()

//   const OnChapterPress=(content)=>{
//       if(userEnrolledCourse.length==0)
//       {
//         ToastAndroid.show('Please Enroll Course!',ToastAndroid.LONG)
//         return;
//       }
//       else{
//         navigation.navigate('chapter-content',{
//           content:content
//         })
//       }
//   }
  
//   return (
//     <View style={{padding:10,backgroundColor:Colors.WHITE,
//     marginTop:20,borderRadius:15}}>
//       <Text style={{fontFamily:'outfit-semibold',
//       fontSize:22, marginBottom:10}}>Chapters</Text>
//       {chapterList.map((item,index)=>(
//         <TouchableOpacity 
//         onPress={()=>OnChapterPress(item.content)}
//         style={{display:'flex',flexDirection:'row',marginBottom:10,
//         alignItems:'center',gap:10,padding:10,justifyContent:'space-between',
//         borderWidth:1,borderRadius:10,borderColor:Colors.GRAY}}>
//           <View style={{display:'flex',flexDirection:'row',
//           alignItems:'center',gap:10,}}>
//             <Text style={{fontFamily:'outfit-semibold',fontSize:27,color:Colors.GRAY}}>{index+1}</Text>
//             <Text style={{fontFamily:'outfit-regular',fontSize:21,color:Colors.GRAY}}>{item.title}</Text>
//           </View>
//          {userEnrolledCourse.length==0? 
//          <Ionicons name="lock-closed" size={25} color={Colors.GRAY}/>
//          :
//          <Ionicons name="play" size={25} color={Colors.GRAY}/>
//          }
//         </TouchableOpacity>
//       ))}
//     </View>
//   )
// }


import { View, Text, ToastAndroid, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { CompleteChapterContext } from '../../Context/CompleteChapterContext';

export default function ChapterSection({ chapterList, userEnrolledCourse }) {
  
  const navigation=useNavigation()
  const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext)
  console.log(userEnrolledCourse[0]?.completedChapter)

  const onChapterPress = (chapter) => {
    if (userEnrolledCourse.length === 0) {
      ToastAndroid.show('Please Enroll Course!', ToastAndroid.LONG)
    } else {
      setIsChapterComplete(false)
      navigation.navigate('chapter-content', {
        content: chapter.content,
        chapterId:chapter.id,
        userCourseRecordId:userEnrolledCourse[0]?.id
      })
    }
  }

  const checkIsChapterCompleted=(chapterId)=>{
    if(userEnrolledCourse[0]?.completedChapter?.length<=0){
      return false;
    }
    const resp=userEnrolledCourse[0]?.completedChapter
    .find(item=>item.chapterId==chapterId)
    return resp
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapters</Text>
      {chapterList.map((item, index) => (
        <TouchableOpacity 
          key={index}
          onPress={() => onChapterPress(item)}
          style={[checkIsChapterCompleted(item.id)
          ?styles.CompleteChapter
          :styles.isCompleteChapter]}>
          <View style={styles.chapterContent}>
            {checkIsChapterCompleted(item.id)?
            <Ionicons name="checkmark-circle" size={30} color={Colors.GREEN}/>
            :<Text style={styles.chapterNumber}>{index + 1}</Text>
            }
            <Text style={styles.chapterTitle}>{item.title}</Text>
            <View style={styles.iconContainer}>
              {userEnrolledCourse.length === 0 ? 
                <Ionicons name="lock-closed" size={25} color={Colors.GRAY}/> :
                <Ionicons name="play" size={25} color={checkIsChapterCompleted(item.id)?Colors.GREEN:Colors.GRAY}/>
              }
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 15,
  },
  title: {
    fontFamily: 'outfit-semibold',
    fontSize: 22,
    marginBottom: 10,
  },
  isCompleteChapter: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    overflow: 'hidden',
  },
  CompleteChapter: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GREEN,
    backgroundColor:Colors.LIGHT_GREEN,
    overflow: 'hidden',
  },
  chapterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  chapterNumber: {
    fontFamily: 'outfit-semibold',
    fontSize: 27,
    color: Colors.GRAY,
    marginRight: 10,
  },
  chapterTitle: {
    fontFamily: 'outfit-regular',
    fontSize: 21,
    color: Colors.GRAY,
    flex: 1,
  },
  iconContainer: {
    padding: 10,
  },
});
