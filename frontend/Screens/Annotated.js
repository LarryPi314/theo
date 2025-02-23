import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import * as Colors from '../components/Colors';
import { getJournal } from '../components/FunctionCalls';
import RBSheet from "react-native-raw-bottom-sheet"; // Import the bottom sheet package
import { PurpleButton } from '../components/Button';

export default function Annotated({ navigation, route }) {
  const { journalId } = route.params;
  const [journal, setJournal] = useState({ text: '', title: '' });
  const [annotations, setAnnotations] = useState([]);
  const [currentAnnotation, setCurrentAnnotation] = useState(null);

  // Create a ref to control the bottom sheet.
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    const fetchJournal = async () => {
      const journal = await getJournal(journalId);
      console.log("journal annotations: ", journal.annotations);
      setJournal(journal);
      setAnnotations(journal.annotations);
    };
    fetchJournal();
  }, [journalId]);

  // Helper function to render journal text with all key phrases highlighted.
  const renderHighlightedText = () => {
    if (!journal.text) return null;
    const fullText = journal.text;
    let intervals = [];

    // Find all occurrences of each annotation's keyPhrase.
    annotations.forEach((annotation) => {
      if (annotation.keyPhrase) {
        let startIndex = 0;
        while (true) {
          const index = fullText.indexOf(annotation.keyPhrase, startIndex);
          if (index === -1) break;
          intervals.push({
            start: index,
            end: index + annotation.keyPhrase.length,
            annotation: annotation,
          });
          startIndex = index + annotation.keyPhrase.length;
        }
      }
    });

    // Sort intervals so that they appear in order.
    intervals.sort((a, b) => a.start - b.start);

    let components = [];
    let currentIndex = 0;

    intervals.forEach((interval) => {
      // Skip if this interval overlaps with the previous one.
      if (interval.start < currentIndex) {
        return;
      }
      // Append any plain text before this highlighted segment.
      if (interval.start > currentIndex) {
        components.push(
          <Text key={`plain-${currentIndex}`}>
            {fullText.substring(currentIndex, interval.start)}
          </Text>
        );
      }
      // Select the highlight color based on annotation type.
      let backgroundColor;
      switch (interval.annotation.type) {
        case "connection":
          backgroundColor = "#8256F838"; // 15% opacity version of "#8256F8"
          break;
        case "question":
          backgroundColor = "#03B5AA38"; // fallback light pink
          break;
        case "action":
          backgroundColor = "#FFA20038"; // 15% opacity version of "#FFA200"
          break;
      }

      // Render the highlighted segment with extra horizontal padding.
      components.push(
        <Text
          key={`highlight-${interval.start}`}
          style={[styles.highlightedText, { backgroundColor, paddingHorizontal: 4 }]}
          onPress={() => {
            setCurrentAnnotation(interval.annotation);
            // Open the bottom drawer when a highlighted text is pressed.
            if (bottomSheetRef.current) {
              bottomSheetRef.current.open();
            }
          }}
        >
          {fullText.substring(interval.start, interval.end)}
        </Text>
      );
      currentIndex = interval.end;
    });

    // Append any text after the last highlight.
    if (currentIndex < fullText.length) {
      components.push(
        <Text key={`plain-end`}>
          {fullText.substring(currentIndex)}
        </Text>
      );
    }
    return components;
  };

  const renderAnnotationDetails = () => {
    if (!currentAnnotation) return null;

    const renderButton = () => {
      switch (currentAnnotation.type) {
        case "connection":
          return (
            <View style={{width: '100%', alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
              <Text style={styles.buttonText}>
                You wrote about this in another journey- maybe you should go back and read it?
              </Text>
            <View style={styles.buttonContainer}>              
              <PurpleButton
                title="Check it out"
                width="80%"
                height={50}
                onPress={() => {
                  console.log("Connection button pressed");
                  bottomSheetRef.current.close();
                  navigation.navigate('Annotated', { journalId: currentAnnotation.journalId });
                }}
              />
            </View>
            </View>
          );
        case "question":
          return (
            <View style={{width: '100%', alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
              <Text style={styles.buttonText}>
                {currentAnnotation.content}
              </Text>

              <View style={styles.buttonContainer}>

                <PurpleButton
                  title="Reflect"
                  width="80%"
                height={50}
                onPress={() => {
                  console.log("Connection button pressed");
                  bottomSheetRef.current.close();
                  navigation.navigate('NewNote', { uid: journal.user });
                  }}
                />
              </View>
            </View>
          );
        case "action":
          return (
            <View style={{width: '100%', alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
              <Text style={styles.buttonText}>
                Would you like to schedule {currentAnnotation.content.title} from {new Date(currentAnnotation.content.startTime).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })} to {new Date(currentAnnotation.content.endTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })}?
              </Text>
            <View style={styles.buttonContainer}>
              <PurpleButton
                title="Schedule"
                width="80%"
                height={50}
                onPress={() => {
                  console.log("Action button pressed");
                  // Add action-specific logic here
                }}
              />
            </View>
            </View>
          );
        default:
          return null;
      }
    };

    return (
      <View style={styles.annotationContainer}>
        <View style={styles.annotationContent}>
          <View style={styles.navigationRow}>
            <TouchableOpacity 
              onPress={() => {
                const currentIndex = annotations.findIndex(a => a.id === currentAnnotation.id);
                if (currentIndex > 0) {
                  setCurrentAnnotation(annotations[currentIndex - 1]);
                }
              }}
            >
              <FontAwesomeIcon 
                icon={faChevronLeft} 
                size={24}
                color={Colors.primaryDark}
                style={{ opacity: annotations.findIndex(a => a.id === currentAnnotation.id) === 0 ? 0.3 : 1 }}
              />
            </TouchableOpacity>

            <Text style={styles.paginationText}>
              {annotations.findIndex(a => a.id === currentAnnotation.id) + 1} / {annotations.length}
            </Text>

            <TouchableOpacity
              onPress={() => {
                const currentIndex = annotations.findIndex(a => a.id === currentAnnotation.id);
                if (currentIndex < annotations.length - 1) {
                  setCurrentAnnotation(annotations[currentIndex + 1]);
                }
              }}
            >
              <FontAwesomeIcon 
                icon={faChevronRight}
                size={24}
                color={Colors.primaryDark}
                style={{ opacity: annotations.findIndex(a => a.id === currentAnnotation.id) === annotations.length - 1 ? 0.3 : 1 }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.keyPhraseText}>
            "{currentAnnotation.keyPhrase}"
          </Text>
        </View>

        {renderButton()}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={25}
            color="black"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
        <Text
          style={styles.headerText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {journal.title.toLowerCase()}
        </Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.journalText}>
          {renderHighlightedText()}
        </Text>
      </ScrollView>

      <StatusBar style="auto" />

      {/* Bottom drawer for annotation details */}
      <RBSheet
        ref={bottomSheetRef}
        height={400}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          wrapper: { backgroundColor: "transparent" }, // Disable dark overlay
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 5
          },
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          {
            renderAnnotationDetails()
          }
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    marginTop: '20%',
    marginBottom: '5%',
    position: 'relative',
    width: '100%',
  },
  chevronIcon: {
    position: 'absolute',
    left: '5%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: "Inconsolata-Regular",
    textAlign: 'center',
    width: '70%',
    marginLeft: '15%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: '10%',
    marginTop: '3%',
    marginBottom: 30,
  },
  journalText: {
    fontSize: 18,
    color: Colors.primaryDark,
    lineHeight: 24,
    fontFamily: "Inconsolata-Regular",
  },
  highlightedText: {
    // This style is applied to each highlighted keyPhrase.
    paddingHorizontal: 4,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sheetContent: {
    fontSize: 16,
    color: Colors.primaryDark,
  },
  annotationContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  annotationContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  paginationText: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontFamily: "Inconsolata-Regular",
  },
  keyPhraseText: {
    width: '90%',
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 16,
    color: Colors.primaryDark,
    fontFamily: "Inconsolata-Regular",
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontFamily: "Inconsolata-Bold",
  },
});