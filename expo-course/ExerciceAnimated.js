import { View, Button, Text, TouchableWithoutFeedback, TouchableOpacity, Animated, PanResponder, Easing, ScrollView, Dimensions, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';

export default function E() {
    const animatedWidth = useRef(new Animated.Value(50)).current;
    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const toggle = useRef(false);

    function IncreaseWidth() {
        toggle.current =!toggle.current;
        if(!toggle.current){
            Animated.sequence([
                Animated.timing(animatedWidth,{
                    toValue: 100, // va modificar el valor 
                    useNativeDriver: false, // la animacion en el nucleo de javascript o sino sobre el motor nativo de react
                    Easing:Easing.ease,
                    duration:300,
                  
                }),
                Animated.timing(animatedOpacity,{
                    toValue: 0, // va modficar el valor 
                    useNativeDriver: false, // la animacion en el nucleo de javascript o sino sobre el motor nativo de react
                    Easing:Easing.ease,
                    duration:100,
                    
                })
            ]).start();
        }else {
                Animated.sequence([
                Animated.timing(animatedWidth,{
                    toValue: 50, // va modificar el valor 
                    useNativeDriver: false, // la animacion en el nucleo de javascript o sino sobre el motor nativo de react
                    Easing:Easing.ease,
                    duration:100,
                   
                }),
                Animated.timing(animatedOpacity,{
                    toValue: 1, // va modficar el valor 
                    useNativeDriver: false, // la animacion en el nucleo de javascript o sino sobre el motor nativo de react
                    Easing:Easing.ease,
                    duration:100,
                   
                })
            ]).start();
     
        
    }}
    return (
        <View style={style.container}>
            <Button style={style.btn} onPress={IncreaseWidth} title='augmenter la largeur et opacite' />
            <Animated.View style={[style.square, { width: animatedWidth , opacity:animatedOpacity}]} >
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
        width:50,
        height:50,
        backgroundColor:'blue',
    }
   
});