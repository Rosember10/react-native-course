import {View, Animated, StyleSheet, Dimensions,} from "react-native";
import useMoveBottomSheet from './useMoveBottomSheet';
const {width} = Dimensions.get("window");
export default function BottomSheet({children}) {
const {animatedHeight, handler, valueTransform, changeIsUp} = useMoveBottomSheet({
    bottomSheetHeight: 500, 
    jumpValue: 20, 
    moveValue: 80,
    duration: 300,   
}); 

return (
    <Animated.View style={[styles.bottomSheet, {transform: [{translateY:valueTransform}], height:animatedHeight}]}>
        <Animated.View style={styles.moverContainer} {...handler}>
            <View style={styles.moverHandler}></View>
        </Animated.View>
        {children}
    </Animated.View>
)}

const styles = StyleSheet.create({
    bottomSheet:{
    backgroundColor:"#0E0A21",
    shadowColor: "#7a7a89",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:  0.16,
    shadowRadius: 1.58,
    elevation: 2,
    width:width,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"flex-start",
    position:"absolute",
    bottom:0,
    zIndex:1000
    }, 
    moverContainer:{
     width:"100%", 
     height:"20%",
     display:"flex",
     flexDirection:"row",
    justifyContent:"center"
    },
    moverHandler:{
        width:"30%", 
        height: 5,
        borderRadius:10,
        marginBottom:10,
        marginTop:10,
        backgroundColor: "#29293F"
      }, 
})