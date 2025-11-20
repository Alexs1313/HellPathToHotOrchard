import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { MusicProvider } from './HellMemoryOfHotGrove/HellMemoryOfHotGroveStore/hotpathhellorchardcontext';
import Hotpathhellorchardstack from './HellMemoryOfHotGrove/HellMemoryOfHotGroveNavigation/Hotpathhellorchardstack';
import Hotpathhellorchardloader from './HellMemoryOfHotGrove/HellMemoryOfHotGroveComponents/Hotpathhellorchardloader';

const App = () => {
  const [isVisibleStack, setIsVisibleStack] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleStack(false);
    }, 6000);
  }, []);

  return (
    <NavigationContainer>
      <MusicProvider>
        {isVisibleStack ? (
          <Hotpathhellorchardloader />
        ) : (
          <Hotpathhellorchardstack />
        )}
      </MusicProvider>
    </NavigationContainer>
  );
};

export default App;
