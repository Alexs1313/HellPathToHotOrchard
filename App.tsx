import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import LoaderHotOrchard from './HellPathHotOrchard/ComponentsHotOrchard/LoaderHotOrchard';
import StackHotOrchard from './HellPathHotOrchard/NavigationHotOrchard/StackHotOrchard';
import { MusicProvider } from './HellPathHotOrchard/StoreHotOrchard/contextHotOrchard';

const App = () => {
  const [isVisibleOrchardStack, setIsVisibleOrchardStack] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleOrchardStack(false);
    }, 6000);
  }, []);

  return (
    <NavigationContainer>
      <MusicProvider>
        {isVisibleOrchardStack ? <LoaderHotOrchard /> : <StackHotOrchard />}
      </MusicProvider>
    </NavigationContainer>
  );
};

export default App;
