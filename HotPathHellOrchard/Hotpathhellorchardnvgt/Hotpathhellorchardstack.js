import { createStackNavigator } from '@react-navigation/stack';
import HomeHotOrchard from '../Hotpathhellorchardscrns/Hotpathhellorchardhome';
import OnboardHotOrchard from '../Hotpathhellorchardscrns/Hotpathhellorchardonboard';
import SettingsHotOrchard from '../Hotpathhellorchardscrns/Hotpathhellorchardonsettings';
import GameHotOrchard from '../Hotpathhellorchardscrns/Hotpathhellorchardongame';
import PuzzleHotOrchard from '../Hotpathhellorchardscrns/Hotpathhellorchardonpuzzle';
import Hotpathhellorchardabout from '../Hotpathhellorchardscrns/Hotpathhellorchardabout';
import Hotpathhellorchardhome from '../Hotpathhellorchardscrns/Hotpathhellorchardhome';
import Hotpathhellorchardonboard from '../Hotpathhellorchardscrns/Hotpathhellorchardonboard';
import Hotpathhellorchardongame from '../Hotpathhellorchardscrns/Hotpathhellorchardongame';
import Hotpathhellorchardonpuzzle from '../Hotpathhellorchardscrns/Hotpathhellorchardonpuzzle';
import Hotpathhellorchardonsettings from '../Hotpathhellorchardscrns/Hotpathhellorchardonsettings';

const Stack = createStackNavigator();

const Hotpathhellorchardstack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Hotpathhellorchardonboard"
        component={Hotpathhellorchardonboard}
      />
      <Stack.Screen
        name="Hotpathhellorchardhome"
        component={Hotpathhellorchardhome}
      />
      <Stack.Screen
        name="Hotpathhellorchardabout"
        component={Hotpathhellorchardabout}
      />
      <Stack.Screen
        name="Hotpathhellorchardonsettings"
        component={Hotpathhellorchardonsettings}
      />
      <Stack.Screen
        name="Hotpathhellorchardongame"
        component={Hotpathhellorchardongame}
      />
      <Stack.Screen
        name="Hotpathhellorchardonpuzzle"
        component={Hotpathhellorchardonpuzzle}
      />
    </Stack.Navigator>
  );
};

export default Hotpathhellorchardstack;
