import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

import AuthContext from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}
