import { View, Text, StyleSheet, Dimensions, Animated, } from 'react-native'
import useMoveHeight from './useMoveHeight';
const {width} = Dimensions.get("window");
/*
Dimensions.get('window') :
Cette méthode renvoie les dimensions de la fenêtre de l'application. 
La "fenêtre" ici fait référence à la zone où votre application est rendue, 
à l'exclusion des éléments tels que la barre de statut ou la barre de navigation. 
Cela signifie que les dimensions renvoyées correspondent à la zone utile de 
l'interface utilisateur de votre application.

Dimensions.get('screen') :
Cette méthode renvoie les dimensions de l'écran physique de l'appareil. 
Cela comprend toute la surface de l'écran, y compris les éventuelles zones 
réservées par le système d'exploitation pour les barres de statut, les barres 
de navigation ou d'autres éléments similaires. Ces dimensions correspondent 
à la taille totale de l'écran de l'appareil.
*/



/*
Pour appliquer un animation dans le changement d'un état on peut utiliser 
LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); 
qui permet de faire un changement d'état fluide avec un animation 
et cette fonction est exécuté peu importe dans la fonction qu'on le place étant un 
event handler

Pour que ca fonction sous android on doit faire : 
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
*/
export default function TopSheet({ children }) {
const {animatedHeight, handlerTouch, isUp} = useMoveHeight(); 
  return (
    <Animated.View style={[styles.topSheetContainer, { height: animatedHeight }]}>
      <View style={styles.topSheetInnerContainer}>
        <View style={styles.innerContainer}>
        {children}
        </View>
      </View>
      <Animated.View style={styles.moverContainer} {...handlerTouch}>
          <View style={styles.moverHandler}></View>
      </Animated.View>
    </Animated.View>
  );
}
  
  const styles = StyleSheet.create({
    topSheetContainer:{
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
    display:"flex",
    alignItems:"center",
    width:width,
    zIndex:999,
    position:"absolute",
    top:0,
    backgroundColor:"#0E0A21",
    shadowColor: "#7a7a89",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:  0.16,
    shadowRadius: 1.58,
    elevation: 2
    },
    topSheetInnerContainer:{
     width:"100%",
     height:"80%",
     display:"flex",
     flexDirection:"column",
     position: "relative",
    }, 
    innerContainer:{
    height:"80%",
    width:"100%",
    marginTop:"15%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
    }, 
    moverContainer:{
        width:"100%",
        height:"20%",
        borderRadius:4,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"flex-end"
        },
    moverHandler:{
      width:"30%", 
      height: 5,
      borderRadius:10,
      backgroundColor: "#29293F",
      marginBottom:10
    },
    })

/*
Panhandler de panResponder.create sont: 

onStartShouldSetResponder: 
Gestionnaire pour le début d'un touché ET Déclenché lors du début d'un touché. Toucher initial
onStartShouldSetResponder: (evt, gestureState) => boolean
Si c'est true devient le répondant pour le toucher initial. Dans le cas ou c'est false ca va automatiquement 
remonté au parent pour voir qui répond true en passant par tout les composants
//par défaut undefiened doit avoir une valeur 

onMoveShouldSetResponder: 
Gestionnaire pour le mouvement d'un touché. ET Déclenché lors du mouvement d'un touché. Mouvement du toucher lorsque le doigt se déplace
onMoveShouldSetResponder: (evt, gestureState) => boolean
Cette méthode est appelée lorsqu'un toucher commence sur le composant. 
Si cette méthode retourne true, le composant deviendra le "répondant" 
aux événements de toucher et les autres méthodes du PanResponder (comme onResponderMove, onResponderRelease, etc.) 
seront appelées pour ce composant.
Si c'est true devient le répondant pour le toucher initial. Dans le cas ou c'est false ca va automatiquement 
remonté au parent pour voir qui répond true en passant par tout les composants
//par défaut undefiened doit avoir une valeur 


onResponderGrant: 
Appelé lorsque le PanResponder devient actif.
La méthode onResponderGrant est appelée lorsque le composant associé au PanResponder obtient 
l'autorisation de devenir le "répondant" pour les événements de toucher. 
Cela se produit généralement après que onStartShouldSetResponder ou 
onMoveShouldSetResponder ait retourné true.
Lorsque onResponderGrant est appelé, le composant a la main sur les événements de toucher subséquents. 
C'est souvent à ce moment que vous initialiserez l'état de votre animation ou que vous effectuerez 
d'autres actions préparatoires avant que l'utilisateur ne commence à interagir avec le composant.
On initialise les variables que nous allons vouloir utiliser à travers les autres méthodes du panResponder

onResponderMove: 
Appelé lorsque l'utilisateur déplace son doigt sur l'écran. Suit en 
temps réel le mouvement du toucher de l'utilisateur


onResponderRelease: 
Appelé lorsque l'utilisateur relève son doigt de l'écran.
Cette méthode est appelée lorsque l'utilisateur relève son doigt de l'écran, 
mettant fin au geste en cours. Vous pouvez utiliser cette méthode pour effectuer des actions de nettoyage, 
comme réinitialiser une animation ou changer l'état d'un composant. 
C'est également le moment où vous pourriez déclencher des actions 
en fonction du geste effectué.


onResponderReject: 
Appelé lorsque la demande de devenir PanResponder est rejetée.


onResponderTerminate: 
Appelé lorsque le PanResponder est terminé par une 
interaction supérieure (par exemple, un nouvel 
PanResponder devient actif).

onResponderTerminationRequest: 
Appelé pour demander la libération du PanResponder.


CHACUN DES PAN HANDLERS PREND DEUX ARGUMENTS: 

EVENT ET GESTURE STATE
*/

/*L'objet gesture state de PanResponder contient plusieurs propriété: 

l'objet gestureState fourni aux gestionnaires d'événements de PanResponder 
contient plusieurs propriétés qui donnent des informations 
sur le geste en cours. Voici quelques-unes des propriétés les plus utilisées :

dx, dy: Le déplacement total en pixels depuis la position initiale 
jusqu'à la position actuelle.

vx, vy: La vitesse du mouvement du 
geste en pixels par seconde.

x0, y0: Les coordonnées x et y où 
le geste a commencé.

moveX, moveY: Les coordonnées x et y où se trouve 
l'utilisateur actuellement. Ceci est mis à jour à chaque mouvement.

numberActiveTouches: Le nombre de doigts 
touchant actuellement l'écran.

stateID: Un identifiant pour le geste en cours. 
Cet identifiant est unique et peut être utilisé pour 
distinguer différents gestes.


*/


  
  
  
  
  






