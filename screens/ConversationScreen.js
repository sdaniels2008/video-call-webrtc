import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
import { useQuery } from 'react-query';

import StoreContext from '../contexts/StoreContext';
import MessagesService from '../services/MessagesService';

export default function ConversationScreen({ route }) {
  const { user } = route.params;

  const query = useQuery(['messages', user._id], () => MessagesService.list(user._id))

  const [text, setText] = React.useState('');

  const { userID } = useContext(StoreContext);


  async function send() {
    await MessagesService.send({
      type: 'TEXT',
      text,
      to: user._id,
    });
    setText('');
  }

  if(query.isLoading) {
    return 'loading...';
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ConversationScreen! {user.name}</Text>
      <FlatList
        data={query.data.data.messages}
        renderItem={({ item }) => {
          return <View style={{ backgroundColor: userID === item.author ? 'blue' : 'gray', padding: 10 }}>
            <Text>{item.text}</Text>
          </View>
        }}
      />
      <TextInput
        placeholder="Message..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={() => send()} />
    </View>
  );
}
