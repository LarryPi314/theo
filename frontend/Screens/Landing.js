import { StatusBar } from 'expo-status-bar';
import React from 'react';

import * as Colors from '../components/Colors'
import { PurpleButton, WhiteButton } from '../components/Button';
import { StyleSheet, Text, View, Button, Platform, ImageBackground } from 'react-native';
import Logo from '../assets/logo.svg';

export default function Landing({ navigation, route }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bgrnd.png')} style={{height:"100%",width:"100%", alignItems:"center"}} >
        <Logo width={75} height={75} style={{ marginTop: '70%' }} fill={Colors.primary} />
        <Text style={styles.title} marginTop={'5%'} marginBottom={'7%'}>hey there</Text>
        <Text style={styles.subtitle} marginBottom={'0%'}>
          this is <Text style={[styles.logoText]}>[theo]</Text>,
        </Text>
        <Text style={styles.subtitle} marginBottom={'20%'}>your cognition copilot</Text>

        <PurpleButton title="login" marginBottom={'7%'} onPress={() => navigation.navigate('Login', { uid: '123' })} />
        <WhiteButton title="sign up" marginBottom={'10%'} onPress={() => navigation.navigate("SignUp")} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "Inconsolata-Regular",
  },
  title: {
    fontSize: 40,
    // bold text
    fontWeight: 'bold',
    color: Colors.primaryDark,
    fontFamily: "Inconsolata-Regular",
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 600,
    color: Colors.primaryDark,
    marginTop: 10,
    fontFamily: "Inconsolata-Regular",
  },
  logoText: {
    fontSize: 25,
    fontWeight: 800,
    color: Colors.primary,
    marginTop: 10,
    fontFamily: "Inconsolata-Regular",
  }
});