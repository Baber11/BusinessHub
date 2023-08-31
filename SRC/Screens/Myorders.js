import {View, Text, FlatList, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import CustomImage from '../Components/CustomImage';

const Myorders = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const orderData = useSelector(state => state.commonReducer.order);
  const bookings = useSelector(state => state.commonReducer.bookings);
  const [selectedTab, setSelectedTab] = useState('Products');
  const [newData, setNewData] = useState(
    selectedTab == 'Products' ? orderData : bookings,
  );

  useEffect(() => {
    setNewData(selectedTab == 'Products' ? orderData : bookings);
  }, [selectedTab]);

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
          placeHolderColor={'#000'}
          placeholderName={'Search your Order Id'}
          array={selectedTab == 'Products' ? orderData : bookings}
          fontSize={13}
          arrayItem={'order'}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={newData}
          contentContainerStyle={{
            paddingBottom: moderateScale(40, 0.3),
            width: windowWidth,
            minHeight: windowHeight * 0.9,
            paddingTop: moderateScale(20, 0.3),
          }}
          style={
            {
              // backgroundColor: 'white',
            }
          }
          renderItem={({item, index}) => {
            // console.log('DATA34', item);
            return <MyOrderCard item={item} type={selectedTab != 'Products'} />;
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
                    color:
                      selectedTab == 'Products' ? 'white' : Color.themeColor,
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
                    color:
                      selectedTab == 'Services' ? 'white' : Color.themeColor,
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
          ListEmptyComponent={() => {
            return (
              <>
                <View
                  style={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.4,
                    marginTop: moderateScale(30, 0.3),
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}>
                  <CustomImage
                    source={require('../Assets/Images/4.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode={'contain'}
                  />
                </View>
                <CustomText
                  isBold
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: moderateScale(15, 0.6),
                    marginTop: moderateScale(-50, 0.3),
                  }}>
                  ERROR 404 DATA NOT FOUND
                </CustomText>
              </>
            );
          }}
        />
      </View>
    </>
  );
};

export default Myorders;
