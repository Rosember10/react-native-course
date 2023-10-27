import {useRef} from 'react'; 
import {Animated, PanResponder, Dimensions} from "react-native";

export default function useMoveHeight() {
    const animatedHeight = useRef(new Animated.Value(300)).current;
    const initialY = useRef(0);
    const distanceMoved = useRef(0);
    const isUp = useRef(false);
    const direction = useRef(""); 
    const animationConfig = {
      useNativeDriver: false,
      stiffness: 80,
      damping: 10,
      mass: 1,
    };
      
    const changeIsUp = (newIsUp) => {
      const endValue = newIsUp ? 500 : 300;
      Animated.spring(animatedHeight, {
        toValue: endValue,
        ...animationConfig,
      }).start(() => isUp.current = newIsUp);
    };
  
    const pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        initialY.current = gestureState.moveY;
      },
      onPanResponderMove: (evt, gestureState) => {
        if(gestureState.dy<0){
         direction.current = "up"
        } else if (gestureState.dy>0){
         direction.current = "down"
        }
        console.log(direction.current)
         if(direction.current === "down" && isUp){
            Animated.spring(animatedHeight, {
                toValue: 520, 
                ...animationConfig
            }).start(); 
        }
        
        const distance = isUp.current ? initialY.current - gestureState.moveY : initialY.current + gestureState.moveY;
        distanceMoved.current = distance;
        
      },
      onPanResponderRelease: () => {
        if(direction.current === "down" && isUp){
            Animated.spring(animatedHeight, {
                toValue: 500, 
                ...animationConfig
            }).start(); 
        }
        if (distanceMoved.current > 310) {
          changeIsUp(true);
        } else if (distanceMoved.current < 490) {
          changeIsUp(false);
        }
      },
    });
    const handlerTouch = {...pan.panHandlers}; 
    return {
        animatedHeight, 
        handlerTouch,
        isUp,
    }
  
}
