import { View, Button, Text, TouchableWithoutFeedback, TouchableOpacity, Animated, PanResponder, Easing, ScrollView, Dimensions, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';

export default function AnimatedParallel() {
  const animatedOpacity = useRef(new Animated.Value(1)).current; 
  const animatedWidth = useRef(new Animated.Value(0)).current; 
  
  /**
   * function that initiates the parallel effect
   */  
  function animatedParallel () {
    Animated.parallel([
        Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }), 
          Animated.timing(animatedWidth, {
            toValue: 300, 
            duration: 2000,
            useNativeDriver: false, 
          })
    ]).start();
  }

  function restartParallel() {
    //  animatedOpacity.setValue(1);
    //  animatedWidth.setValue(0);

     Animated.parallel([
        Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }), 
          Animated.timing(animatedWidth, {
            toValue: 100, 
            duration: 2000,
            useNativeDriver: false, 
          })
    ]).start();
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box,{width:animatedWidth}]}>
      </Animated.View>
      <Animated.View style={[styles.box2,{opacity:animatedOpacity}]}>
      </Animated.View>
      <Button title="start Paralell" onPress={animatedParallel} />
      <Button title="restart Paralell" onPress={restartParallel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    backgroundColor:'dodgerblue',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor:'greenyellow',
    marginBottom:10,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});