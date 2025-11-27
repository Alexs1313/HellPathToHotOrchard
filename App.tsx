import Hotpathhellorchardstack from './HotGroveScr/HotGroveNavigation/Hotpathhellorchardstack';
import Hotpathhellorchardloader from './HotGroveScr/HotGroveComponents/Hotpathhellorchardloader';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { MusicProvider } from './HotGroveScr/HotGroveStore/hotpathhellorchardcontext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return (
    <NavigationContainer>
      <MusicProvider>
        {isLoading ? <Hotpathhellorchardloader /> : <Hotpathhellorchardstack />}
      </MusicProvider>
    </NavigationContainer>
  );
};

export default App;
