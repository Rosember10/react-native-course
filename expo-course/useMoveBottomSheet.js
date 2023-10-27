import {useRef, forwardRef} from 'react'
import { Animated, PanResponder, Easing} from "react-native";
export default function useMoveBottomSheet({bottomSheetHeight, jumpValue, moveValue, duration}) {
  const valueTransform = useRef(new Animated.Value(0)).current;
  const animatedHeight = useRef(new Animated.Value(bottomSheetHeight)).current; 
  const isUp = useRef(false); 
  const direction = useRef("");
  const initialValue = useRef(0); 
  const distanceMoved = useRef(0); 
  const animationConfig = {
    useNativeDriver: false,
    duration: duration, 
    easing: Easing.ease, 
  }
  const springConfig = {
    useNativeDriver: false, 
    stiffness: 80,
    damping: 10,
    mass: 1,
  }
  const changeIsUp = (newIsUp) => {
    const endValue = newIsUp ? 0:bottomSheetHeight;
    Animated.spring(valueTransform, {
      toValue: endValue,
      ...animationConfig,
    }).start(() => isUp.current= newIsUp);
  };
  const pan = PanResponder.create({
    onStartShouldSetPanResponder:()=>true, 
    onMoveShouldSetPanResponder:()=>true, 
    onPanResponderGrant:(event, gesture) =>{
     initialValue.current = gesture.y0
    }, 
      onPanResponderMove:(event, gesture)=>{
        distanceMoved.current = gesture.moveY - initialValue.current; 
         console.log(distanceMoved.current)
        if(gesture.dy<0){
            direction.current = "up"
        } else if (gesture.dy>0){
            direction.current = "down"
        }
        if(direction.current === "down"){
            valueTransform.setValue(gesture.dy);
        } else if (direction.current === "up"){
            Animated.spring(
            animatedHeight, 
            {toValue:bottomSheetHeight+jumpValue,...springConfig}
            ).start(); 
        }
      }, 
    onPanResponderRelease:()=>{
        if (direction.current === "up"){
            Animated.spring(
            animatedHeight, 
            {toValue: bottomSheetHeight,...springConfig}
            ).start();
        }
        if (distanceMoved.current > moveValue) {
           changeIsUp(false)
        } 
    }
  }); 
  const handler = {...pan.panHandlers}
  return {
    handler, 
    animatedHeight, 
    valueTransform, 
    changeIsUp, 
  }
}
