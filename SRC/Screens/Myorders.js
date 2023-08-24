import {View, Text, FlatList, BackHandler} from 'react-native';
import React, {useState,useEffect} from 'react';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';

import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import MyOrderCard from '../Components/MyorderComponent';
import SearchbarComponent from '../Components/SearchbarComponent';

const Myorders = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const orderData = useSelector(state => state.commonReducer.order);
  console.log('🚀 ~ file: Myorders.js:17 ~ Myorders ~ orderData:', orderData);
  const bookings = useSelector(state => state.commonReducer.bookings);
  console.log('🚀 ~ file: Myorders.js:18 ~ Myorders ~ bookings:', bookings);
  const [selectedTab, setSelectedTab] = useState('Products');
  console.log(
    '🚀 ~ file: Myorders.js:19 ~ Myorders ~ selectedTab:',
    selectedTab,
  );

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
      <View
        style={{
          height: windowHeight * 0.9,
          width: windowWidth,
          backgroundColor: Color.themeColor2,
          alignItems: 'center',
        }}>
        <SearchbarComponent
          setNewData={setNewData}
          placeHolderColor={'#D3D3D3'}
          placeholderName={'Enter Order Id'}
          array={orderData}
          arrayItem={'order'}
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
          return <MyOrderCard item={item} type = {selectedTab != 'Products'} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.7,
                borderWidth: 1,
                borderColor: Color.themeColor,
                alignSelf: 'center',
                justifyContent: 'space-between',
                borderRadius: moderateScale(10, 0.6),
                overflow: 'hidden',
              }}>
              <CustomText
                style={{
                  width: windowWidth * 0.35,
                  textAlign: 'center',
                  paddingVertical: moderateScale(10, 0.6),
                  borderRadius: moderateScale(10, 0.6),
                  color: selectedTab == 'Products' ? 'white' : Color.themeColor,
                  backgroundColor:
                    selectedTab == 'Products'
                      ? Color.themeColor
                      : 'transparent',
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
                  paddingVertical: moderateScale(10, 0.6),
                  textAlign: 'center',
                  color: selectedTab == 'Services' ? 'white' : Color.themeColor,
                  backgroundColor:
                    selectedTab == 'Services'
                      ? Color.themeColor
                      : 'transparent',
                }}
                onPress={() => {
                  setSelectedTab('Services');
                }}>
                Services
              </CustomText>
            </View>
          );
        }}
      />
      </View>
    </>
  );
};

export default Myorders;
