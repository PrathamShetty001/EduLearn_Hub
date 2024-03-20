import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getCourseList } from "../../Services";
import SubHeading from "./SubHeading";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";

export default function CourseList({ level }) {
  const [courseList, setCourseList] = useState([]);
  const navigation=useNavigation();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getCourseList(level).then((resp) => {
      console.log("RESP--", resp);
      setCourseList(resp?.courses);
    });
  };
  return (
    <GestureHandlerRootView>
      <SubHeading text={level+" Courses"} color={level=='Basic'?Colors.WHITE:Colors.BLACK} />
      <FlatList
        data={courseList}
        key={courseList.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('course-detail',{
            course:item
          })}>
            <CourseItem item={item}/>
          </TouchableOpacity>
        )}
      />
    </GestureHandlerRootView>
  );
}
