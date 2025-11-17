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
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const OnboardHotOrchard = () => {
  const [hellPathCurrentStep, setHellPathCurrentStep] = useState(0);
  const navigation = useNavigation();

  return (
    <LayoutHotOrchard>
      <View style={styles.hellpathcontainer}>
        <Text style={styles.hellpathtitle}>
          {hellPathCurrentStep === 0 && 'Find a pair of fruits'}
          {hellPathCurrentStep === 1 &&
            `Collect garden 
fragments`}
          {hellPathCurrentStep === 2 && 'Complete the puzzle'}
          {hellPathCurrentStep === 3 && 'Reveal the secret'}
        </Text>
        <Text style={styles.hellpathsubtitle}>
          {hellPathCurrentStep === 0 &&
            'Connect identical symbols to complete the level and reveal part of the puzzle.'}
          {hellPathCurrentStep === 1 &&
            'Each level reveals part of the fiery painting “Hot Orchard”.'}
          {hellPathCurrentStep === 2 &&
            'Collect all 5 elements and create a complete painting of the garden.'}
          {hellPathCurrentStep === 3 &&
            'The code to unlock the wallpaper is hidden in the “Ab*ut th* *pp” section.'}
        </Text>

        {hellPathCurrentStep === 0 && (
          <>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/hellpathimg1.png')}
                style={{ right: 50 }}
              />
              <Image
                source={require('../../assets/images/hellpathimg2.png')}
                style={{ position: 'absolute', top: 100, left: 30 }}
              />
            </View>
            <Image
              source={require('../../assets/images/hellpathimg3.png')}
              style={{ left: 60 }}
            />
          </>
        )}
        {hellPathCurrentStep === 1 && (
          <Image source={require('../../assets/images/hellpathimg4.png')} />
        )}
        {hellPathCurrentStep === 2 && (
          <Image
            source={require('../../assets/images/hellpathimg6.png')}
            style={{ marginTop: height * 0.06 }}
          />
        )}
        {hellPathCurrentStep === 3 && (
          <Image
            source={require('../../assets/images/hellpathimg5.png')}
            style={{ marginTop: height * 0.03, marginBottom: height * 0.03 }}
          />
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{ marginTop: height * 0.07 }}
          onPress={() =>
            hellPathCurrentStep === 3
              ? navigation.navigate('HomeHotOrchard')
              : setHellPathCurrentStep(hellPathCurrentStep + 1)
          }
        >
          <ImageBackground
            source={require('../../assets/images/hellpathbtn.png')}
            style={styles.hellpathbutton}
          >
            <Text style={styles.hellpathbuttontext}>
              {hellPathCurrentStep === 0 && 'NEXT'}
              {hellPathCurrentStep === 1 && 'Good'}
              {hellPathCurrentStep === 2 && 'Okay'}
              {hellPathCurrentStep === 3 && 'Start'}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </LayoutHotOrchard>
  );
};

const styles = StyleSheet.create({
  hellpathcontainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: height * 0.06,
    padding: 24,
  },
  hellpathtitle: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 23,
    fontFamily: 'LuckiestGuy-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  hellpathsubtitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    marginBottom: 40,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  hellpathbutton: {
    width: 224,
    height: 124,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hellpathbuttontext: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    textTransform: 'uppercase',
  },
});

export default OnboardHotOrchard;
