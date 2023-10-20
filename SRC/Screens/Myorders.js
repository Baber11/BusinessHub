import {
  View,
  Text,
  FlatList,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';

import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import MyOrderCard from '../Components/MyorderComponent';
import SearchbarComponent from '../Components/SearchbarComponent';
import CustomImage from '../Components/CustomImage';
import {Get} from '../Axios/AxiosInterceptorFunction';
import Product from '../Components/Product';

const Myorders = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const [selectedTab, setSelectedTab] = useState('Products');
  const [isLoading, setIsLoading] = useState(false);
  const [productOrders, setProductOrders] = useState([]);
  // console.log("🚀 ~ file: Myorders.js:25 ~ Myorders ~ newData:", newData)
  const [serviceOrders, setServiceOrders] = useState([]);
 
  const [newData, setNewData] = useState(productOrders);
  const getUserOrders = async () => {
    const url = 'auth/order/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setProductOrders(response?.data?.orders);
    }
  };

  const getUserServices = async () => {
    const url = 'auth/services/book/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setServiceOrders(response?.data?.data);
    }
  };

  useEffect(() => {
    getUserOrders();
    getUserServices();

    // setNewData(
    //   selectedTab == 'Products'
    //     ? productOrders.reverse()
    //     : serviceOrders.reverse(),
    // );
  }, [selectedTab, isFocused]);

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />

      <Header
        headerColor={['#fff', '#fff']}
        // showLogout
        hideUser
      />
      <View
        style={{
          height: windowHeight * 0.9,
          width: windowWidth,
          backgroundColor: Color.white,
          alignItems: 'center',
        }}>
        <View style={{marginTop: moderateScale(10, 0.3)}}>
          <SearchbarComponent
            setNewData={setNewData}
            placeHolderColor={'#000'}
            placeholderName={'Search your Order Id'}
            array={selectedTab == 'Products' ? productOrders : serviceOrders}
            fontSize={13}
            arrayItem={'order'}
          />
        </View>

        {isLoading ? (
          <View
            style={{
              height: windowHeight * 0.8,
              width: windowWidth * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'green',
            }}>
            <ActivityIndicator
              color={Color.darkBlue}
              size={moderateScale(45, 0.6)}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={
              !newData.length
                ? selectedTab == 'Products'
                  ? productOrders
                  : serviceOrders
                : newData
            }
            // data={serviceOrders}
            contentContainerStyle={{
              paddingBottom: moderateScale(40, 0.3),
              width: windowWidth,
              minHeight: windowHeight * 0.9,
              paddingTop: moderateScale(20, 0.3),
            }}
           
            renderItem={({item, index}) => {
              // console.log('DATA34', item);
              return (
                <MyOrderCard
                  item={item}
                  type={selectedTab != 'Products'}
                  selectedTab={selectedTab}
                />
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.7,
                    borderWidth: 1,
                    borderColor: Color.veryLightGray,
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
                        selectedTab == 'Products' ? 'white' : Color.themeBlue,
                      backgroundColor:
                        selectedTab == 'Products'
                          ? Color.darkBlue
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
                        selectedTab == 'Services' ? 'white' : Color.themeBlue,
                      backgroundColor:
                        selectedTab == 'Services'
                          ? Color.darkBlue
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
                      source={require('../Assets/Images/4.jpg')}
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
                    DATA NOT ADDED YET
                  </CustomText>
                </>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default Myorders;
