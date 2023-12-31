import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import navigationService from '../navigationService';
import { useSelector } from 'react-redux';
import moment from 'moment';

const PaymentInvoice = props => {
  const Invoice = props.route.params.body;
  const user = useSelector(state=> state.commonReducer.userData)

  // console.log('PAYMENT INVOICE ========>>>>>>', Invoice);


  return (
    <>
      <CustomStatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          // backgroundColor: Color.themeColor2,
          backgroundColor:'white',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: moderateScale(10, 0.3),
            alignItems: 'center',
            width: windowWidth,
            paddingVertical: moderateScale(10, 0.6),
          }}>
          <View style={{height: windowHeight * 0.1, width: windowWidth * 0.2}}>
            <CustomImage
              source={require('../Assets/Images/logo.png')}
              resizeMode={'contain'}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <CustomText isBold style={{fontSize: moderateScale(18, 0.6)}}>
            Business Hub
          </CustomText>
        </View>

        <View
          style={{
            width: windowWidth,
            marginTop: moderateScale(30, 0.3),
            alignItems: 'center',
          }}>
          <View
            style={{
              width: windowWidth * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(20, 0.3),
            }}>
            <CustomText>Order Id</CustomText>
            <CustomText>123424928346</CustomText>
          </View>
          <View
            style={{
              width: windowWidth * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(20, 0.3),
            }}>
            <CustomText>Bill To</CustomText>
            <CustomText>{user?.name}</CustomText>
          </View>
          <View
            style={{
              width: windowWidth * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(20, 0.3),
            }}>
            <CustomText>Amount Due To</CustomText>
            <CustomText>PKR {Invoice.total}</CustomText>
          </View>
          <View
            style={{
              width: windowWidth * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(20, 0.3),
            }}>
            <CustomText>Date</CustomText>
            <CustomText>{ moment().format('DD MMM YYYY')}</CustomText>
          </View>
          <View
            style={{
              width: windowWidth * 0.9,
              flexDirection: 'row',
              marginTop: moderateScale(20, 0.3),
            }}>
            <CustomText  numberOfLines={2} style={{width:windowWidth*0.9,color:"#e4b22d",fontSize:moderateScale(11,0.6)}}>Note: kindly contact seller for further details with in two days</CustomText>
          </View>
        </View>


        <View
          style={{
            width: windowWidth,
            paddingVertical: moderateScale(10, 0.3),
            marginTop: moderateScale(10, 0.3),
            alignItems: 'center',
          }}>
          <View
            style={{
              width: windowWidth * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(10, 0.3),
              borderBottomWidth: 1,
              borderBottomColor: Color.mediumGray,
              paddingBottom: 10,
            }}>
            <CustomText isBold>ITEMS</CustomText>
            <CustomText isBold>#AMOUNT </CustomText>
          </View>

          <ScrollView
           contentContainerStyle={{
            paddingBottom:moderateScale(20,0.6),
            // maxHeight: windowHeight * 0.2,

           }}
            style={{
            maxHeight: windowHeight * 0.2,
            }}>
            {Invoice.order.map(item => {
              return (
                <View
                  style={{
                    width: windowWidth * 0.9,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: moderateScale(20, 0.3),
                  }}>
                  <CustomText>
                    {item.title} x {item.product_quantity}
                  </CustomText>
                  <CustomText>PKR{item.price}</CustomText>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            width: windowWidth * 0.9,
            borderBottomWidth: 1,
            borderColor: Color.mediumGray,
          }}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.9,
            marginTop: moderateScale(20, 0.3),
          }}>
          <CustomText isBold>Total (Rupees) </CustomText>
          <CustomText isBold>PKR {Invoice.total}</CustomText>
        </View>

        <TouchableOpacity
          onPress={() => navigationService.navigate('CustomerDashboard')}
          activeOpacity={0.8}
          style={{
            width: windowWidth * 0.4,
            paddingVertical: moderateScale(15, 0.6),
            backgroundColor: Color.themeBlue,
            borderRadius: moderateScale(10, 0.3),
            marginTop: moderateScale(20, 0.3),
            alignItems: 'center',
          }}>
          <CustomText style={{color: Color.white, fontSize:moderateScale(15,.6)}}>Back To Home</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: windowWidth * 0.8,
            paddingVertical: moderateScale(10, 0.6),
            borderRadius: moderateScale(10, 0.3),
            alignItems: 'center',
          }}>
          <CustomText
            style={{color: Color.black, marginLeft: moderateScale(10, 0.3)}}>
            Powered by
          </CustomText>

          <View
            style={{
              width: windowWidth * 0.3,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <CustomImage
              source={require('../Assets/Images/logo.png')}
              resizeMode={'contain'}
              style={{height: 20, width: 20}}
            />
            <CustomText isBold style={{color: Color.black}}>
              Business Hub
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PaymentInvoice;
