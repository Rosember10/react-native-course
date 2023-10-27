import { View, Button, Text, TouchableWithoutFeedback, TouchableOpacity, Animated, PanResponder, Easing, ScrollView, Dimensions, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';

export default function AnimatedValuexy() {
    //const position = useRef(new Animated.ValueXY({x:10,y:10})).current; // cuando se quiere dejar en el centro se inicializa en 0 
    const animatedPosition = useRef(new Animated.ValueXY()).current; // cuando se quiere dejar en el centro se inicializa en 0 

    const startAnimation = () => {
        Animated.timing(animatedPosition, {
            toValue: { x: 100, y: -150 },  // 
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    function restartAnimation() {
        Animated.timing(animatedPosition, {
            toValue: { x: 10, y: 10 },  // 
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedPosition.getLayout()]} />
            {/* <Animated.View style={[styles.box, [
                {
                    transform:animatedPosition.getTranslateTransform()
                }
            ]]} /> */}
            <Button title="move square" onPress={startAnimation} />
            <Button title="restart square" onPress={restartAnimation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    box: {
        marginBottom: 40,
        width: 100,
        height: 100,
        backgroundColor: 'greenyellow',
    },
});
