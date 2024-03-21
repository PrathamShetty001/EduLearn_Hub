// import { View, Text,Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import image from './../../assets/images/image.png'
// import google from './../../assets/images/google.png'
// import Colors from '../Utils/Colors'
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen() {
//   useWarmUpBrowser();
 
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
//   const onPress = React.useCallback(async () => {
//     try {
//       const { createdSessionId, signIn, signUp, setActive } =
//         await startOAuthFlow();
 
//       if (createdSessionId) {
//         setActive({ session: createdSessionId });
//       } else {
//         // Use signIn or signUp for next steps such as MFA
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//     }
//   }, []);

//   return (
//     <View style={{display:'flex',alignItems:'center'}}>
//       <Image source={image} 
//       style={{width:250,height:500,objectFit:'contain',marginTop:70}}/>
//       <View style={{
//         height:400,
//         backgroundColor:Colors.PRIMARY,
//         width:390,
//         marginTop:-100,
//         padding:20,
//       }}>
//         <Text style={{textAlign:'center',
//         fontSize:60,
//         color:Colors.WHITE,
//         fontFamily:'outfit-bold'}}>
//         {'</>'}
//         </Text>
//         <Text style={{textAlign:'center',
//         fontSize:35,
//         color:Colors.WHITE,
//         fontFamily:'outfit-bold',
//         marginTop:-10}}>
//         CODEBOX
//         </Text>
//         <Text style={{textAlign:'center',
//         color:Colors.LIGHT_PRIMARY,
//         fontSize:20,
//         marginTop:20,
//         fontFamily:'outfit-regular'}}>
//         Your Ultimate Programming Learning Box
//         </Text>
//         <TouchableOpacity 
//         onPress={onPress}
//         style={{backgroundColor:Colors.WHITE,
//         display:'flex',flexDirection:'row',
//         alignItems:'center',gap:10, 
//         justifyContent:'center',
//         padding:10,marginTop:25,
//         borderRadius:99}}>
//             <Image source={google}
//             style={{width:40,height:40}}/>
//             <Text style={{fontSize:20,
//                 color:Colors.PRIMARY,
//                 fontFamily:'outfit-regular'}}>Sign In with Google</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import image from './../../assets/images/image.png';
import google from './../../assets/images/google.png';
import Colors from '../Utils/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  // Create animated value for moving text animation
  const moveAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Image source={image} style={{ width: 250, height: 500, objectFit: 'contain', marginTop: 70 }} />
      <View
        style={{
          height: 400,
          backgroundColor: Colors.PRIMARY,
          width: 390,
          marginTop: -100,
          padding: 20,
        }}>
        <Animated.Text
          style={{
            textAlign: 'center',
            fontSize: 60,
            color: Colors.WHITE,
            fontFamily: 'outfit-bold',
            transform: [{ translateX: moveAnim }],
          }}>
          {'</>'}
        </Animated.Text>
        <Text style={{ textAlign: 'center', fontSize: 35, color: Colors.WHITE, fontFamily: 'outfit-bold', marginTop: -10 }}>
          EduLearn Hub
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.LIGHT_PRIMARY,
            fontSize: 20,
            marginTop: 20,
            fontFamily: 'outfit-regular',
          }}>
          Your Ultimate Programming Learning Box
        </Text>
        <TouchableOpacity
          onPress={onPress}
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
          <Image source={google} style={{ width: 40, height: 40 }} />
          <Text style={{ fontSize: 20, color: Colors.PRIMARY, fontFamily: 'outfit-regular' }}>
            Sign In with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
