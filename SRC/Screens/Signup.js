import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Fontisto from 'react-native-vector-icons/Fontisto';
import navigationService from '../navigationService';
import CardContainer from '../Components/CardContainer';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch} from 'react-redux';
import {setUserData} from '../Store/slices/common';
import {SetUserRole, setUserToken} from '../Store/slices/auth';
import {ToastAndroid} from 'react-native';
import {Platform} from 'react-native';
import { validateEmail } from '../Config';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [userRole, setuserRole] = useState('seller');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const UserRoleArray = ['seller', 'buyer'];
  
  const dispatch = useDispatch();

  const registerUser = async () => {
    const body = {
      name: username,
      email: email,
      phone: phone,
      address: address,
      password: password,
      c_password: confirmPass,
      role : userRole == 'seller' ? 'vendor' : 'customer'
    };
    // for(let key in body){
      
    //   if(body[key] == ''){
    //     return Platform.OS == 'android'
    //         ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
    //         : alert(`${key} is required`);
    //   }
    // }
   if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Email is invalid', ToastAndroid.SHORT)
        : Alert.alert('Email is invalid');
    }
    else if(password != confirmPass){
      return Platform.OS == 'android'
      ? ToastAndroid.show('passwords donot match', ToastAndroid.SHORT)
      : alert('passwords donot match');
    }
    const url = 'register';

    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    if (response != undefined) {
      console.log('response data==========>>>>>>>>', response?.data);
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(SetUserRole(response?.data?.user_info?.role))
    }
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
        // paddingBottom : moderateScale(40,0.6)  
        }}
      
        >
        <LinearGradient
          style={{
            width: windowWidth,
            minHeight : windowHeight,
          paddingBottom : moderateScale(40,0.6),

            // height: windowHeight,
          alignItems: 'center',

            
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
           colors={[Color.themeColor2,Color.themeColor2]}
        >
        <View
          style={{
            marginTop : 40,
            height: windowHeight * 0.1,
            width: windowWidth * 0.8, }}>
          <CustomImage
            resizeMode="contain"
            source={require('../Assets/Images/logo.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <CardContainer
          style={{
            paddingVertical: moderateScale(30, 0.3),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: moderateScale(30, 0.3),
          }}>
             <DropDownSingleSelect
            array={UserRoleArray}
            item={userRole}
            setItem={setuserRole}
            placeholder={userRole}
            width={windowWidth * 0.75}
            dropDownHeight={windowHeight * 0.06}
            dropdownStyle={{
              width: windowWidth * 0.75,
              borderBottomWidth: 0,
              // backgroundColor : 'red'
            }}
            borderColor={Color.lightGrey}
            elevation
            // backgroundColor={'white'}
          />
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
               inputWidth={0.55}
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
               inputWidth={0.55}
            border={1}
            borderColor={Color.black}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
          {/* { userRole == 'vendor' &&
        <> */}
            <TextInputWithTitle
            iconName={'cellphone-sound'}
            iconType={MaterialCommunityIcons}
            LeftIcon={true}
            titleText={'Contact'}
            placeholder={'Contact'}
            setText={setPhone}
            value={phone}
            viewHeight={0.07}
            viewWidth={0.75}
               inputWidth={0.55}
            border={1}
            borderColor={Color.black}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
            <TextInputWithTitle
            iconName={'address'}
            iconType={Entypo}
            LeftIcon={true}
            titleText={'address'}
            placeholder={'address'}
            setText={setAddress}
            value={address}
            viewHeight={0.07}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderColor={Color.black}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
            />
            {/* </> */}
          {/* } */}

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
               inputWidth={0.55}
            border={1}
            borderColor={'#000'}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
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
            inputWidth={0.55}
            border={1}
            borderColor={'#000'}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
         

          <CustomButton
            onPress={() => registerUser()}
            text={
              isLoading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
              ) : (
                'SIGN UP'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(30, 0.3)}
            bgColor={Color.yellow}
            // borderRadius={moderateScale(5, 0.3)}
            // isGradient
          />
        </CardContainer>
        <CustomText style={styles.txt5}>Already have an account ?</CustomText>
        <CustomText
          onPress={() => navigationService.navigate('LoginScreen')}
          isBold
          style={styles.txt6}>
          Login
        </CustomText>
      </LinearGradient>
        </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  txt5: {
    // marginTop: moderateScale(25, 0.3),
    fontSize: moderateScale(11, 0.6),
  },
  txt6: {
    fontSize: moderateScale(15, 0.6),
  },
});

export default Signup;
