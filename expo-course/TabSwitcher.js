import React, {useEffect, useRef, useState} from 'react'
import { Animated, View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'
export default function TabSwitcher() {
const tab = [
    {
        id:1,
        text: "Salut"
    }, 
    {
        id:2,
        text: "Bonjour"
    },
    {
        id:3, 
        text: "Allo"
    }
]
const translateAnimation = useRef(new Animated.Value(0)).current;
const switcher = useRef(null); 
const [width, setWidth] = useState(0); 

useEffect(()=>{
    switcher.current.measure((fx, fy, width, height, px, py) => {
      setWidth(width/tab.length);  
    });
},[switcher])

function handleSwitchTab(index){
Animated.spring(translateAnimation, {
    toValue: index * width, 
    useNativeDriver: true,
    stiffness: 80,
    damping: 15,
    mass: 1,
}).start()
}
    return (
        <View style={styles.switcherContainer} ref={switcher}>
            <Animated.View style={[styles.switcher,{transform:[{translateX:translateAnimation}], width:100}]}>
            </Animated.View>
            {tab.map((item, index)=>{
                return (
                    <View key={item.id} style={[styles.tabContainer,{width:100}]} >
                     <TouchableWithoutFeedback onPress={()=>handleSwitchTab(index)}>
                        <Text style={styles.textTab}>{item.text}</Text>
                    </TouchableWithoutFeedback>
                    </View>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
 switcherContainer: {
  backgroundColor:"#0E0A21",
  width:300,
  height:40,
  
  display:"flex",
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"flex-start",
  shadowColor: "#7a7a89",
  borderRadius:20,
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,
position:"relative",
elevation: 3,
 }, 
 switcher: {
 position:"absolute",
 zIndex:5,
 backgroundColor:"#5543F8",
 height:40,
borderRadius:40
 }, 
 tabContainer:{
 display:"flex", 
 flexDirection:"row",
 alignItems:"center",
 height:40,
 justifyContent:"center",
 zIndex:6,
 },
 textTab:{
    color:"#F7F7F7",
    
 }
})