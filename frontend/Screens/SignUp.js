//universal imports; use these in every screen...
import { View, Text, StyleSheet, Alert, Image, ImageBackground, TextInput, ScrollView } from "react-native";
import * as Colors from '../components/Colors'
import { useState, useEffect } from "react";
import { WhiteButton } from "../components/Button";
import { signUpFunction } from "../components/AuthFunctions";

export default function SignUp( {navigation, route} ) {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[passwordConfirm, setPasswordConfirm] = useState('')

  async function signUpButton() {
    console.log(email, password, passwordConfirm)
    if (password === passwordConfirm) { 
      const res = await signUpFunction(email, password)
      if (res.success) {
        navigation.navigate("PersonalInfo", {email: email, uid: res.uid})
      } else {
        Alert.alert(res.message)
      }
    } else {
      Alert.alert('Passwords do not match')
    }
  }

  return(
    <View style={styles.container}>
      
      <Text style={[styles.header, {marginTop: '20%'}]}>sign up</Text>
      <Text style={[styles.subHeader, {marginTop: '3%', fontSize: 18}]}>let's spin up your cognition os</Text>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '20%'}}>
        <Text style={styles.basicText}>email<Text style={{color: Colors.primary}}> *</Text></Text>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="example@gmail.com" placeholderTextColor={Colors.darkGray} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '17%'}}>
        <Text style={styles.basicText}>password<Text style={{color: Colors.primary}}> *</Text></Text>
        <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="secure password" placeholderTextColor={Colors.darkGray} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}} secureTextEntry></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '17%'}}>
        <Text style={styles.basicText}>confirm password<Text style={{color: Colors.primary}}> *</Text></Text>
        <TextInput value={passwordConfirm} onChangeText={text => setPasswordConfirm(text)} placeholder="confirm password" placeholderTextColor={Colors.darkGray} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}} secureTextEntry></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <Text style={[styles.basicText, {width: '80%', fontSize: 14, alignSelf: 'center', marginTop: '15%'}]}>by signing up you agree to our <Text style={{textDecorationLine: 'underline'}}>terms of service</Text> and <Text style={{textDecorationLine: 'underline'}}>privacy policy</Text></Text>

      <WhiteButton title="sign up" onPress={() => signUpButton(email, password)} width={"80%"} height={60} marginLeft={'10%'} marginTop={'20%'}></WhiteButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 40,
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.purple,
    marginLeft: '10%',
    fontFamily: 'Inconsolata-Regular',
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'left',
    fontWeight: 600,
    marginLeft: '10%',
    color: Colors.primaryDark,
    fontFamily: 'Inconsolata-Regular',
  },
  basicText: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.primaryDark,
    fontFamily: 'Inconsolata-Regular',
  }
});