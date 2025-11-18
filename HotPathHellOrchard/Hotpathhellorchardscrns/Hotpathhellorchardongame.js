import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Orientation from 'react-native-orientation-locker';
import Share from 'react-native-share';
import Hotpathhellorchardcontainer from '../Hotpathhellorchardcmpnnts/Hotpathhellorchardcontainer';

const { height } = Dimensions.get('window');

const hellPathHotFruits = [
  require('../../assets/images/hellpathgame1.png'),
  require('../../assets/images/hellpathgame2.png'),
  require('../../assets/images/hellpathgame3.png'),
  require('../../assets/images/hellpathgame4.png'),
];

const hellPathHotFireCircle = require('../../assets/images/hellpathfire.png');

const hellPathHotPuzzlePieces = [
  require('../../assets/images/hellpathpe1.png'),
  require('../../assets/images/hellpathpe2.png'),
  require('../../assets/images/hellpathpe3.png'),
  require('../../assets/images/hellpathpe4.png'),
  require('../../assets/images/hellpathpe5.png'),
];

const Hotpathhellorchardongame = () => {
  const navigation = useNavigation();
  const [hellPathHotScreen, setHellPathHotScreen] = useState('intro');
  const [hellPathHotLevel, setHellPathHotLevel] = useState(1);
  const [hellPathHotTiles, setHellPathHotTiles] = useState([]);
  const [hellPathHotOpened, setHellPathHotOpened] = useState([]);
  const [hellPathHotMatched, setHellPathHotMatched] = useState([]);
  const [hellPathHotLock, setHellPathHotLock] = useState(false);
  const [hellPathHotShowResultModal, setHellPathHotShowResultModal] =
    useState(false);
  const shareRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      Platform.OS === 'android' &&
        hellPathHotShowResultModal &&
        Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, [hellPathHotShowResultModal]),
  );

  const hellPathHotInitLevel = () => {
    const hellPathHotSameFruit =
      hellPathHotFruits[(hellPathHotLevel - 1) % hellPathHotFruits.length];

    let hellPathHotOtherFruits = hellPathHotFruits.filter(
      f => f !== hellPathHotSameFruit,
    );

    const hellPathHotRandomOthers = hellPathHotOtherFruits
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const hellPathHotArr = [
      { img: hellPathHotSameFruit },
      { img: hellPathHotSameFruit },
      { img: hellPathHotRandomOthers[0] },
      { img: hellPathHotRandomOthers[1] },
    ];

    const hellPathHotShuffled = hellPathHotArr.sort(() => Math.random() - 0.5);

    setHellPathHotTiles(hellPathHotShuffled);
    setHellPathHotOpened([]);
    setHellPathHotMatched([]);
    setHellPathHotLock(false);
  };

  useEffect(() => {
    if (hellPathHotScreen === 'game') hellPathHotInitLevel();
  }, [hellPathHotScreen, hellPathHotLevel]);

  const hellPathHotPressTile = index => {
    if (hellPathHotLock) return;
    if (hellPathHotOpened.includes(index) || hellPathHotMatched.includes(index))
      return;

    const hellPathHotOpenNow = [...hellPathHotOpened, index];
    setHellPathHotOpened(hellPathHotOpenNow);

    if (hellPathHotOpenNow.length === 2) {
      setHellPathHotLock(true);

      setTimeout(() => {
        const [i1, i2] = hellPathHotOpenNow;
        const f1 = hellPathHotTiles[i1].img;
        const f2 = hellPathHotTiles[i2].img;

        if (f1 === f2) {
          setHellPathHotMatched([i1, i2]);
          setHellPathHotOpened([]);

          setTimeout(() => {
            hellPathHotSavePiece();
            setHellPathHotShowResultModal(true);
          }, 800);
        } else {
          setHellPathHotOpened([]);

          const hellPathHotShuffled = [...hellPathHotTiles].sort(
            () => Math.random() - 0.5,
          );
          setHellPathHotTiles(hellPathHotShuffled);

          setTimeout(() => {
            setHellPathHotLock(false);
          }, 200);
        }
      }, 900);
    }
  };

  const hellPathHotSavePiece = async () => {
    try {
      let arr = await AsyncStorage.getItem('orchardPuzzle');
      arr = arr ? JSON.parse(arr) : [];

      if (!arr.includes(hellPathHotLevel)) {
        arr.push(hellPathHotLevel);
        await AsyncStorage.setItem('orchardPuzzle', JSON.stringify(arr));
      }
    } catch {}
  };

  const hellPathHotShare = async () => {
    try {
      const uri = await captureRef(shareRef, {
        format: 'png',
        quality: 1,
      });

      const path = `${
        RNFS.CachesDirectoryPath
      }/orchard_share_${Date.now()}.png`;

      await RNFS.copyFile(uri, path);

      await Share.open({
        title: 'GREAT! Level completed',
        message: 'All pairs found! You earned a puzzle piece!',
        url: 'file://' + path,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (err) {
      console.log('SHARE ERROR:', err);
    }
  };

  if (hellPathHotScreen === 'intro')
    return (
      <Hotpathhellorchardcontainer>
        <TouchableOpacity
          style={hellPathHotStyles.hellPathHotBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/hellpathback.png')} />
        </TouchableOpacity>

        <View style={hellPathHotStyles.hellPathHotCenterWrap}>
          <Text style={hellPathHotStyles.hellPathHotTitle}>GAME RULES</Text>

          <View style={hellPathHotStyles.hellPathHotIntroBox}>
            <Text style={hellPathHotStyles.hellPathHotRules}>
              {`Find the same pairs of fruits on the field.

Each level reveals a part of the “Hot Orchard” puzzle.

Collect all 5 fragments to get the final picture of the garden.

Find the code to unlock the wallpaper in the “About the app” section.`}
            </Text>

            <View style={hellPathHotStyles.hellPathHotIntroImageWrap}>
              <Image
                source={require('../../assets/images/hellpathgrape.png')}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHellPathHotScreen('game')}
            >
              <ImageBackground
                source={require('../../assets/images/hellpathbtn.png')}
                style={hellPathHotStyles.hellPathHotStartBtn}
              >
                <Text style={hellPathHotStyles.hellPathHotStartText}>
                  START
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </Hotpathhellorchardcontainer>
    );

  if (hellPathHotScreen === 'game')
    return (
      <Hotpathhellorchardcontainer>
        <View style={hellPathHotStyles.hellPathHotCenterWrap}>
          <Text style={hellPathHotStyles.hellPathHotTitle}>
            LEVEL {hellPathHotLevel} / 5
          </Text>

          <View style={hellPathHotStyles.hellPathHotFindPairCont}>
            <Text style={hellPathHotStyles.hellPathHotSubtitle}>
              FIND A PAIR
            </Text>
          </View>

          <View style={hellPathHotStyles.hellPathHotGrid}>
            {hellPathHotTiles.map((t, idx) => {
              const open = hellPathHotOpened.includes(idx);
              const done = hellPathHotMatched.includes(idx);

              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => hellPathHotPressTile(idx)}
                  style={hellPathHotStyles.hellPathHotTile}
                >
                  {done ? (
                    <View style={hellPathHotStyles.hellPathHotDoneWrap}>
                      <Image
                        source={hellPathHotFireCircle}
                        style={hellPathHotStyles.hellPathHotFireCircle}
                      />
                      <Image
                        source={t.img}
                        style={hellPathHotStyles.hellPathHotFruitOnFire}
                      />
                    </View>
                  ) : open ? (
                    <Image
                      source={t.img}
                      style={hellPathHotStyles.hellPathHotFruit}
                    />
                  ) : (
                    <View style={hellPathHotStyles.hellPathHotCover} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={hellPathHotStyles.hellPathHotGameBtns}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <ImageBackground
                source={require('../../assets/images/hellpathbtn.png')}
                style={hellPathHotStyles.hellPathHotSmallBtn}
              >
                <Text style={hellPathHotStyles.hellPathHotSmallBtnTxt}>
                  HOME
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={hellPathHotInitLevel}
              activeOpacity={0.7}
            >
              <ImageBackground
                source={require('../../assets/images/hellpathbtn.png')}
                style={hellPathHotStyles.hellPathHotSmallBtn}
              >
                <Text style={hellPathHotStyles.hellPathHotSmallBtnTxt}>
                  RESTART
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          transparent={true}
          animationType="fade"
          visible={hellPathHotShowResultModal}
          statusBarTranslucent={Platform.OS === 'android'}
        >
          <View style={hellPathHotStyles.hellPathHotModalOverlay}>
            {Platform.OS === 'ios' && (
              <BlurView
                style={hellPathHotStyles.hellPathHotBlur}
                blurType="dark"
                blurAmount={2}
              />
            )}

            <View style={hellPathHotStyles.hellPathHotModalBox}>
              <Text style={hellPathHotStyles.hellPathHotBig}>GREAT!</Text>
              <Text style={hellPathHotStyles.hellPathHotBigSub}>
                LEVEL COMPLETED
              </Text>

              <Text style={hellPathHotStyles.hellPathHotModalSub}>
                All pairs found! You have received a puzzle piece!
              </Text>

              <View
                ref={shareRef}
                collapsable={false}
                style={{
                  width: '85%',
                  height: 115,
                  borderRadius: 22,
                  overflow: 'hidden',
                  marginBottom: 60,
                  borderWidth: 1,
                  borderColor: '#F99B00',
                }}
              >
                <Image
                  source={hellPathHotPuzzlePieces[hellPathHotLevel - 1]}
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
              </View>

              <TouchableOpacity onPress={hellPathHotShare}>
                <ImageBackground
                  source={require('../../assets/images/hellpathbtn.png')}
                  style={hellPathHotStyles.hellPathHotShareBtn}
                >
                  <Text style={hellPathHotStyles.hellPathHotModalText}>
                    SHARE
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={hellPathHotStyles.hellPathHotNextWrap}
              onPress={() => {
                setHellPathHotShowResultModal(false);
                if (hellPathHotLevel < 5)
                  setHellPathHotLevel(hellPathHotLevel + 1);
                else setHellPathHotLevel(1);
                hellPathHotInitLevel();
              }}
            >
              <ImageBackground
                source={require('../../assets/images/hellpathbtn.png')}
                style={hellPathHotStyles.hellPathHotShareBtn}
              >
                <Text style={hellPathHotStyles.hellPathHotModalText}>
                  Next level
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ImageBackground
                source={require('../../assets/images/hellpathbtn.png')}
                style={hellPathHotStyles.hellPathHotShareBtn}
              >
                <Text style={hellPathHotStyles.hellPathHotModalText}>HOME</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </Modal>
      </Hotpathhellorchardcontainer>
    );
};

const hellPathHotTileSize = 110;

const hellPathHotStyles = StyleSheet.create({
  hellPathHotBackBtn: { position: 'absolute', top: height * 0.085, left: 16 },
  hellPathHotCenterWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.09,
    paddingBottom: 50,
  },
  hellPathHotTitle: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    marginBottom: 30,
  },
  hellPathHotBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hellPathHotSubtitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotIntroBox: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  hellPathHotRules: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotIntroImageWrap: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  },
  hellPathHotStartBtn: {
    width: 183,
    height: 102,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hellPathHotStartText: {
    fontSize: 26,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotGrid: {
    width: '75%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
  },
  hellPathHotTile: {
    width: hellPathHotTileSize,
    height: hellPathHotTileSize,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hellPathHotCover: {
    width: hellPathHotTileSize,
    height: hellPathHotTileSize,
    borderRadius: 22,
    backgroundColor: '#3F0000',
    borderWidth: 4,
    borderColor: '#F99B00',
  },
  hellPathHotFruit: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  hellPathHotDoneWrap: { alignItems: 'center' },
  hellPathHotFireCircle: {
    width: 111,
    height: 125,
    resizeMode: 'contain',
    position: 'absolute',
    top: -20,
  },
  hellPathHotFruitOnFire: {
    width: 50,
    height: 50,
    marginTop: 30,
    resizeMode: 'contain',
  },
  hellPathHotFindPairCont: {
    width: 211,
    backgroundColor: '#3F0000',
    borderWidth: 4,
    borderColor: '#F99B00',
    height: 77,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  hellPathHotGameBtns: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    marginTop: height * 0.12,
  },
  hellPathHotSmallBtn: {
    width: 124,
    height: 69,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hellPathHotSmallBtnTxt: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  hellPathHotModalBox: {
    width: '87%',
    backgroundColor: '#3F0000',
    borderWidth: 4,
    borderColor: '#F99B00',
    padding: 25,
    borderRadius: 22,
    alignItems: 'center',
    paddingTop: 40,
  },
  hellPathHotBig: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotBigSub: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    marginBottom: 10,
  },
  hellPathHotModalSub: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    marginTop: 15,
    marginBottom: 25,
    textAlign: 'center',
  },
  hellPathHotPiece: {
    width: '85%',
    height: 115,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F99B00',
    marginBottom: 60,
  },
  hellPathHotShareBtn: {
    width: 124,
    height: 69,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hellPathHotModalText: {
    fontSize: 17,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'LuckiestGuy-Regular',
  },
  hellPathHotNextWrap: {
    marginTop: 36,
    marginBottom: 15,
  },
});

export default Hotpathhellorchardongame;
