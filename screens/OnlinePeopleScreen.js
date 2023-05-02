import React, {useEffect, useState, useRef} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import UsersService from '../services/UsersService';

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

export default function OnlinePeopleScreen({ navigation }) {
  const query = useQuery('online-users', UsersService.listOnlineUsers)

  if(query.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Let's find a few online people to chat...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={query.data.data.onlineUsers}
        renderItem={({ item: user }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProfileView', { user: { _id: user._id, name: user.name } })}>
            <Text key={user.id} style={styles.item}>{user._id} {user.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
