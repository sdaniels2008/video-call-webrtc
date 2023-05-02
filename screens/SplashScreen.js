import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}
