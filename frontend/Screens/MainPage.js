import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
// import { getUser, getCarousel, getNotes } from '../components/FunctionCalls';
import { useIsFocused } from '@react-navigation/native';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as Colors from '../components/Colors'

export default function MainPage( {navigation, route} ) {
  const { uid } = route.params;

  const [user, setUser] = useState({name: null, email: null, uid: null}) // TODO add params here
  const [carousel, setCarousel] = useState([])
  // rename it to be "journals"?
  const [notes, setNotes] = useState([])

  const isFocusedMainPage = useIsFocused()

  useEffect(() => {
    if(isFocusedMainPage) {
      async function fetchData() {
        console.log("fetching data...")
  
        /*let userRes = await getUser(uid)
        setUser(userRes)

        let carouselRes = await getCarousel()
        setCarousel(carouselRes)

        let notesRes = await getNotes()
        setNotes(notesRes)*/

        setUser({name: "name", uid: uid})
        setCarousel([{question: "what was the most interesting that happened today?"}, {question: "what was the most interesting that happened today?"}, {question: "what was the most interesting that happened today?"}, {question: "what was the most interesting that happened today?"}, {question: "what was the most interesting that happened today?"}])
        setNotes([
            {title: "note 1", text: "Today was awesome. I love college. In my abstract algebra class, we talked about one of the most beautiful theorems I've ever encountered: Cayley's theorem, which states that every group is isomorphic to a group of permutations. Turns out that no matter how abstract a group may seem, at its core, it can always be represented by something as concrete as permutations of elements. Next level of abstraction, but with such a clear way to understand its structure. Very cool!"},
            {title: "note 2", text: "Hung out with my high school friends today. They're mostly athletes, and we kinda just transitioned into the same college together. It's familiar, which is nice, but I can feel that we're drifting apart. They focus so much on sports, which is cool, but I don't feel the same drive for it. I still have fun with them, but sometimes I feel like an observer in my own group. Is this just part of growing up? Realizing that the people who were 'your people' might not always be your people forever?"},
            {title: "note 3", text: "I had my first real singing lesson today — it's so much harder than I thought! I can carry a tune, but directing my airflow properly? Keeping my throat relaxed? Not yet, not yet. But I know from summer camps that singing well feels magical, so I'll keep trying. "},
            {title: "note 4", text: "I had my first real singing lesson today — it's so much harder than I thought! I can carry a tune, but directing my airflow properly? Keeping my throat relaxed? Not yet, not yet. But I know from summer camps that singing well feels magical, so I'll keep trying. "},
            {title: "note 5", text: "I had my first real singing lesson today — it's so much harder than I thought! I can carry a tune, but directing my airflow properly? Keeping my throat relaxed? Not yet, not yet. But I know from summer camps that singing well feels magical, so I'll keep trying. "},
            // {title: "note 6", text: "I had my first real singing lesson today — it's so much harder than I thought! I can carry a tune, but directing my airflow properly? Keeping my throat relaxed? Not yet, not yet. But I know from summer camps that singing well feels magical, so I'll keep trying. "}
            ])
      }
      fetchData()
    }
  }, [isFocusedMainPage])

  return (
      <ScrollView 
        style={{width: '100%', alignSelf: 'center'}} 
        contentContainerStyle={{paddingBottom: 40, flexGrow: 1}}
      >
        {/* Header */}
        <Text style={{marginTop: '15%', marginLeft: '7%', fontFamily: "Inconsolata-Regular", fontSize: 35, fontWeight: 'bold', color: Colors.purple}}>hey {user.name},</Text>
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
                  height: '75%',
                  width: 200,
                  marginRight: 6,
                  padding: '1%',
                  backgroundColor: Colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }]}>
                <Text style={[styles.primaryDarkText, {fontSize: 18}]}>
                  {item.question}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Notes Section */}
        <Text style={{marginTop: '5%', marginBottom: '3%', marginLeft: '7%', fontFamily: "Inconsolata-Regular", fontSize: 28, fontWeight: 'bold', color: Colors.purple}}>
            your past thoughts</Text>
        {
          notes.map((note, index) => {
            return (
              <TouchableOpacity 
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
                <Text style={[styles.primaryDarkText, {marginTop: 0}]}>
                    {note.title}</Text>
                <Text style={{fontSize: 16, color: Colors.secondaryDark, fontFamily: 'Inconsolata-Regular', marginTop: '0%', marginRight: '2%', textAlign: 'right'}}>
                    Date</Text>
                </View>

                {/*Note preview*/}
                <Text style={[styles.secondaryDarkText, {marginTop: '5%', marginRight: '5%', textAlign: 'justify'}]} numberOfLines={3}>
                    {note.text}</Text>
              </TouchableOpacity>
            )
          })
        }
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