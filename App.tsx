import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { MusicProvider } from './HotPathHellOrchard/Hotpathhellorchardstr/hotpathhellorchardcontext';
import Hotpathhellorchardstack from './HotPathHellOrchard/Hotpathhellorchardnvgt/Hotpathhellorchardstack';
import Hotpathhellorchardloader from './HotPathHellOrchard/Hotpathhellorchardcmpnnts/Hotpathhellorchardloader';

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
        {isVisibleOrchardStack ? (
          <Hotpathhellorchardloader />
        ) : (
          <Hotpathhellorchardstack />
        )}
      </MusicProvider>
    </NavigationContainer>
  );
};

export default App;
