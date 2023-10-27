import { View, Button, Text, TouchableWithoutFeedback, TouchableOpacity, Animated, PanResponder, Easing, ScrollView, Dimensions, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';

export default function PratiqueAnimated() {
    const animatedWidth = useRef(new Animated.Value(50)).current;
    const toggle = useRef(false);

    function IncreaseWidth() {
        toggle.current =!toggle.current;
        if(!toggle.current){
            Animated.timing(animatedWidth,{
                toValue: 400, // va meter el valor 
                useNativeDriver: false, // la animacion en el nucleo de javascript o sino sobre el motor nativo de react
                Easing:Easing.ease,
                duration:300,
                // stiffness: 80, 
                // damping: 10,
                // mass: 1,
            }).start();
        }else {
            Animated.timing(animatedWidth,{
                toValue: 50,
                useNativeDriver: false,
                Easing:Easing.ease,
                duration:300,
                // stiffness: 80, 
                // damping: 10,
                // mass: 1,
            }).start();
        }
     
        
    }
    return (
        <View style={style.container}>
            <Button style={style.btn} onPress={IncreaseWidth} title='augmenter la largeur' />
            <Animated.View style={[style.square, { width: animatedWidth }]} >
            </Animated.View>
        </View>
    )

}
const style = StyleSheet.create({
    container: {
        marginTop:100,
     display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    btn : {
        backgroundColor:'lightgray',
    },
    square:{
        // width:50,
        height:50,
        backgroundColor:'blue',
    }
   
});