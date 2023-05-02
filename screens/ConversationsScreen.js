import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from 'react-query';

import ConversationsService from '../services/ConversationsService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function ConversationsScreen({ navigation }) {
  const query = useQuery('conversations', ConversationsService.list)

  if(query.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <FlatList
          data={query.data.data.conversations}
          renderItem={({ item: conversation }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Conversation', { user: { _id: conversation.user._id, name: conversation.user.name }, conversation: { _id: conversation._id } })}>
              <Text key={conversation._id} style={styles.item}>{conversation._id} {conversation.user.name} {conversation.createdAt}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
