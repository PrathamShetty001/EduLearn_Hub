import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker } from 'react-native';
import { useClerk } from '@clerk/clerk-react';
import firebase from 'firebase/app';
import 'firebase/database'; // Import the Firebase Realtime Database module

const FeedBack = () => {
  const { user } = useClerk();
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [likedFeatures, setLikedFeatures] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmitFeedback = () => {
    if (!user) {
      // Handle case when user is not authenticated
      return;
    }

    // Get user's email from Clerk user object
    const userEmail = user.primaryEmailAddress;

    // Create a new feedback entry
    const feedbackData = {
      userEmail,
      rating,
      comments,
      likedFeatures,
      selectedOption,
      timestamp: firebase.database.ServerValue.TIMESTAMP // Include timestamp
    };

    // Store feedback data in Firebase Realtime Database
    firebase.database().ref('feedback').push(feedbackData)
      .then(() => {
        // Feedback stored successfully
        // Reset form fields
        setRating('');
        setComments('');
        setLikedFeatures([]);
        setSelectedOption('');
      })
      .catch(error => {
        // Handle error
        console.error('Error storing feedback:', error);
      });
  };

  return (
    <View>
      <Text>Rate the courses:</Text>
      <TextInput
        placeholder="Enter rating (out of 5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <Text>Comments:</Text>
      <TextInput
        placeholder="Enter your comments"
        value={comments}
        onChangeText={setComments}
        multiline
      />
      <Text>What features did you like?</Text>
      <CheckBox
        title="Interactive quizzes"
        checked={likedFeatures.includes('Interactive quizzes')}
        onPress={() => toggleLikedFeature('Interactive quizzes')}
      />
      <CheckBox
        title="Clear course structure"
        checked={likedFeatures.includes('Clear course structure')}
        onPress={() => toggleLikedFeature('Clear course structure')}
      />
      <Text>Select an option:</Text>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker>
      <Button title="Submit Feedback" onPress={handleSubmitFeedback} />
    </View>
  );
};

export default FeedBack;
