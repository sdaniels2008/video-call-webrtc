import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

export default function ProfileViewScreen({ route, navigation }) {
  const { user } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ProfileViewScreen! {user.name}</Text>
      <Button title="Say Hi!" onPress={() => navigation.navigate('Conversation', { user: { name: user.name, _id: user._id } })} />
    </View>
  );
}
