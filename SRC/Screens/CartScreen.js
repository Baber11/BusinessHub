import {
  FlatList,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CartItem from '../Components/CartItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../Components/CustomButton';
import { EmptyCart, Order } from '../Store/slices/common';
import navigationService from '../navigationService';
import { useEffect } from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { Post } from '../Axios/AxiosInterceptorFunction';

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.commonReducer.cart);
  // console.log('the data is ========>> >> ', cartData);
  const [isLoading, setIsLoading] = useState(false)
  const [finalAmount, setFinalAmount] = useState(0);
  // const [productsForCard, setProdctsForCart] = useState([]);
  const subTotal = route?.params?.subTotal;
  const token = useSelector(state => state.authReducer.token);

  const calcTotal = () => {
    let total = 0;
    cartData.map((item, index) => {
      total += item?.price * item?.qty
    })
    return total
    // console.log('Total=========>>>>',total)
  }
  const Confirm = () => {
    Alert.alert('Action required', 'Login to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Login',
        onPress: () => {
          navigationService.navigate('LoginScreen');
        },
      },
    ]);
    return true;
  };

  const checkOut = async () => {
    if (
      cartData.some(item => {
        return (
          item?.selectedColor == '' ||
          (item?.size.length > 0 && item?.selectedSize == '')
        );
      })
    ) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
          'Please select the color and sizes for all items',
          ToastAndroid.SHORT,
        )
        : Alert.alert('Please select the color for all items');
    } else {
      const url = 'auth/checkout';
      var totalBill = 0;
      cartData.map((item, index) => {
        totalBill += item?.price * item?.product_quantity
      })

      const body = {
        item_quantity: cartData?.length,
        // product_id: '',
        // Image: require('../Assets/Images/logo.png'),
        total: totalBill,
        order: cartData,
      };
      console.log('🚀 ~ file: CartScreen.js:55 ~ checkOut ~ body:', body);
      setIsLoading(true)
      const response = await Post(url, body, apiHeader(token));
      setIsLoading(false)

      if (response != undefined) {
        console.log("🚀 ~ file: CartScreen.js:65 ~ checkOut ~ response:", response?.data)


        dispatch(Order(body));
        dispatch(EmptyCart());
        navigationService.navigate('PickUpLocation', { body: body });
        Platform.OS == 'android'
          ? ToastAndroid.show('Order Confirmed', ToastAndroid.SHORT)
          : Alert.alert('Order Confirmed');
      }
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#CBE4E8'} barStyle={'dark-content'} />
      <Header showBack={true} headerColor={['#fff', '#fff']} title={'Cart'} />
      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.9,
          // backgroundColor: '#CBE4E8',
          backgroundColor:'white',
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartData}
          style={{
            height: windowHeight * 0.9,

            width: windowWidth,
            // minHeight : windowHeight * 0.,
            // flexGrow : 0,
            // marginBottom :100,
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(100, 0.3),
            paddingTop: moderateScale(20, 0.3),
          }}
          renderItem={({ item, index }) => {
            return <CartItem item={item} fromCheckout={true} />;
          }}
          ListEmptyComponent={() => {
            return (
              <>
                <View
                  style={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.55,
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
                    fontSize: moderateScale(20, 0.6),
                    marginTop: moderateScale(-50, 0.3),
                  }}>
                  DATA NOT ADDED YET
                </CustomText>
              </>
            );
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(30, 0.6),
            width: windowWidth,
            alignItems: 'center',
          }}>
         {cartData.length> 0 && <CustomButton
            isBold
            onPress={() => {
              if(token == null){
                Confirm()
              }
              else{
                checkOut();

              }

            }}
            text={isLoading ? <ActivityIndicator color={'white'} size={'small'} /> : 'Place Order'}
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            fontSize={moderateScale(16, 0.6)}
            // marginBottom={moderateScale(10,.3)}
            // marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeBlue}
            borderRadius={moderateScale(30, 0.3)}
          // isGradient
          />}
        </View>
      </View>
    </>
  );
};

export default CartScreen;

const styles = ScaledSheet.create({
  heading: {
    fontSize: moderateScale(20, 0.3),
    textAlign: 'left',
    width: windowWidth * 0.9,
    // backgroundColor : 'red'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    marginTop: moderateScale(10, 0.3),
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
    paddingBottom: moderateScale(10, 0.3),
  },
  subHeading: {
    fontSize: moderateScale(16, 0.3),
  },
  userTypeContainer: {
    // width: windowWidth * 0.7,
    // backgroundColor : Color.red,
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  innerContainer: {
    // width: '48%',
    // backgroundColor : 'green',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(5, 0.3),
  },
  circle: {
    height: moderateScale(13, 0.3),
    width: moderateScale(13, 0.3),
    borderRadius: moderateScale(6.5, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.green,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(12, 0.3),
  },
});
