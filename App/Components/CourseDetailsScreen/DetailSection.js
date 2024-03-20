import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import OptionItem from "./OptionItem";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { enrollCourse } from "../../Services";

export default function DetailSection({ course, enrollCourse, userEnrolledCourse }) {
  return (
    <View
      style={{ padding: 10, borderRadius: 15, backgroundColor: Colors.WHITE }}
    >
      <Image
        source={{ uri: course?.banner?.url }}
        style={{
          width: 333,
          height: 190,
          borderRadius: 15,
          
        }}
      />
      <View style={{padding:10}}>
        <Text
          style={{ fontSize: 22, fontFamily: "outfit-semibold", marginTop: 10 }}
        >
          {course.name}
        </Text>

        <View>
          <View style={styles.rowStyle}>
            <OptionItem
              icon={"book-outline"}
              value={course.chapters?.length + " Chapters"}
            />
            <OptionItem icon={"time-outline"} value={course.time} />
          </View>
          <View style={styles.rowStyle}>
            <OptionItem icon={"person-circle-outline"} value={course.author} />
            <OptionItem icon={"cellular-outline"} value={course.level} />
          </View>
        </View>
        <View>
            <Text style={{fontFamily:'outfit-semibold', fontSize:20}}>Description</Text>
            <Text style={{fontFamily:'outfit-regular',lineHeight:23,color:Colors.GRAY}}>{course?.description?.markdown}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row',
        justifyContent:'space-evenly',gap:20}}>
          {userEnrolledCourse?.length==0?
            <TouchableOpacity 
            onPress={()=>enrollCourse()}
            style={{padding:20,backgroundColor:Colors.PRIMARY,
            borderRadius:15}}>
                <Text style={{fontFamily:'outfit-regular',
            color:Colors.WHITE,textAlign:"center", fontSize:15}}>Enroll For Free</Text>
            </TouchableOpacity>:null}
            <TouchableOpacity style={{padding:20,backgroundColor:Colors.SECONDARY,
            borderRadius:15}}>
                <Text style={{fontFamily:'outfit-regular',
            color:Colors.WHITE,textAlign:"center", fontSize:15}}>Membership $2.99/Mon</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
