import { ImageBackground, ScrollView } from 'react-native';

const LayoutHotOrchard = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/hellpathbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default LayoutHotOrchard;
