import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import Myorder from '../Components/MyorderComponent';

import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Myorders = () => {
  const navigation = useNavigation();
  const orderData = useSelector(state => state.commonReducer.order);
  const bookings = useSelector(state => state.commonReducer.bookings);
  console.log('🚀 ~ file: Myorders.js:18 ~ Myorders ~ bookings:', bookings);
  const [selectedTab, setSelectedTab] = useState('Products');
  console.log("🚀 ~ file: Myorders.js:19 ~ Myorders ~ selectedTab:", selectedTab)

  console.log('Data55', orderData);

  const Data1 = [
    {
      id: 1,
      name: 'Sushi',
      Title: 'Minish Dish',
      price: '34',
      image: require('../Assets/Images/Mask2.png'),
    },
    {
      id: 2,
      name: 'Salad',
      Title: 'Menchi Katusha',
      price: '44',
      image: require('../Assets/Images/Mask3.png'),
    },
    {
      id: 3,
      name: 'Tikka',
      Title: 'Drawing Food',
      price: '64',
      image: require('../Assets/Images/Mask3.png'),
    },
    {
      id: 4,
      name: 'Meat',
      Title: 'Beef Food',
      price: '84',
      image: require('../Assets/Images/Mask3.png'),
    },
    {
      id: 5,
      name: 'Meat',
      Title: 'Beef Food',
      price: '84',
      image: require('../Assets/Images/Mask3.png'),
    },
  ];

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />

      <Header
        headerColor={['#D2E4E4', '#D2E4E4']}
        // showLogout
        hideUser
      />
    

      <FlatList
        showsVerticalScrollIndicator={false}
        data={selectedTab == 'Products' ? orderData : bookings}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
          minHeight: windowHeight * 0.9,
          paddingTop: moderateScale(20, 0.3),

        }}
        style={{
          backgroundColor: 'white',
        }}
        renderItem={({item, index}) => {
          console.log('DATA34', item);
          return (
            // <CustomText>hello</CustomText>
            <Myorder item={item} />
          );
        }}
        ListHeaderComponent={()=>{
          return(
          <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // paddingVertical: moderateScale(10, 0.6),
            width: windowWidth * 0.7,
            height: windowHeight * 0.05,
  
            // backgroundColor : 'red',
            borderWidth: 1,
            borderColor : Color.veryLightGrey ,
            alignSelf: 'center',
            justifyContent: 'space-between',
            borderRadius: moderateScale(10, 0.6),
            overflow: 'hidden',
          }}>
          <CustomText
            style={{
              width: windowWidth * 0.35,
              textAlign: 'center',
              height : '100%',
              justifyContent : 'center',
              borderRadius: moderateScale(10, 0.6),
              backgroundColor:
                selectedTab == 'Products' ? Color.themeColor : 'transparent',
            }}
            onPress={() => {
              setSelectedTab('Products');
            }}>
            Products
          </CustomText>
          <CustomText
            style={{
              width: windowWidth * 0.35,
              borderRadius: moderateScale(10, 0.6),
              height : '100%',
              textAlign: 'center',
              alignContent : 'center',
              backgroundColor:
                selectedTab == 'Services' ? Color.themeColor : 'transparent',
            }}
            onPress={() => {
              setSelectedTab('Services');
            }}>
            Services
          </CustomText>
        </View>)
        }}
    />
    
    </>
  );
};

export default Myorders;
