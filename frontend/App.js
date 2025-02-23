import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { useFonts, 
  Inconsolata_200ExtraLight,
  Inconsolata_300Light,
  Inconsolata_400Regular,
  Inconsolata_500Medium,
  Inconsolata_600SemiBold,
  Inconsolata_700Bold,
  Inconsolata_800ExtraBold,
  Inconsolata_900Black
} from '@expo-google-fonts/inconsolata';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons Imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCompass, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';

// Screen Imports
import Landing from './Screens/Landing';
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import PersonalInfo from './Screens/PersonalInfo';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import NewNote from './Screens/NewNote';
import Annotated from './Screens/Annotated';

// Colors Import
import * as Colors from './components/Colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs();

function BottomTab({ route }) {
  const { uid } = route.params;
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
          backgroundColor: Colors.background,
        },
        tabBarInactiveTintColor: Colors.secondaryDark,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ uid }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faCompass} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NewNote"
        component={NewNote}
        initialParams={{ uid }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faPlusCircle} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ uid }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Inconsolata_200ExtraLight,
    Inconsolata_300Light,
    Inconsolata_400Regular,
    Inconsolata_500Medium,
    Inconsolata_600SemiBold,
    Inconsolata_700Bold,
    Inconsolata_800ExtraBold,
    Inconsolata_900Black
  });

  if (!fontsLoaded) {
    return null; // or return a loading screen component
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Annotated" component={Annotated} />
          <Stack.Screen name="NewNote" component={NewNote} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}