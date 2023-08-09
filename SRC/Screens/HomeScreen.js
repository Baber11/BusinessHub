import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useState,useEffect} from 'react';
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
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
    const token = useSelector(state=> state.authReducer.token);
    const userData = useSelector(state=> state.commonReducer.userData);
    console.log("🚀 ~ file: HomeScreen.js:25 ~ HomeScreen ~ userData:", userData)

    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const isFocused = useIsFocused()
    console.log("🚀 ~ file: HomeScreen.js:27 ~ HomeScreen ~ isFocused:", isFocused)

  const dummyArray1 = ['Name', 'Contact', 'Role', 'Address'];
  const dummyArrayTable = [
    {
      name: 'Patti',
      Status: 'udhaar',
      date: moment().format('hh:mm:ss'),
      amount: 30,
    },
    {
      name: 'Caroom',
      Status: 'cash',
      date: moment().format('hh:mm:ss'),
      amount: 30,
    },
    {
      name: 'others',
      Status: 'cash',
      date: moment().format('hh:mm:ss'),
      amount: 30,
    },
  ];

  const getUser= async()=>{
    const url = 'auth/user';
    setIsLoading(true)
    const response = await Get(url,token);
    setIsLoading(false)
    if(response?.data?.success){
      console.log('auth user response======>>>>>>>>>>', response?.data?.data)
        setUsers(response?.data?.data?.users)
    }

  }

  useEffect(() => {
    getUser()
  

  }, [isFocused])
  
  


  return (
    <>
      <CustomStatusBar
        backgroundColor={['#CBE4E8','#D2E4E4']}
        barStyle={'dark-content'}
      />
      <Header 
      headerColor={['#CBE4E8','#D2E4E4']}
      />
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}> */}
        {/* <CustomText
          isBold
          style={{
            width: windowWidth * 0.9,
            // color : 'red',
            fontSize: moderateScale(30, 0.6),
            marginTop: moderateScale(10, 0.6),
            textAlign: 'center',
          }}>
          Kesy ho User !!
        </CustomText>
        <View
          style={{
            width: windowWidth * 0.9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {dummyArray.map((item, index) => {
            return <Chuncks color={item.color} item={item} key={index} />;
          })}
        </View> */}

          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              marginTop: moderateVerticalScale(20, 0.6),
              marginLeft:moderateScale(20,.3)
            }}>
           Users
          </CustomText>
      
        <CustomTable
          data={users}
          tableFields={dummyArray1}
          headingStyle={{
            width: windowWidth * 0.2,
            // backgroundColor: 'red',
          }}
          customStyle={{
            // backgroundColor: 'red',
            marginBottom: moderateScale(70, 0.3),
            height : windowHeight * 0.7
          }}
          dataStyle={{
            width: windowWidth * 0.2,
          }}
        />
      {/* </ScrollView> */}
    </>
  );
};

export default HomeScreen;

const Chuncks = ({color, item}) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={color}
        style={styles.container}>
        <View
          style={{
            width: moderateScale(30, 0.6),
            height: moderateScale(30, 0.6),
            borderRadius: moderateScale(15, 0.6),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={item.logo}
            as={FontAwesome5}
            size={moderateScale(12, 0.6)}
          />
        </View>
        <CustomText
          isBold
          style={{
            color: Color.white,
            marginTop: moderateScale(15, 0.6),
          }}>
          RS {item?.amount}
        </CustomText>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(10, 0.6),
            textTransform: 'none',
          }}>
          {item?.title}
        </CustomText>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(9, 0.6),
            textTransform: 'none',
            marginTop: moderateScale(10, 0.6),
          }}>
          Tap to preview
        </CustomText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.42,
    // height : windowHeight * 0.16 ,
    paddingVertical: moderateScale(10, 0.6),
    borderRadius: moderateScale(15, 0.6),
    // alignItems : 'center',
    marginTop: moderateScale(20, 0.3),
    paddingLeft: moderateScale(15, 0.6),
    paddingTop: moderateScale(10, 0.6),
    // backgroundColor : 'red'
  },
});
