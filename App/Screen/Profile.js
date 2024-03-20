import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Utils/Colors';// Import your color constants
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const navigation = useNavigation();
  const { signOut } = useClerk();
  const {user} = useUser()

  const handleNavigateToCourses = () => {
    navigation.navigate('home');
  };

  const handleNavigateToMyCourses = () => {
    navigation.navigate('my-course');
  };

  const handleLogout = async () => {
    try {
      await signOut(); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View >
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
      Profile
      </Text>
      <View >
        <Image source={{uri:user?.imageUrl}} 
        style={{width:80,height:80, borderRadius:99,margin:50,marginLeft:130}}/>
        <View>
            <Text style={{fontFamily:'outfit-semibold',fontSize:25,marginTop:-40,marginLeft:88}}>{user?.fullName}</Text>
        </View>
      </View>
    </View>
      <View style={styles.navigationOptions}>
        <TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateToCourses} style={styles.navigationButton}>
        <Ionicons name="search" size={50} color={Colors.PRIMARY}/>
          <Text style={styles.navigationButtonText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateToMyCourses} style={styles.navigationButton}>
        <Ionicons name="book" size={50} color={Colors.PRIMARY}/>
          <Text style={styles.navigationButtonText}>My Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.navigationButton}>
        <Ionicons name="power" size={50} color={Colors.PRIMARY}/>
          <Text style={styles.navigationButtonText}>Logout</Text>
        </TouchableOpacity>
        </TouchableOpacity>
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
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: 15,
  },
  welcomeText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-regular',
  },
  fullName: {
    color: Colors.WHITE,
    fontFamily: 'outfit-semibold',
  },
  navigationOptions: {
    marginTop: 200,
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  navigationButton: {
    display:'flex',
    flexDirection:'row',
    gap:15,
    paddingVertical: 12,
    paddingHorizontal:20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 22,
  },
  navigationButtonText: {
    color: Colors.BLACK,
    fontFamily: 'outfit-semibold',
    fontSize: 20,
    alignItems:'center'
  },
};

export default Profile;



