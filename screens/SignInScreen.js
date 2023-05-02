import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import AuthContext from '../contexts/AuthContext';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign in!</Text>
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
      <Button title="Sign in" onPress={() => signIn({ email, password })} />
      <Button title="Go to SignUp" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}
