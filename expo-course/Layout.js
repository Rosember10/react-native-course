import { View, Text, StyleSheet, Animated } from 'react-native'
import React ,{useRef, useState} from 'react'

export default function Layout() {
    const animatedOpacity = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.square} >
      <Text style={{backgroundColor:'greenyellow', padding:10}} >Layout</Text>
    </View>
  )
}

const styles = StyleSheet.create({
square:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
}
})
