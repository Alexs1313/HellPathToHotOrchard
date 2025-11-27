import { createStackNavigator } from '@react-navigation/stack';
import Hotpathhellorchardabout from '../HotGroveScreens/Hotpathhellorchardabout';
import Hotpathhellorchardhome from '../HotGroveScreens/Hotpathhellorchardhome';
import Hotpathhellorchardonboard from '../HotGroveScreens/Hotpathhellorchardonboard';
import Hotpathhellorchardongame from '../HotGroveScreens/Hotpathhellorchardongame';
import Hotpathhellorchardonpuzzle from '../HotGroveScreens/Hotpathhellorchardonpuzzle';
import Hotpathhellorchardonsettings from '../HotGroveScreens/Hotpathhellorchardonsettings';

const Stack = createStackNavigator();

const Hotpathhellorchardstack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Hotpathhellorchardonboar"
        component={Hotpathhellorchardonboar}
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
