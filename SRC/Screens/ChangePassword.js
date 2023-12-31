import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
// import CustomHeader from '../Components/CustomHeader';
import {Icon, ScrollView} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {setUserToken} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Components/Header';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ChangePassword = props => {
  const navigationN = useNavigation();
  const token = useSelector(state => state.authReducer.token)
  const userData = useSelector(state => state.commonReducer.userData)
  console.log("🚀 ~ file: ChangePassword.js:44 ~ ChangePassword ~ userData:", userData?.email)

  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const resetPass = async () => {
    if (newPassword !== confirmNewPassword)
      return alert('Password and confirm password donot not match');
    const url = 'password/reset';
    const body = {
      email: userData?.email,
      password: newPassword,
      confirm_password: confirmNewPassword,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response?.data?.success != false) {
      console.log(
        '🚀 ~ file: ResetPassword.js:59 ~ resetPassword ~ response:',
        response?.data?.success,
      );
      navigationN.goBack()

      Platform.OS == 'android'
        ? ToastAndroid.show('Password Changed successfully',ToastAndroid.SHORT)
        : alert('Password Changed successfully');
   

    } 
    else{
      Platform.OS == 'android'
      ? ToastAndroid.show(response?.data?.error,ToastAndroid.SHORT)
      : alert(response?.data?.error);
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={['#fff', '#fff']}
        barStyle={'dark-content'}
      />
      <Header
        // showBack={true}
        // title={'Change Password'}
        headerColor={['#fff', '#fff']}
       
      />
      <ScrollView showsVerticalScrollIndicator={false}>

      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight*0.9,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['white', 'white']}
        // locations ={[0, 0.5, 0.6]}
      >
      
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // paddingBottom: moderateScale(20, 0.3),
            alignItems: 'center',
            // justifyContent: 'center',
            paddingTop : windowHeight * 0.1,
            width: '100%',
            height: windowHeight*0.9,
          }}>
          {/* <CardContainer
            style={{
              paddingVertical: moderateScale(30, 0.3),
              alignItems: 'center',
              // backgroundColor:'white',
            }}> */}
            <CustomText isBold style={styles.txt2}>
              Change Password
            </CustomText>
            <CustomText style={styles.txt3}>
              Want to change password ? don't worry, jsut take a simple step and
              create your new password!
            </CustomText>

            {/* <TextInputWithTitle
              titleText={'Current Passwrod'}
              secureText={true}
              placeholder={'Current Passwrod'}
              setText={setCurrentPassword}
              value={currentPassword}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(35, 0.3)}
              color={Color.themeBlue}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            /> */}

            <TextInputWithTitle
              titleText={'Enter New Password'}
              secureText={true}
              placeholder={'Enter New Password'}
              setText={setNewPassword}
              value={newPassword}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(80, 0.3)}
              color={Color.themeBlue}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <TextInputWithTitle
              titleText={'Confirm your new password'}
              secureText={true}
              placeholder={'Confirm your new password'}
              setText={setConfirmNewPassword}
              value={confirmNewPassword}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(10, 0.3)}
              color={Color.themeBlue}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Reset'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              marginTop={moderateScale(40, 0.3)}
              onPress={() => {
                resetPass()
                // dispatch(setUserToken({token: 'sadasdawdadas'}));

              }}
              bgColor={
                Color.themeBlue
              }
             
              borderRadius={moderateScale(30, 0.3)}
            />
          {/* </CardContainer> */}
        </KeyboardAwareScrollView>
      </LinearGradient>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.black,
    fontSize: moderateScale(25, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(10, 0.6),
    textAlign: 'center',
    width: '80%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },

  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.themeLightGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
});

export default ChangePassword;
