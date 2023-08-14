import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon, ScrollView} from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import {
  ScaledSheet,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomTable from '../Components/CustomTable';
import moment from 'moment';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ file: HomeScreen.js:25 ~ HomeScreen ~ userData:', userData);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  // const [totalUser , setTotalUser] = useState(0);
  // const [ActiveUser , setActiveUser] = useState(0);
  // const [DeactiveUser , setDeactiveUser] = useState(0);
  // console.log("🚀 ~ file: HomeScreen.js:30 ~ HomeScreen ~ totalUser:", totalUser , ActiveUser , DeactiveUser)

  const isFocused = useIsFocused();
  console.log(
    '🚀 ~ file: HomeScreen.js:27 ~ HomeScreen ~ isFocused:',
    isFocused,
  );

  const dummyArray1 = ['Name', 'Contact', 'Role', 'Status'];

  const getUser = async () => {
    const url = 'auth/user';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response?.data?.success) {
      // console.log('auth user response======>>>>>>>>>>', response?.data?.data?.users);
      setUsers(response?.data?.data?.users);
      // setTotalUser(response?.data?.data?.users.length)
      // setActiveUser(response?.data?.data?.users.filter(item=>item?.status == 'active').length)
      // setDeactiveUser(response?.data?.data?.users.filter(item=>item?.status == 'inactive').length)
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />
      <Header
        headerColor={['#D2E4E4', '#D2E4E4']}
        // showLogout
        hideUser
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          minHeight: windowHeight * 0.9,
          backgroundColor: Color.themeColor2,
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(40, 0.6),
        }}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            marginTop: moderateVerticalScale(20, 0.6),
            marginLeft: moderateScale(20, 0.3),
          }}>
          Users
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.96,
            alignSelf: 'center',
          }}>
          <Chuncks amount={users?.length} title={'Total users'} />
          <Chuncks
            amount={users.filter(item => item?.status == 'active').length}
            title={'Active Users'}
            iconName={'user-shield'}
          />
          <Chuncks
            amount={users.filter(item => item?.status == 'inactive').length}
            title={'InActive Users'}
            iconName={'users-slash'}
          />
        </View>

        <CustomTable
          data={users}
          setData={setUsers}
          tableFields={dummyArray1}
          headingStyle={{
            width: windowWidth * 0.2,
            // backgroundColor: 'red',
          }}
          customStyle={{
            // backgroundColor: 'red',
            marginBottom: moderateScale(70, 0.3),
            height: windowHeight * 0.7,
            width: windowWidth * 0.95,
          }}
          dataStyle={{
            width: windowWidth * 0.2,
          }}
        />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const Chuncks = ({amount, title, iconName}) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[Color.themeColor, Color.themeColor]}
        style={styles.container}>
        <View
          style={{
            width: moderateScale(40, 0.6),
            height: moderateScale(40, 0.6),
            borderRadius: moderateScale(20, 0.6),
            backgroundColor: 'white',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Icon
            name={iconName ? iconName : 'user-alt'}
            as={FontAwesome5}
            style={{
              width: '100%',
              textAlign: 'center',
            }}
            size={moderateScale(18, 0.6)}
          />
        </View>
        <CustomText
          isBold
          style={{
            color: Color.white,
            marginTop: moderateScale(5, 0.3),
            fontSize: moderateScale(20, 0.6),
          }}>
          {amount}
        </CustomText>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(10, 0.6),
            textTransform: 'none',
          }}>
          {title}
        </CustomText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.16,
    paddingVertical: moderateScale(10, 0.6),
    borderRadius: moderateScale(15, 0.6),
    alignItems: 'center',
    marginTop: moderateScale(20, 0.3),
    // paddingLeft: moderateScale(15, 0.6),
    // paddingTop: moderateScale(10, 0.6),
    // backgroundColor : 'red'
  },
});
