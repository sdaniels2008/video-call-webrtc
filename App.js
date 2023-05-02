import React, { useMemo, useEffect, useReducer } from 'react';
import { useColorScheme, I18nManager, Platform, View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, DarkTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNRestart from 'react-native-restart';
import { useFonts } from 'expo-font';
import { getHeaderTitle } from '@react-navigation/elements';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import StoreContext from './contexts/StoreContext';
import AuthService from './services/AuthService';
import SecureStoreService from './services/SecureStoreService';
import AuthContext from './contexts/AuthContext';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ConversationScreen from './screens/ConversationScreen';
import CallScreen from './screens/CallScreen';
import ProfileScreen from './screens/ProfileScreen';
import ConversationsScreen from './screens/ConversationsScreen';
import ProfileViewScreen from './screens/ProfileViewScreen';
import OnlinePeopleScreen from './screens/OnlinePeopleScreen';
import HTTPService from './services/HTTPService';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient()

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(111, 87, 234)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(245, 245, 245)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

function TabsScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'OnlinePeople') {
          iconName = focused
            ? 'planet'
            : 'planet-outline';
        }

        if (route.name === 'Call') {
          iconName = focused ? 'call' : 'call-outline';
        }

        if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        if (route.name === 'Conversations') {
          iconName = focused
            ? 'chatbubbles'
            : 'chatbubbles-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        borderTopWidth: 0,
        shadowColor: 'transparent',
        borderRadius: 50,
        width: '90%',
        left: '5%',
      },
    })}
  >
      <Tab.Screen name="OnlinePeople" component={OnlinePeopleScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Call" component={CallScreen}  options={{ headerShown: false }} />
      <Tab.Screen name="Conversations" component={ConversationsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App({}) {
  // const scheme = useColorScheme();
  const scheme = 'light'; // FIXME:

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            name: action.name,
            userID: action.userID,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            name: action.name,
            userID: action.userID,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            name: null,
            userID: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      name: null,
      userID: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await SecureStoreService.getItem('token');
        const userID = await SecureStoreService.getItem('userID');
        const name = await SecureStoreService.getItem('name');

        HTTPService.defaults.headers.common.Authorization = `Bearer ${token}`;

        dispatch({ userID, name, token, type: 'RESTORE_TOKEN' });

      } catch (e) {
        console.error(e)
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const { userID, name, token } = await AuthService.signIn(data);

        await SecureStoreService.setItem('userID', userID);
        await SecureStoreService.setItem('name', name);
        await SecureStoreService.setItem('token', token);
        dispatch({ userID, name, token, type: 'SIGN_IN', });
      },
      signOut: async () => {
        await SecureStoreService.deleteItem('name');
        await SecureStoreService.deleteItem('userID');
        await SecureStoreService.deleteItem('token');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        try {
          await AuthService.signUp(data);

          const { userID, name, token } = await AuthService.signIn(data);

          await SecureStoreService.setItem('userID', userID);
          await SecureStoreService.setItem('name', name);
          await SecureStoreService.setItem('token', token);
          dispatch({ userID, name, token, type: 'SIGN_IN', });
        } catch (error) {
          console.error(error);
          ToastAndroid.show('Network error!', ToastAndroid.LONG);
        }
      },
    }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
    <AuthContext.Provider value={authContext}>
      <StoreContext.Provider value={state}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShadowVisible: false,
            headerLeft: null,
            header: ({ navigation, route, options, back }) => {
              const title = getHeaderTitle(options, route.name);
              return (
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: 'white',
                  }}
                >
                    {back && (
                      <TouchableOpacity onPress={navigation.goBack}>
                        <Ionicons name="chevron-back" size={32} style={{ transform: [{ rotate: '180deg' }], marginRight: 10, marginLeft: 10 }} />
                      </TouchableOpacity>
                    )}
                    <Text>{title}</Text>
                </View>
              );
            },
          }}
        >
        {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken === null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  headerShown: false,
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
              />
            </>
          ) : (
            <>
            <Stack.Screen name="Home" component={TabsScreen} />
            <Stack.Screen name="Conversation" component={ConversationScreen}
              options={({ route }) => ({ title: route.params.user.name })}
            />
            <Stack.Screen name="ProfileView" component={ProfileViewScreen}
              options={({ route }) => ({ title: route.params.user.name })}
            />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      </StoreContext.Provider>
    </AuthContext.Provider>
    </QueryClientProvider>
  );
}
