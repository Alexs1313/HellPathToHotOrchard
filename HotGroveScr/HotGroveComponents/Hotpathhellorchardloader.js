import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Image, StyleSheet } from 'react-native';
import LayoutHotOrchard from './Hotpathhellorchardcontainer';

const Hotpathhellorchardloader = () => {
  const hellPathHtmlLoader = `
<!DOCTYPE html>
<html>
  <head>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .flame {
        position: relative;
        width: 80px;    
        height: 160px;  
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }

      .flame__layer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 104, 57, 1) 0%, rgba(255, 104, 57, 0.6) 40%, rgba(255, 104, 57, 0) 70%);
        border-radius: 50% 50% 20% 20%;
        transform-origin: center bottom;
        animation: flicker 1.2s infinite ease-in-out;
        opacity: 0.9;
        filter: blur(3px);
      }

      .flame--mid {
        background: radial-gradient(circle, rgba(255, 150, 50, 1) 0%, rgba(255, 150, 50, 0.6) 40%, rgba(255, 150, 50, 0) 70%);
        width: 70%;
        height: 70%;
        animation: flicker 1.1s infinite ease-in-out;
        animation-delay: 0.2s;
        opacity: 0.8;
      }

      .flame--small {
        background: radial-gradient(circle, rgba(255, 200, 50, 1) 0%, rgba(255, 200, 50, 0.6) 40%, rgba(255, 200, 50, 0) 70%);
        width: 50%;
        height: 50%;
        animation: flicker 1.3s infinite ease-in-out;
        animation-delay: 0.4s;
        opacity: 0.7;
      }

      @keyframes flicker {
        0%, 100% { transform: scale(1) translateY(0); }
        50% { transform: scale(1.2) translateY(-10%); }
      }
    </style>
  </head>
  <body>
    <div class="flame">
      <div class="flame__layer flame--main"></div>
      <div class="flame__layer flame--mid"></div>
      <div class="flame__layer flame--small"></div>
    </div>
  </body>
</html>
  `;

  return (
    <LayoutHotOrchard>
      <View style={styles.loaderwrap}>
        <WebView
          originWhitelist={['*']}
          source={{ html: hellPathHtmlLoader }}
          style={{ width: 220, height: 200, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </LayoutHotOrchard>
  );
};

const styles = StyleSheet.create({
  loaderwrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Hotpathhellorchardloader;
