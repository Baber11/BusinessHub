import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import navigationService from '../navigationService';
import CardContainer from '../Components/CardContainer';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPass, setconfirmPass] = useState('')
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}
        // locations ={[0, 0.5, 0.6]}
      >
        <View
          style={{
            height: windowHeight * 0.15,
            width: windowWidth * 0.8,
            // marginTop:moderateScale(30,.3),
            // marginBottom:moderateScale(20,.3),
            // paddingVertical: moderateScale(20, 0.6),
            // backgroundColor:'black'
          }}>
          <CustomImage
            resizeMode="contain"
            source={require('../Assets/Images/logo.png')}
            style={{
              width: '100%',
              height: '100%',
              // marginTop: moderateScale(25, 0.3),
            }}
          />
        </View>
        <CardContainer
          style={{
            paddingVertical: moderateScale(30, 0.3),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: moderateScale(50, 0.3),
          }}>
          <TextInputWithTitle
            iconName={'user'}
            iconType={SimpleLineIcons}
            LeftIcon={true}
            titleText={'Username'}
            placeholder={'Username'}
            setText={setUserName}
            value={username}
            viewHeight={0.07}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            backgroundColor={Color.white}
            borderColor={Color.black}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />

          <TextInputWithTitle
            iconName={'email'}
            iconType={Fontisto}
            LeftIcon={true}
            titleText={'Email'}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.07}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={Color.black}
            backgroundColor={Color.white}
            marginTop={moderateScale(25, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />

          <TextInputWithTitle
            iconName={'key-outline'}
            iconType={Ionicons}
            LeftIcon={true}
            titleText={'Password'}
            placeholder={'Password'}
            setText={setPassword}
            value={password}
            secureText={true}
            viewHeight={0.07}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={'#000'}
            backgroundColor={Color.white}
            marginTop={moderateScale(25, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />

          <TextInputWithTitle
             
            iconName={'check-outline'}
            iconType={MaterialCommunityIcons}
            LeftIcon={true}
            titleText={'confirm password'}
            placeholder={'Re-type password'}
            setText={setconfirmPass}
            value={confirmPass}
            secureText={true}
            viewHeight={0.07}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={'#000'}
            backgroundColor={Color.white}
            marginTop={moderateScale(25, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />

          <CustomButton
            onPress={() => navigationService.navigate('LoginScreen')}
            text={'SIGN UP'}
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(30, 0.3)}
            bgColor={Color.yellow}
            // borderRadius={moderateScale(5, 0.3)}
            // isGradient
          />
        </CardContainer>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  txt5: {
    marginTop: moderateScale(25, 0.3),
    fontSize: moderateScale(11, 0.6),
  },
  txt6: {
    fontSize: moderateScale(15, 0.6),
  },
});

export default Signup;
