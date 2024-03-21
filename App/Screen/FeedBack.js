import React, { useState } from 'react';
import { View, Text, TextInput} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { useClerk } from '@clerk/clerk-react';
import { db } from '../Components/config';
import {doc,addDoc, collection} from 'firebase/firestore'
import Colors from '../Utils/Colors';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { ToastAndroid } from 'react-native';

const FeedbackForm = () => {
  const { user } = useClerk();
  const userEmail = user.primaryEmailAddress.emailAddress;
  const [overallRating, setOverallRating] = useState('');
  const [courseContentRating, setCourseContentRating] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState('false');
  const [mostValuableCourse, setMostValuableCourse] = useState('');
  const [howFoundOut, setHowFoundOut] = useState('');

  const handleSubmitFeedback = () => {
    if((overallRating <= 5)&&(overallRating >0)&&(courseContentRating<= 5)&&(courseContentRating >0)){
    addDoc(collection(db,"Feedback"),{
      userEmail:userEmail,
      overallRating:overallRating,
      courseContentRating:courseContentRating,
      wouldRecommend:wouldRecommend,
      mostValuableCourse:mostValuableCourse,
      howFoundOut:howFoundOut,
    }).then(()=>{
      ToastAndroid.show('Feedback Submitted',ToastAndroid.LONG)
      console.log("Data Submitted")
    }).catch((err)=>{
      console.log(err)
    })
  }
  else{
    ToastAndroid.show('Rating should be between 1 to 5',ToastAndroid.LONG)
  }};

  return (
    <View>
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
      Feedback
      </Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Overall Rating:</Text>
        <TextInput
          style={styles.input}
          value={overallRating}
          onChangeText={setOverallRating}
          placeholder="Enter overall rating"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Course Content Rating:</Text>
        <TextInput
          style={styles.input}
          value={courseContentRating}
          onChangeText={setCourseContentRating}
          placeholder="Enter course content rating"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Most Valuable Course:</Text>
        <Picker
          style={styles.input}
          selectedValue={mostValuableCourse}
          onValueChange={(value) => setMostValuableCourse(value)}
        >
          <Picker.Item label="Basic Python" value="Basic Python" />
          <Picker.Item label="Basic Java" value="Basic Java" />
          <Picker.Item label="Basic C++" value="Basic C++" />
          <Picker.Item label="Expert in SQL" value="Expert in SQL" />
          <Picker.Item label="Advance Javascript" value="Advance Javascript" />
        </Picker>

        <Text style={styles.label}>Would you recommend our courses to others?</Text> 
        <Checkbox
          value={wouldRecommend}
          onValueChange={setWouldRecommend}
          style={styles.input}
        />

        <Text style={styles.label}>How did you find out about our courses?</Text>
        <TextInput
          style={styles.input}
          value={howFoundOut}
          onChangeText={setHowFoundOut}
          placeholder="Enter how found out"
        />
        <GestureHandlerRootView>
        <TouchableOpacity
          onPress={handleSubmitFeedback}
          style={{
            backgroundColor: Colors.WHITE,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center',
            padding: 10,
            marginTop: 25,
            borderRadius: 99,
          }}>
          <Text style={{ fontSize: 20, color: Colors.PRIMARY, fontFamily: 'outfit-regular' }}>
            Submit Feedback
          </Text>
        </TouchableOpacity>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-bold',
    fontSize: 30,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  label: {
    color: Colors.BLACK,
    fontFamily: 'outfit-semibold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
};

export default FeedbackForm;

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button} from 'react-native';
// // import CheckBox from '@react-native-community/checkbox';
// import { Picker } from '@react-native-picker/picker';
// import { useClerk } from '@clerk/clerk-react';
// import { db } from '../Components/config';
// import {doc,addDoc, collection} from 'firebase/firestore'
// import Colors from '../Utils/Colors';
// import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

// const FeedbackForm = () => {
//     const { user } = useClerk();
//     const userEmail = user.primaryEmailAddress.emailAddress;
//     const [overallRating, setOverallRating] = useState('');
//     const [courseContentRating, setCourseContentRating] = useState('');
//     // const [likedFeatures, setLikedFeatures] = useState([]);
//     const [mostValuableCourse, setMostValuableCourse] = useState('');
//     const [howFoundOut, setHowFoundOut] = useState('');

//   const handleSubmitFeedback = () => {
//         addDoc(collection(db,"Feedback"),{
//           userEmail:userEmail,
//           overallRating:overallRating,
//           courseContentRating:courseContentRating,
//           // likedFeatures:likedFeatures,
//           mostValuableCourse:mostValuableCourse,
//           howFoundOut:howFoundOut
//         }).then(()=>{
//           console.log("Data Submitted")
//         }).catch((err)=>{
//           console.log(err)
//         })
//       };

//   return (
//     <View >
//       <View style={{
//       height:160,
//       backgroundColor:Colors.PRIMARY,
//       padding:30
//     }}>
//       <Text style={{
//         fontFamily:'outfit-bold',
//         color:Colors.WHITE,
//         fontSize:30
//       }}>
//       Feedback
//       </Text>
//       </View>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Overall Rating:</Text>
//         <TextInput
//           style={styles.input}
//           value={overallRating}
//           onChangeText={setOverallRating}
//           placeholder="Enter overall rating"
//           keyboardType="numeric"
//         />

//         <Text style={styles.label}>Course Content Rating:</Text>
//         <TextInput
//           style={styles.input}
//           value={courseContentRating}
//           onChangeText={setCourseContentRating}
//           placeholder="Enter course content rating"
//           keyboardType="numeric"
//         />

//         <Text style={styles.label}>Most Valuable Course:</Text>
//         <Picker
//           style={styles.input}
//           selectedValue={mostValuableCourse}
//           onValueChange={(value) => setMostValuableCourse(value)}
//         >
//           <Picker.Item label="Basic Python" value="Basic Python" />
//           <Picker.Item label="Basic Java" value="Basic Java" />
//           <Picker.Item label="Basic C++" value="Basic C++" />
//           <Picker.Item label="Expert in SQL" value="Expert in SQL" />
//           <Picker.Item label="Advance Javascript" value="Advance Javascript" />
//         </Picker>

//         <Text style={styles.label}>How did you find out about our courses?</Text>
//         <TextInput
//           style={styles.input}
//           value={howFoundOut}
//           onChangeText={setHowFoundOut}
//           placeholder="Enter how found out"
//         />
//         <GestureHandlerRootView>
//         <TouchableOpacity
//           onPress={handleSubmitFeedback}
//           style={{
//             backgroundColor: Colors.WHITE,
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 10,
//             justifyContent: 'center',
//             padding: 10,
//             marginTop: 25,
//             borderRadius: 99,
//           }}>
//           <Text style={{ fontSize: 20, color: Colors.PRIMARY, fontFamily: 'outfit-regular' }}>
//             Submit Feedback
//           </Text>
//         </TouchableOpacity>
//         </GestureHandlerRootView>
//       </View>
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     backgroundColor: Colors.BACKGROUND_COLOR,
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   welcomeText: {
//     color: Colors.WHITE,
//     fontFamily: 'outfit-bold',
//     fontSize: 30,
//   },
//   formContainer: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   label: {
//     color: Colors.BLACK,
//     fontFamily: 'outfit-semibold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: Colors.PRIMARY,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 20,
//   },
// };

// export default FeedbackForm;
