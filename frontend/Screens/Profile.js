import { Alert, StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput, View, Keyboard } from 'react-native';
import { PurpleButton } from '../components/Button';
import { useState, useEffect } from 'react';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import * as Colors from '../components/Colors';

import { createUser, getUser, updateUser } from "../components/FunctionCalls";

export default function Profile( {navigation, route}) {
  const { uid } = route.params

  const [city, setCity] = useState(null);
  const [dob, setDob] = useState(null)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [bio, setBio] = useState(null)
  const [pronouns, setPronouns] = useState(null)

  async function proceed() {
    console.log("Button pressed", uid)
    let user = await getUser(uid)
    console.log("Did we get the user?")
    console.log(user)

    user = {
        ...user,
        name: name,
        uid: uid,
        email: email,
        bio: bio, 
        dob: dob,
        pronouns: pronouns,
        interests: interests,
        city: city,
    }
    
    console.log("We are proceeding!")
    let res = await updateUser(user)

    if(res.status == 200) {
      navigation.navigate("BottomTab", {uid: res.uid})
    } else {
      Alert.alert("Error", "Something went wrong. Please try again.")
    }
  }

  return (
    <View style={styles.container}>
      
      <Text style={{marginTop: '10%', fontSize: 25, fontWeight: '600', color: Colors.primary}}>personal info</Text>
      
      <Text style={styles.header} marginTop={'10%'}>update your settings</Text>

      <View style={{width: '80%', marginTop: '10%'}}>
        <TextInput value={name} onChangeText={text => setName(text)} placeholder="name" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginTop: '8%'}}>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="email" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%',  marginTop: '8%'}}>
        <TextInput value={city} placeholder={`city`} onChangeText={text => setCity(text)}  placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginTop: '8%'}}>
        <TextInput editable={false} value={moment(dob).format("MM/DD/YYYY") == "Invalid date" ? "" : moment(dob).format("MM/DD/YYYY")} onTouchStart={() => {Keyboard.dismiss();setDatePickerVisibility(true);}}  placeholder="date of birth" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>
      
      <View style={{width: '80%', marginTop: '8%'}}>
        <TextInput value={pronouns} onChangeText={text => setPronouns(text)} placeholder="pronouns" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>
      
      <View style={{width: '80%', marginTop: '8%'}}>
        <TextInput value={bio} onChangeText={text => setBio(text)} placeholder="bio" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setDob(date.toISOString())
          setDatePickerVisibility(false)
        }}
        onCancel={() => setDatePickerVisibility(false)}
      >
      </DateTimePickerModal>

      <PurpleButton title="Save changes" onPress={() => proceed()} backgroundColor={Colors.primary} width={"80%"} height={60} color={"#fff"} marginTop={'18%'}></PurpleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
});