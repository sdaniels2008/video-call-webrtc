import React, {useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import AuthContext from '../contexts/AuthContext';

export default function SignUpScreen() {
  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign up!</Text>
      <TextInput
        placeholder="Fullname"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={() => signUp({ fullname, email, password })} />
    </View>
  );
}
