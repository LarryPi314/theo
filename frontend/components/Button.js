import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Colors from './Colors';


export const PurpleButton = ({ 
  title, 
  onPress, 
  loading, 
  backgroundColor, 
  color, 
  width, 
  height, 
  marginTop, 
  marginLeft, 
  marginRight, 
  marginBottom, 
  icon 
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        purpleStyles.button,
        { 
          width: width || purpleStyles.button.width, 
          height: height || purpleStyles.button.height, 
          marginTop,
          marginLeft,
          marginRight,
          marginBottom,
          backgroundColor: backgroundColor || purpleStyles.button.backgroundColor 
        }
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {!loading && icon ? (
          <FontAwesomeIcon icon={icon} size={20} color="white" style={{ marginRight: '6%' }} />
        ) : null}
        {loading ? (
          <ActivityIndicator size="small" color={color || 'white'} />
        ) : (
          <Text style={[purpleStyles.buttonText]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const WhiteButton = ({ title, onPress, backgroundColor, color, width, height, marginTop, marginLeft, marginRight, marginBottom }) => {
    return (
      <TouchableOpacity activeOpacity={0.85} style={[whiteStyles.button, { width: width || whiteStyles.button.width, height: height || whiteStyles.button.height, marginTop: marginTop, marginLeft: marginLeft, marginRight: marginRight, marginBottom: marginBottom}]} onPress={onPress}>
        <Text style={[whiteStyles.buttonText]}>{title}</Text>
      </TouchableOpacity>
    );
  };

const purpleStyles = StyleSheet.create({
  button: {
    backgroundColor: Colors.purple,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 60,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: "Inconsolata-Bold",
  },
});

const whiteStyles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 60,
  },
  buttonText: {
    color: Colors.primaryDark,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: "Inconsolata-Regular",
  },
});