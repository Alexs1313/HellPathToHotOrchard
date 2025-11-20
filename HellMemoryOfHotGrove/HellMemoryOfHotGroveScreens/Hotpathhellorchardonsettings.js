import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../HellMemoryOfHotGroveStore/hotpathhellorchardcontext';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Hotpathhellorchardcontainer from '../HellMemoryOfHotGroveComponents/Hotpathhellorchardcontainer';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

const Hotpathhellorchardonsettings = () => {
  const navigation = useNavigation();
  const { isOnHellPathMusic, setIsOnHellPathMusic } = useStore();

  const hellPathMusic = async music => {
    try {
      await AsyncStorage.setItem('backgroundMusic', JSON.stringify(music));
      setIsOnHellPathMusic(music);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const clearHellPathProgress = async () => {
    try {
      await AsyncStorage.clear();
      navigation.goBack();
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Hotpathhellorchardcontainer>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.hellpathbackbutton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/images/hellpathback.png')} />
      </TouchableOpacity>
      <View style={styles.hellpathcontainer}>
        <View style={{ marginBottom: 60 }}>
          <Text style={styles.hellpathheadtitle}>SETTINGS</Text>
        </View>

        <View style={{ width: '100%' }}>
          {Platform.OS === 'ios' && (
            <View style={styles.hellpathnumcontainer}>
              <Text style={styles.hellpathheadnumtext}>MUSIC</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => hellPathMusic(!isOnHellPathMusic)}
              >
                <Image
                  source={require('../../assets/images/hellpathswitch.png')}
                  style={{
                    opacity: isOnHellPathMusic ? 1 : 0.3,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}

          <LinearGradient
            colors={['#730C01', '#E2970C']}
            style={{
              borderRadius: 22,
              width: '73%',
              alignSelf: 'center',
              marginTop: 16,
            }}
          >
            <View style={styles.hellpathcodecontainer}>
              <Text
                style={styles.hellpathheadabouttext}
              >{`Clear progress:`}</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={clearHellPathProgress}
              >
                <ImageBackground
                  source={require('../../assets/images/hellpathbtn.png')}
                  style={styles.hellpathbutton}
                >
                  <Text style={styles.hellpathbuttontext}>Clear</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <Image
            source={require('../../assets/images/hellpathcherry.png')}
            style={styles.hellpathcodeimage}
          />
        </View>
      </View>
    </Hotpathhellorchardcontainer>
  );
};

const styles = StyleSheet.create({
  hellpathcontainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: height * 0.09,
    padding: 24,
  },
  hellpathbackbutton: { position: 'absolute', top: height * 0.085, left: 16 },
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
  hellpathheadtitle: {
    fontSize: 26,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '80%',
  },
  hellpathaboutcontainer: {
    width: '100%',
    alignItems: 'center',
    padding: 25,
    paddingHorizontal: 15,
    backgroundColor: '#3F0000',
    borderRadius: 22,
    borderWidth: 4,
    borderColor: '#F99B00',
  },
  hellpathheadabouttext: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 30,
  },
  hellpathcodecontainer: {
    width: '100%',
    alignItems: 'center',
    padding: 25,
    paddingHorizontal: 23,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: '#F99B00',
    paddingTop: 40,
    alignSelf: 'center',
  },
  hellpathnumcontainer: {
    width: '73%',
    alignItems: 'center',
    height: 77,
    backgroundColor: '#3F0000',
    borderRadius: 22,
    borderWidth: 4,
    borderColor: '#F99B00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    alignSelf: 'center',
  },
  hellpathheadnumtext: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    top: 3,
  },
  hellpathcodeimage: {
    alignSelf: 'center',
    marginTop: 50,
    transform: [{ rotate: '15deg' }],
  },
});

export default Hotpathhellorchardonsettings;
