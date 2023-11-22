import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, ScrollView, View, TouchableOpacity, Alert} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
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
import {validateEmail} from '../Config';
import { Icon } from 'native-base';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [countryCode, setCountryCode] = useState('PK');
  console.log("🚀 ~ file: Signup.js:39 ~ Signup ~ countryCode:", countryCode)
  const [country, setCountry] = useState({
    callingCode: ['92'],
    cca2: 'PK',
    currency: ['PKR'],
    flag: 'flag-pk',
    name: 'Pakistan',
    region: 'Asia',
    subregion: 'Southern Asia',
  });
  console.log("🚀 ~ file: Signup.js:48 ~ Signup ~ country:", country)
  const [userRole, setuserRole] = useState('seller');
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withFilter, setFilter] = useState(true);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const UserRoleArray = ['seller', 'buyer'];

  const dispatch = useDispatch();
  const onSelect = country => {
    // console.log('dasdasdasdads =>', country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const registerUser = async () => {
    const body = {
      name: username,
      email: email,
      phone: phone,
      // countryCode: country,
      address: 'askdhaksd',
      password: password,
      c_password: confirmPass,
      role: userRole == 'seller' ? 'vendor' : 'customer',
    };
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Email is invalid', ToastAndroid.SHORT)
        : Alert.alert('Email is invalid');
    } else if (phone.length != 10) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Please Enter 10 digit phone number',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Please Enter 10 digit phone number');
    } else if (password != confirmPass) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('passwords donot match', ToastAndroid.SHORT)
        : alert('passwords donot match');
    }
    const url = 'register';

    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    // console.log("🚀 ~ file: Signup.js:93 ~ registerUser ~ response:", response)
    setIsLoading(false);

    if (response != undefined) {
      console.log("🚀 ~ file: Signup.js:93 ~ registerUser ~ response:", response?.data)
      Alert.alert(`${response?.data?.user_info?.email_code}`)
      navigationService.navigate('VerifyNumber',{token:response?.data?.token, userData:response?.data?.user_info})
      // console.log('response data==========>>>>>>>>', response?.data);
      // dispatch(setUserData(response?.data?.user_info));
      // dispatch(setUserToken({token: response?.data?.token}));
      // dispatch(SetUserRole(response?.data?.user_info?.role));
    }
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            // paddingBottom : moderateScale(40,0.6)
          }
        }>
        <LinearGradient
          style={{
            width: windowWidth,
            minHeight: windowHeight,
            paddingBottom: moderateScale(40, 0.6),

            // height: windowHeight,
            alignItems: 'center',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[Color.white, Color.white]}>
          <View
            style={{
              marginTop: 40,
              height: windowHeight * 0.1,
              width: windowWidth * 0.8,
            }}>
            <CustomImage
              resizeMode="contain"
              source={require('../Assets/Images/logo.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          {/* <CardContainer
            style={{
              paddingVertical: moderateScale(30, 0.3),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: moderateScale(30, 0.3),
            }}> */}
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
              }}
              borderColor={Color.lightGrey}
              elevation
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
              <TouchableOpacity
              onPress={()=>{
                setShowNumberModal(true)
              }}
                activeOpacity={0.9}
                style={[styles.birthday, {justifyContent: 'flex-start',}]}>
                <CountryPicker
                  {...{
                    countryCode,
                    withCallingCode,
                    onSelect,
                    withFilter,
                  }}
                  visible={showNumberModal}
                  
                />

                {country && (
                  <CustomText
                    style={{
                      fontSize: moderateScale(15, 0.6),
                      color: '#5E5E5E',
                    }}>{`${countryCode}(+${country?.callingCode})`}</CustomText>
                )}

                <Icon
                  name={'angle-down'}
                  as={FontAwesome}
                  size={moderateScale(20, 0.6)}
                  color={Color.themeDarkGray}
                  onPress={()=>{
                    setShowNumberModal(true)
                  }}
                  style={{
                    position: 'absolute',
                    right: moderateScale(5, 0.3),
                  }}
                />
              </TouchableOpacity>
             
        
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
              bgColor={Color.themeBlue}
              // borderRadius={moderateScale(5, 0.3)}
              // isGradient
            />
          {/* </CardContainer> */}
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
  birthday: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.07,
    marginTop:moderateScale(10,.3),
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1,
    backgroundColor:'white',
    borderColor: Color.lightGrey,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Color.themeBlue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  txt5: {
    // marginTop: moderateScale(25, 0.3),
    fontSize: moderateScale(11, 0.6),
  },
  txt6: {
    fontSize: moderateScale(15, 0.6),
  },
});

export default Signup;
