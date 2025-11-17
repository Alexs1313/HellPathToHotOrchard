import { createStackNavigator } from '@react-navigation/stack';
import HomeHotOrchard from '../ScreensHotOrchard/HomeHotOrchard';
import OnboardHotOrchard from '../ScreensHotOrchard/OnboardHotOrchard';
import AboutHotOrchard from '../ScreensHotOrchard/AboutHotOrchard';
import SettingsHotOrchard from '../ScreensHotOrchard/SettingsHotOrchard';
import GameHotOrchard from '../ScreensHotOrchard/GameHotOrchard';
import PuzzleHotOrchard from '../ScreensHotOrchard/PuzzleHotOrchard';

const Stack = createStackNavigator();

const StackHotOrchard = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardHotOrchard" component={OnboardHotOrchard} />
      <Stack.Screen name="HomeHotOrchard" component={HomeHotOrchard} />
      <Stack.Screen name="AboutHotOrchard" component={AboutHotOrchard} />
      <Stack.Screen name="SettingsHotOrchard" component={SettingsHotOrchard} />
      <Stack.Screen name="GameHotOrchard" component={GameHotOrchard} />
      <Stack.Screen name="PuzzleHotOrchard" component={PuzzleHotOrchard} />
    </Stack.Navigator>
  );
};

export default StackHotOrchard;
