import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import Hotpathhellorchardcontainer from '../Hotpathhellorchardcmpnnts/Hotpathhellorchardcontainer';

const { height } = Dimensions.get('window');

const Hotpathhellorchardabout = () => {
  const navigation = useNavigation();
  const [isVisibleHellPathCode, setIsVisibleHellPathCode] = useState(false);

  const copyHellPathSecretCode = () => {
    Clipboard.setString('0046');
  };

  const shareHellPathAbout = () => {
    const shareOptions = {
      message: `Hell Path to Hot Orchard is a fire-themed puzzle game where you match fruit to reveal the pieces of the “Hot Orchard” painting.

Collect all 5 pieces to create your own fire garden and download it as your wallpaper.

The game works offline, without ads or accounts.`,
    };

    Share.open(shareOptions).catch(err => console.log(err));
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
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.hellpathheadtitle}>ABOUT THE APP</Text>
        </View>
        {isVisibleHellPathCode ? (
          <View>
            <View
              style={styles.hellpathcodecontainer}
              onPress={() => setIsVisibleHellPathCode(true)}
            >
              <Text
                style={styles.hellpathheadabouttext}
              >{`The game works offline, without ads or accounts.`}</Text>

              {Platform.OS === 'ios' ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    Linking.openURL(
                      'https://apps.apple.com/us/app/hot-path-to-hell-orchard/id6755433775',
                    )
                  }
                >
                  <ImageBackground
                    source={require('../../assets/images/hellpathbtn.png')}
                    style={styles.hellpathbutton}
                  >
                    <Text style={styles.hellpathbuttontext}>SHARE APP</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => shareHellPathAbout()}
                >
                  <ImageBackground
                    source={require('../../assets/images/hellpathbtn.png')}
                    style={styles.hellpathbutton}
                  >
                    <Text style={styles.hellpathbuttontext}>SHARE</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            </View>
            <Image
              source={require('../../assets/images/hellpathcode.png')}
              style={styles.hellpathcodeimage}
            />
            <Text style={styles.hellpathheadabouttext}>secret code:</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.hellpathnumcontainer}
              onPress={copyHellPathSecretCode}
            >
              <Text style={styles.hellpathheadnumtext}>FRUITHELL5</Text>
              <Image source={require('../../assets/images/hellpathcopy.png')} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.hellpathaboutcontainer}
            onPress={() => setIsVisibleHellPathCode(true)}
          >
            <Image
              source={require('../../assets/images/hellpathlogo.png')}
              style={{
                marginBottom: 40,
                width: 175,
                height: 175,
                borderRadius: 50,
              }}
            />

            <Text
              style={styles.hellpathheadabouttext}
            >{`Hot Path to Hell Orchard is a fire-themed puzzle game where you match fruit to reveal the pieces of the “Hot Orchard” painting.

Collect all 5 pieces to create your own fire garden and download it as your wallpaper.

The game works offline, without ads or accounts.`}</Text>

            {Platform.OS === 'ios' ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  Linking.openURL(
                    'https://apps.apple.com/us/app/hot-path-to-hell-orchard/id6755433775',
                  )
                }
              >
                <ImageBackground
                  source={require('../../assets/images/hellpathbtn.png')}
                  style={styles.hellpathbutton}
                >
                  <Text style={styles.hellpathbuttontext}>SHARE APP</Text>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => shareHellPathAbout()}
              >
                <ImageBackground
                  source={require('../../assets/images/hellpathbtn.png')}
                  style={styles.hellpathbutton}
                >
                  <Text style={styles.hellpathbuttontext}>SHARE</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
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
    backgroundColor: '#3F0000',
    borderRadius: 22,
    borderWidth: 4,
    borderColor: '#F99B00',
    paddingTop: 40,
  },
  hellpathnumcontainer: {
    width: 229,
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
    fontSize: 16,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    top: 3,
  },
  hellpathcodeimage: {
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 50,
  },
});

export default Hotpathhellorchardabout;
