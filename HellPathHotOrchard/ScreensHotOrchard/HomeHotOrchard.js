import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LayoutHotOrchard from '../ComponentsHotOrchard/LayoutHotOrchard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../StoreHotOrchard/contextHotOrchard';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const HomeHotOrchard = () => {
  const navigation = useNavigation();
  const [bgMusicTrackIndex, setBgMusicTrackIndex] = useState(0);
  useState(0);
  const [sound, setSound] = useState(null);
  const bgMusicTracks = ['ringtone-13759.mp3', 'ringtone-13759.mp3'];
  const { isOnHellPathMusic, setIsOnHellPathMusic, volume } = useStore();

  useEffect(() => {
    playbgMusicTrack(bgMusicTrackIndex);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [bgMusicTrackIndex]);

  const playbgMusicTrack = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const trackPath = bgMusicTracks[index];

    const newSound = new Sound(trackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('error', error);
        return;
      }

      newSound.play(success => {
        if (success) {
          setBgMusicTrackIndex(
            prevIndex => (prevIndex + 1) % bgMusicTracks.length,
          );
        } else {
          console.log('error');
        }
      });
      setSound(newSound);
    });
  };

  useEffect(() => {
    const setCharmBgMusic = async () => {
      try {
        const musicValue = await AsyncStorage.getItem('backgroundMusic');
        const isBgMusicOn = JSON.parse(musicValue);
        setIsOnHellPathMusic(isBgMusicOn);
        if (sound) {
          sound.setVolume(isBgMusicOn ? volume : 0);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };
    setCharmBgMusic();
  }, [sound, volume]);

  useEffect(() => {
    if (sound) sound.setVolume(isOnHellPathMusic ? volume : 0);
  }, [volume, isOnHellPathMusic]);

  const loadThreeChanceyBgMusic = async () => {
    try {
      const musicValue = await AsyncStorage.getItem('backgroundMusic');
      const isBgMusicOn = JSON.parse(musicValue);
      setIsOnHellPathMusic(isBgMusicOn);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadConquerSettings();
      loadThreeChanceyBgMusic();
    }, []),
  );

  const loadConquerSettings = async () => {
    try {
      const musicValue = await AsyncStorage.getItem('backgroundMusic');
      setIsOnHellPathMusic(JSON.parse(musicValue));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LayoutHotOrchard>
      <View style={styles.hellpathcontainer}>
        <Image
          source={require('../../assets/images/hellpathlogo.png')}
          style={{ marginBottom: 40 }}
        />

        <View style={{ gap: 8 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('GameHotOrchard')}
          >
            <ImageBackground
              source={require('../../assets/images/hellpathbtn.png')}
              style={styles.hellpathbutton}
            >
              <Text style={styles.hellpathbuttontext}>PLAY</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PuzzleHotOrchard')}
          >
            <ImageBackground
              source={require('../../assets/images/hellpathbtn.png')}
              style={styles.hellpathbutton}
            >
              <Text style={styles.hellpathbuttontext}>PUZZLE</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SettingsHotOrchard')}
          >
            <ImageBackground
              source={require('../../assets/images/hellpathbtn.png')}
              style={styles.hellpathbutton}
            >
              <Text style={styles.hellpathbuttontext}>SETTINGS</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AboutHotOrchard')}
          >
            <ImageBackground
              source={require('../../assets/images/hellpathbtn.png')}
              style={styles.hellpathbutton}
            >
              <Text style={styles.hellpathbuttontext}>ABOUT</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutHotOrchard>
  );
};

const styles = StyleSheet.create({
  hellpathcontainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: height * 0.075,
    padding: 24,
  },
  hellpathbutton: {
    width: 183,
    height: 102,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hellpathbuttontext: {
    fontSize: 26,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    textTransform: 'uppercase',
  },
});

export default HomeHotOrchard;
