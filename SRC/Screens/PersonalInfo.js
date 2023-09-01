import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../Store/slices/common';
import {SetUserRole, setUserToken} from '../Store/slices/auth';
import {ToastAndroid} from 'react-native';
import {Platform} from 'react-native';
import {validateEmail} from '../Config';
import {Icon} from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';

const PersonalInfo = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  console.log(
    '🚀 ~ file: PersonalInfo.js:38 ~ PersonalInfo ~ userData:',
    userData,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState(
    userData?.name ? userData?.name : '',
  );
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(userData?.email ? userData?.email : '');
  const [confirmPass, setconfirmPass] = useState('');
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [userRole, setuserRole] = useState('seller');
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withFilter, setFilter] = useState(true);
  const [phone, setPhone] = useState(userData?.phone ? userData?.phone : '');
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
            'Please Enter a valid phone number',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Please Enter a valid phone number');
    } else if (password != confirmPass) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('passwords donot match', ToastAndroid.SHORT)
        : alert('passwords donot match');
    }
    const url = 'register';

    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    console.log('🚀 ~ file: Signup.js:93 ~ registerUser ~ response:', response);
    setIsLoading(false);

    if (response != undefined) {
      // console.log('response data==========>>>>>>>>', response?.data);
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(SetUserRole(response?.data?.user_info?.role));
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />

      <Header headerColor={['#D2E4E4', '#D2E4E4']} showBack />

      <LinearGradient
        style={{
          width: windowWidth,
          minHeight: windowHeight*0.9,
          paddingBottom: moderateScale(40, 0.6),
          justifyContent:'center',

          // height: windowHeight,
          alignItems: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[Color.themeColor2, Color.themeColor2]}>
       
        <CardContainer
          style={{
            paddingVertical: moderateScale(30, 0.3),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: moderateScale(30, 0.3),
          }}>
          <TextInputWithTitle
            title={'Username'}
            disable={true}
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
            //   marginTop={moderateScale(10, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
            //   color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />

          <TextInputWithTitle
            title={'Email'}
            disable={true}
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
            //   marginTop={moderateScale(10, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
            //   color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />

          <TextInputWithTitle
            title={'Contact'}
            disable={true}
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
            marginBottom={moderateScale(10, 0.3)}
            backgroundColor={Color.white}
            //   marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />

          {/* 
            <CustomButton
              onPress={() => registerUser()}
              text={
                isLoading ? (
                  <ActivityIndicator color={Color.white} size={'small'} />
                ) : (
                  'Update'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.4}
              height={windowHeight * 0.06}
              marginTop={moderateScale(30, 0.3)}
              bgColor={Color.yellow}
              // borderRadius={moderateScale(5, 0.3)}
              // isGradient
            /> */}
        </CardContainer>
      </LinearGradient>
    </>
  );
};

const styles = ScaledSheet.create({
  birthday: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.07,
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Color.lightGrey,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Color.themeColor,
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

export default PersonalInfo;
