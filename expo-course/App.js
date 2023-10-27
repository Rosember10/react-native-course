
import { StyleSheet, Text, View } from 'react-native';
import TopSheet from './TopSheet';
import BottomSheet from './BottomSheet';
import TabSwitcher from './TabSwitcher';
import PratiqueAnimated from './PratiqueAnimated';
import ExerciceAnimated from './ExerciceAnimated';
import AnimatedParallel from './AnimatedParallel';
import AnimatedValuexy from './AnimatedValuexy';
import Layout from './Layout'
export default function App() {
  return (

    <View style={styles.container}>
   {/* <TopSheet>
    <TabSwitcher/>
   </TopSheet>
    <BottomSheet>
    </BottomSheet> */}

    {/* <AnimatedParallel/>  */}
    <Layout/>
    {/* <AnimatedValuexy/>  */}
    
{/* <ExerciceAnimated/> aumenter largeur et opacity */}
{/* <PratiqueAnimated/> aumenter largeuer */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
  display:"flex",
  backgroundColor: '#0E0A21',
  flex:1,
  zIndex:1,
  },

});





