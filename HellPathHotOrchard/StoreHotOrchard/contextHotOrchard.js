import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
export const StoreContext = createContext(undefined);
export const useStore = () => useContext(StoreContext);

export const MusicProvider = ({ children }) => {
  const [isOnHellPathMusic, setIsOnHellPathMusic] = useState(false);
  const [soundLevel, updateSoundLevel] = useState(1.0);

  useEffect(() => {
    (async () => {
      try {
        const fetchedVol = await AsyncStorage.getItem('volume');
        if (fetchedVol !== null && !isNaN(parseFloat(fetchedVol))) {
          updateSoundLevel(parseFloat(fetchedVol));
        }
      } catch (err) {
        console.log('Error', err);
      }
    })();
  }, []);

  const adjustVolumeLevel = async newLevel => {
    try {
      const stringifiedLevel = `${newLevel}`;
      await AsyncStorage.setItem('volume', stringifiedLevel);
      updateSoundLevel(newLevel);
    } catch (err) {
      console.log('Error', err);
    }
  };

  const contextValue = {
    isOnHellPathMusic,
    setIsOnHellPathMusic,
    volume: soundLevel,
    setVolume: adjustVolumeLevel,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
