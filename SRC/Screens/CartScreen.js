import {
    FlatList,
    View,
    TouchableOpacity,
    Platform,
    ToastAndroid,
  } from 'react-native';
  import React from 'react';
  import ScreenBoiler from '../Components/ScreenBoiler';
  import {moderateScale, ScaledSheet} from 'react-native-size-matters';
  import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
  import Color from '../Assets/Utilities/Color';
  import CartItem from '../Components/CartItem';
  import CustomText from '../Components/CustomText';
  import {useState} from 'react';
  import numeral from 'numeral';
  import {useDispatch, useSelector} from 'react-redux';
  import {Icon} from 'native-base';
  import CustomButton from '../Components/CustomButton';
  import {ActivityIndicator} from 'react-native';
  import {EmptyCart, setWholeCart,Order} from '../Store/slices/common';
  import navigationService from '../navigationService';
  import {useEffect} from 'react';
  import { Get, Post } from '../Axios/AxiosInterceptorFunction';
  import CustomStatusBar from '../Components/CustomStatusBar';
  import Header from '../Components/Header';
  import Feather from 'react-native-vector-icons/Feather'
  
  const CartScreen = ({route}) => {
    const dispatch = useDispatch();
    const cartData = useSelector(state => state.commonReducer.cart);
    const orderDATA = useSelector(state => state.commonReducer.order);
    console.log( 'the data is ========>> >> ',orderDATA)
    const [finalAmount, setFinalAmount] = useState(0);
    const [productsForCard, setProdctsForCart] = useState([]);
    const subTotal = route?.params?.subTotal;
   
  
   
  
    useEffect(() => {
      setProdctsForCart([])
      cartData.map((item, index) => {
        return setProdctsForCart(prev => [
          ...prev,
          {
            product_id: item?.id,
            selectedColor: item?.selectedColor,
            selectedSize: item?.selectedSize,
            selectedQuantity: item?.qty,
          },
        ]);
      });
    }, []);
  
    return (
      <>
       <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header
        showBack={true} headerColor={['#CBE4E8', '#D2E4E4']}
        cart
      />
     
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartData}
          style={{
            height: '90%',
            backgroundColor: 'white',
            width: windowWidth,
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(20, 0.3),
          }}
          renderItem={({item, index}) => {
            return <CartItem item={item} fromCheckout={true} />;
          }}
          ListFooterComponent={() => {
            return (<View>
             
              <CustomButton
            isBold
            onPress={() => {
              dispatch(Order(cartData))
              dispatch(EmptyCart())
         
              navigationService.navigate('HomeScreen')
            }}
            text={'Pay'}
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            fontSize={moderateScale(16, 0.6)}
            // marginBottom={moderateScale(10,.3)}
            // marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeBgColor}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
          />
          </View>
            );
          }}
        /> 
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
  