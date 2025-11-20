import { createStackNavigator } from '@react-navigation/stack';
import Hotpathhellorchardabout from '../HellMemoryOfHotGroveScreens/Hotpathhellorchardabout';
import Hotpathhellorchardhome from '../HellMemoryOfHotGroveScreens/Hotpathhellorchardhome';
import Hotpathhellorchardonboard from '../HellMemoryOfHotGroveScreens/Hotpathhellorchardonboard';
import Hotpathhellorchardongame from '../HellMemoryOfHotGroveScreens/Hotpathhellorchardongame';
import Hotpathhellorchardonpuzzle from '../HellMemoryOfHotGroveScreens/Hotpathhellorchardonpuzzle';
import Hotpathhellorchardonsettings from '../HellMemoryOfHotGroveScreens/Hotpathhellorchardonsettings';

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
