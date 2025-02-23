import { View, Text, StyleSheet, Alert, Image, ImageBackground, TextInput, ScrollView } from "react-native";
import * as Colors from '../components/Colors'
import { useState, useEffect } from "react";
import { PurpleButton } from "../components/Button";
import { login } from '../components/AuthFunctions';

export default function Login({navigation, route}) {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  async function loginButton() {
    let res = await login(email, password)
    if (res.success) {
      console.log(res.uid)
      navigation.navigate("BottomTab", {uid: res.uid})
    } else {
      Alert.alert(res.message)
    }
  }

  return(
    <View style={styles.container}>
      <Text style={[styles.header, {marginTop: '20%'}]}>login</Text>
      <Text style={[styles.subHeader, {marginTop: '5%'}]}>welcome back</Text>


      <View style={{width: '80%', marginTop: '35%', marginLeft: '10%'}}>
        <Text style={styles.basicText}>email<Text style={{fontWeight: "bold", color: Colors.primary}}> *</Text></Text>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="example@gmail.com" placeholderTextColor={Colors.darkGray} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginTop: '17%', marginLeft: '10%'}}>
        <Text style={styles.basicText}>password<Text style={{fontWeight: "bold", color: Colors.primary}}> *</Text></Text>
        <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="secure password" placeholderTextColor={Colors.darkGray} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14, fontFamily: 'Inconsolata-Regular'}} secureTextEntry={true}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>
      <PurpleButton title="login" onPress={() => loginButton(email, password)} backgroundColor={Colors.primary} width={"80%"} height={60} color={"#fff"} marginTop={'40%'} marginLeft={'10%'}></PurpleButton>
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