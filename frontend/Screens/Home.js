import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { getUser, getJournal, getCarousel } from '../components/FunctionCalls';

import { useIsFocused } from '@react-navigation/native';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import * as Colors from '../components/Colors'

export default function Home({ navigation, route }) {
  const { uid } = route.params;
  console.log("uid: ", uid);

  const [user, setUser] = useState({name: null, email: null, uid: null}) // TODO add params here
  const [carousel, setCarousel] = useState([])
  const [journeys, setJourneys] = useState([])

  const isFocusedMainPage = useIsFocused()

  useEffect(() => {
    if(isFocusedMainPage) {
      async function fetchData() {
        console.log("fetching data...")
  
        let userRes = await getUser(uid)
        console.log("userRes: ", userRes)
        setUser(userRes)

        // Use Promise.all and map to wait for all getJournal calls to complete
        const allJourneys = await Promise.all(
          userRes.journals.map(async (journey) => {
            let journeyData = await getJournal(journey)
            console.log("journeyData: ", journeyData)
            return journeyData
          })
        )
        console.log("allJourneys: ", allJourneys.length)
        setJourneys(allJourneys)

        let carouselRes = await getCarousel(uid)
        console.log("carouselRes: ", carouselRes)
        setCarousel(carouselRes.prompts)
      }
      fetchData()
    }
  }, [isFocusedMainPage])

  return (
      <ScrollView 
        style={{width: '100%', alignSelf: 'center', backgroundColor: Colors.background}} 
        contentContainerStyle={{paddingBottom: 40, flexGrow: 1}}
      >
        {/* Header */}
        <Text style={{marginTop: '20%', marginLeft: '7%', fontFamily: "Inconsolata-Regular", fontSize: 30, fontWeight: 'bold', color: Colors.purple}}>hey {user.name?.split(' ')[0].toLowerCase()},</Text>
        <Text style={{marginTop: '3%', marginLeft: '7%', fontFamily: "Inconsolata-Regular",fontSize: 24, color: Colors.primaryDark}}>what's on your mind?</Text>

        {/* Carousel Section */}
        <View style={{height: 150, marginTop: '10%'}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: '7%'}}>
            {carousel.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.border, {
                  height: '80%',
                  width: 200,
                  marginRight: 20,
                  padding: '1%',
                  backgroundColor: Colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  overflow: 'hidden',
                }]}>
                <Text style={[styles.primaryDarkText, {fontSize: 18}]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Notes Section */}
        <Text style={{marginTop: '5%', marginBottom: '3%', marginLeft: '7%', fontFamily: "Inconsolata-Regular", fontSize: 24, fontWeight: 'bold', color: Colors.purple}}>
            past journeys</Text>
        {journeys.length === 0 ? (
          <Text style={{
            fontFamily: "Inconsolata-Regular",
            fontSize: 16,
            width: '50%',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: '30%',
            color: Colors.secondaryDark
          }}>
            no journal entries yet. start capturing your thoughts today!
          </Text>
        ) : (
          journeys.map((journey, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Annotated', { journalId: journey.id })}
                key={index} 
                style={[styles.border, {
                  width: '90%', 
                  marginLeft: '5%', 
                  height: 150,
                  backgroundColor: Colors.white, 
                  borderRadius: 5, 
                  marginTop: 15, 
                  padding: '5%',
                }]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: '2%'}}>
                {/*Generated note title + date*/}
                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.primaryDarkText, {marginTop: 0, width: '70%'}]}>
                    {journey.title.toLowerCase()}</Text>
                <Text style={{fontSize: 16, color: Colors.secondaryDark, fontFamily: 'Inconsolata-Regular', marginTop: '0%', marginRight: '2%', textAlign: 'right'}}>
                    {new Date(journey.ts).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'})}</Text>
                </View>

                {/*Note preview*/}
                <Text style={[styles.secondaryDarkText, {marginTop: '5%', marginRight: '5%', textAlign: 'justify'}]} numberOfLines={4}>
                    {journey.text}</Text>
              </TouchableOpacity>
            )
          })
        )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    border: {
      borderColor: Colors.lightGray,
      borderWidth: 0.5,
      borderRadius: 5,
    },
    primaryDarkText: {
      fontSize: 20,
      color: Colors.primaryDark,
      fontFamily: 'Inconsolata-Regular',
    },
    secondaryDarkText: {
      fontSize: 14,
      color: Colors.secondaryDark,
      fontFamily: 'Inconsolata-Regular',
    }
  });