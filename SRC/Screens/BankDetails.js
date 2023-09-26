import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';
  import React from 'react';
  import Header from '../Components/Header';
  import CustomText from '../Components/CustomText';
  import {windowHeight, windowWidth} from '../Utillity/utils';
  import CustomStatusBar from '../Components/CustomStatusBar';
  import {moderateScale} from 'react-native-size-matters';
  import Color from '../Assets/Utilities/Color';
  import CustomImage from '../Components/CustomImage';
  import navigationService from '../navigationService';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';

const BankDetails = () => {
  return (
    <ScreenBoiler
    statusBarBackgroundColor={'white'}
    statusBarContentStyle={'dark-content'}>
    <LinearGradient
      style={{
        width: windowWidth,
        height: windowHeight,
        alignItems:'center'
      }}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[Color.themeColor2, Color.themeColor2]}>
      <Header title={'Bank Details'} showBack headerColor={['#fff', '#fff']} />



    </LinearGradient>
    </ScreenBoiler>
  )
}

export default BankDetails

const styles = StyleSheet.create({})