import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import ContentItem from './ContentItem'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Content({content,onChapterFinish}) {
  
  let contentRef;
  const navigation=useNavigation()
  const [activeIndex,setActiveIndex]=useState(0)


  const onNextBtnPress=(index)=>{
    if(content?.length<=index+1){
      // navigation.goBack()
      onChapterFinish()
      return;
    }
    setActiveIndex(index+1)
    contentRef.scrollToIndex({animated:true,index:index+1})
  }

  return (
    <ScrollView>
    <View style={{height:'100%'}}>
        <ProgressBar 
        contentLength={content?.length}
        contentIndex={activeIndex}/>
        
        <FlatList
        data={content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={(ref)=>{
          contentRef=ref
        }}
        renderItem={({item,index})=>(
          <View style={{width:Dimensions.get('screen').width,padding:20}}>
            <Text style={{fontFamily:'outfit-semibold',
          fontSize:22, marginTop:15}}>{item.heading}</Text>
          <ContentItem description={item?.description?.html}
          output={item?.output?.html}/>
          <TouchableOpacity 
          onPress={()=>onNextBtnPress(index)}
          style={{marginTop:10}}>
            <Text style={{
              padding:15, backgroundColor:Colors.PRIMARY,color:Colors.WHITE,
              borderRadius:10,textAlign:'center',fontFamily:'outfit-regular',
              fontSize:17
            }}>
            {
              content?.length>index+1?'Next':'Finish'
            }
            </Text>
          </TouchableOpacity>
          </View>
  )}/>
    </View>
    </ScrollView>
  )
}