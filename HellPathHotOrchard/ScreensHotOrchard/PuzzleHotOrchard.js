import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  Modal,
} from 'react-native';
import LayoutHotOrchard from '../ComponentsHotOrchard/LayoutHotOrchard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from '@react-native-community/blur';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import Orientation from 'react-native-orientation-locker';

const { height } = Dimensions.get('window');
const hellPathHotFinalPuzzle = require('../../assets/images/hellpathfull.png');

const PuzzleHotOrchard = () => {
  const navigation = useNavigation();
  const [hellPathHotOpenedList, hellPathHotSetOpenedList] = useState([]);
  const [hellPathHotShowCodeModal, hellPathHotSetShowCodeModal] =
    useState(false);
  const [hellPathHotCode, hellPathHotSetCode] = useState('');
  const [hellPathHotError, hellPathHotSetError] = useState(false);
  const [hellPathHotCorrectCode, hellPathHotSetCorrectCode] = useState(false);
  const imageRef = useRef(null);

  const hellPathHotSecret = '0046';

  useFocusEffect(
    useCallback(() => {
      Platform.OS === 'android' &&
        hellPathHotShowCodeModal &&
        Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, [hellPathHotShowCodeModal]),
  );

  useEffect(() => {
    const load = async () => {
      let arr = await AsyncStorage.getItem('orchardPuzzle');
      arr = arr ? JSON.parse(arr) : [];
      hellPathHotSetOpenedList(arr);

      const unlocked = await AsyncStorage.getItem('orchardPuzzleUnlocked');
      if (unlocked === 'true') {
        hellPathHotSetCorrectCode(true);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      let arr = await AsyncStorage.getItem('orchardPuzzle');
      arr = arr ? JSON.parse(arr) : [];
      hellPathHotSetOpenedList(arr);
    };
    load();
  }, []);

  useEffect(() => {
    if (hellPathHotError) {
      const t = setTimeout(() => hellPathHotSetError(false), 3000);
      return () => clearTimeout(t);
    }
  }, [hellPathHotError]);

  const hellPathHotCheckCode = () => {
    if (hellPathHotCode === hellPathHotSecret) {
      hellPathHotSetCorrectCode(true);
      hellPathHotSetShowCodeModal(false);
      hellPathHotSetError(false);

      AsyncStorage.setItem('orchardPuzzleUnlocked', 'true');
    }
  };

  const shareHellPathWallpaper = async () => {
    try {
      const tmpUri = await captureRef(imageRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });

      let fileUri = tmpUri.startsWith('file://') ? tmpUri : 'file://' + tmpUri;
      const pathToCheck = fileUri.replace('file://', '');
      const exists = await RNFS.exists(pathToCheck);
      if (!exists) return;

      await Share.open({
        url: fileUri,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (error) {
      if (!error?.message?.includes('User did not share')) {
        console.error('shareWallpaper error', error);
      }
    }
  };

  if (hellPathHotCorrectCode)
    return (
      <LayoutHotOrchard>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.hellPathHotBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/hellpathback.png')} />
        </TouchableOpacity>

        <View style={styles.hellPathHotCenterWrap}>
          <Text style={styles.hellPathHotTitle}>PUZZLE</Text>

          <Text style={styles.hellPathHotOpenedText}>
            OPENED ELEMENTS:{' '}
            <Text style={{ color: '#fff', fontSize: 30 }}>
              {hellPathHotOpenedList.length}/5
            </Text>
          </Text>

          <View
            ref={imageRef}
            collapsable={false}
            style={{
              width: '85%',
              height: '65%',
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 30,
              borderWidth: 4,
              borderColor: '#F99B00',
            }}
          >
            <Image
              source={hellPathHotFinalPuzzle}
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <View style={[styles.hellPathHotBottomBtns]}>
            <TouchableOpacity
              onPress={shareHellPathWallpaper}
              activeOpacity={0.7}
            >
              <ImageBackground
                source={require('../../assets/images/hellpathbtn.png')}
                style={styles.hellPathHotResbigBtn}
              >
                <Text style={styles.hellPathHotBigBtnText}>SHARE</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </LayoutHotOrchard>
    );

  const hellPathHotOpenedPercent = hellPathHotOpenedList.length * 20;

  return (
    <LayoutHotOrchard>
      <TouchableOpacity
        style={styles.hellPathHotBackBtn}
        activeOpacity={0.7}
        onPress={() => {
          if (hellPathHotShowCodeModal) {
            hellPathHotSetShowCodeModal(false);
            hellPathHotSetCode('');
            hellPathHotSetError(false);
            return;
          }
          navigation.goBack();
        }}
      >
        <Image source={require('../../assets/images/hellpathback.png')} />
      </TouchableOpacity>

      <View style={styles.hellPathHotCenterWrap}>
        <Text style={styles.hellPathHotTitle}>PUZZLE</Text>

        <Text style={styles.hellPathHotOpenedText}>
          OPENED ELEMENTS:{' '}
          <Text style={{ color: '#fff', fontSize: 30 }}>
            {hellPathHotOpenedList.length}/5
          </Text>
        </Text>

        <View style={styles.hellPathHotPuzzleBox}>
          <View style={styles.hellPathHotProgressContainer}>
            <Image
              source={hellPathHotFinalPuzzle}
              style={styles.hellPathHotFullInside}
            />

            <View
              style={[
                styles.hellPathHotCoverMask,
                { height: `${100 - hellPathHotOpenedPercent}%` },
              ]}
            />
          </View>

          {hellPathHotOpenedList.length === 5 && (
            <TouchableOpacity
              style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}
              activeOpacity={0.7}
              onPress={() => {
                hellPathHotSetShowCodeModal(true);
                hellPathHotSetError(false);
                hellPathHotSetCode('');
              }}
            >
              <ImageBackground
                source={require('../../assets/images/hellpathbtn.png')}
                style={styles.hellPathHotOpenWallpaperBtn}
              >
                <Text style={styles.hellPathHotBigBtnOpenText}>
                  OPEN WALLPAPER
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={hellPathHotShowCodeModal}
        statusBarTranslucent={Platform.OS === 'android'}
      >
        <View style={styles.hellPathHotModalOverlay}>
          {Platform.OS === 'ios' && (
            <BlurView
              style={styles.hellPathHotBlur}
              blurType="dark"
              blurAmount={2}
            />
          )}
          <View style={styles.hellPathHotModalBox}>
            <Text style={styles.hellPathHotModalTitle}>NOT SO FAST!</Text>
            <Text style={styles.hellPathHotModalSubtitle}>
              YOU NEED A PASSWORD TO ACCESS{'\n'}THE WALLPAPER!
            </Text>

            <Image
              source={require('../../assets/images/hellpathlock.png')}
              style={{ width: 90, height: 110, marginBottom: 15 }}
            />
          </View>

          <View
            style={[
              styles.hellPathHotInputWrap,
              hellPathHotError && { borderColor: '#FF0000' },
            ]}
          >
            <Text style={styles.hellPathHotInputLabel}>ENTER CODE:</Text>

            <View
              style={[
                styles.hellPathHotInputBox,
                hellPathHotError ? { backgroundColor: '#FF0000' } : {},
              ]}
            >
              <TextInput
                style={styles.hellPathHotInput}
                secureTextEntry={true}
                value={hellPathHotCode}
                onChangeText={t => {
                  hellPathHotSetCode(t);
                  if (hellPathHotError) hellPathHotSetError(false);
                }}
                maxLength={4}
                keyboardType="numeric"
                placeholder="****"
                placeholderTextColor="#fff"
              />
              <Image
                source={require('../../assets/images/hellpathed.png')}
                style={{ position: 'absolute', right: 15, top: 15 }}
              />
            </View>

            {hellPathHotError && (
              <ImageBackground
                source={require('../../assets/images/hellpathincbord.png')}
                style={styles.hellPathHotErrorBubble}
              >
                <Text style={styles.hellPathHotErrorText}>
                  THE CODE IS INCORRECT.
                </Text>
              </ImageBackground>
            )}
          </View>

          <TouchableOpacity onPress={hellPathHotCheckCode} activeOpacity={0.7}>
            <ImageBackground
              source={require('../../assets/images/hellpathbtn.png')}
              style={styles.hellPathHotOpenBtn}
            >
              <Text style={styles.hellPathHotBigBtnText}>OPEN</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </Modal>
    </LayoutHotOrchard>
  );
};

const styles = StyleSheet.create({
  hellPathHotBackBtn: {
    position: 'absolute',
    top: height * 0.084,
    left: 16,
    zIndex: 999,
  },
  hellPathHotBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hellPathHotCenterWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.09,
    paddingBottom: 50,
  },
  hellPathHotTitle: {
    fontSize: 30,
    fontFamily: 'LuckiestGuy-Regular',
    color: '#fff',
    marginBottom: 44,
  },
  hellPathHotOpenedText: {
    fontSize: 20,
    fontFamily: 'LuckiestGuy-Regular',
    color: '#FFF',
    marginBottom: 35,
  },
  hellPathHotPuzzleBox: {
    width: '85%',
    height: '65%',
    backgroundColor: '#3F0000',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  hellPathHotProgressContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  hellPathHotFullInside: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  hellPathHotCoverMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#3F0000',
  },
  hellPathHotOpenWallpaperBtn: {
    width: 183,
    height: 102,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hellPathHotBigBtnOpenText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotFullImg: {
    width: '85%',
    height: '65%',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#F99B00',
    marginBottom: 30,
  },
  hellPathHotBottomBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 23,
  },
  hellPathHotResbigBtn: {
    width: 140,
    height: 78,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hellPathHotBigBtnText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  hellPathHotModalBox: {
    width: '85%',
    backgroundColor: '#3F0000',
    borderWidth: 4,
    borderColor: '#F99B00',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
  },
  hellPathHotModalTitle: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    marginBottom: 20,
  },
  hellPathHotModalSubtitle: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    textAlign: 'center',
    marginBottom: 25,
  },
  hellPathHotInputWrap: {
    width: '85%',
    backgroundColor: '#3F0000',
    borderWidth: 4,
    borderColor: '#F99B00',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  hellPathHotInputLabel: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotInputBox: {
    backgroundColor: '#F99B00',
    borderRadius: 12,
    width: '50%',
    padding: 15,
    justifyContent: 'center',
  },
  hellPathHotInput: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotErrorBubble: {
    position: 'absolute',
    width: 281,
    height: 148,
    top: -140,
    right: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hellPathHotErrorText: {
    fontSize: 24,
    color: '#3F0000',
    bottom: 18,
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotOpenBtn: {
    width: 140,
    height: 78,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default PuzzleHotOrchard;
