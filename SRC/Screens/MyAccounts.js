import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  ToastAndroid,
  Alert, 
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../Components/Product';
import CustomStatusBar from '../Components/CustomStatusBar';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import ImagePickerModal from '../Components/ImagePickerModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { setUserData } from '../Store/slices/common';

const MyAccounts = () => {
  const token = useSelector(state => state.authReducer.token);
  const sellerProducts = useSelector(
    state => state.commonReducer.sellerProducts,
  );
  const [myOrder, setMyOrder] = useState([]);
  const userData = useSelector(state => state.commonReducer.userData);
  const orderData = useSelector(state => state.commonReducer.order);


  const dispatch = useDispatch()
 
  const [isLoading, setIsLoading] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation()

  const getProducts = async () => {
    const url = 'auth/product';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      
      setAddedProducts(response?.data?.data);
    }
  };

  const getSellerOrders = async () => {
    const url = 'auth/vendor/order/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);

    if (response != undefined) {
     
      setOrders(response?.data?.orders);
    }
  };

  const updateProfile = async () => {
    const url = 'auth/profile';
    console.log("🚀 ~ file: MyAccounts.js:75 ~ updateProfile ~ url:", url)

    const formData = new FormData()
    if(Object.keys(image).length>0){
      formData.append('photo',image )
    }else{
      return Platform.OS == 'android'
          ? ToastAndroid.show(`image is required`, ToastAndroid.SHORT)
          : Alert.alert(`image is required`);
    }
   

  setIsLoading(true)
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false)
    if( response != undefined){
      // return console.log("🚀 ~ file: Profile.js:113 ~ MyAccount ~ response:", response?.data)

      dispatch(setUserData(response?.data?.user_info))
      
    }
  };  






  useEffect(() => {
   
    getProducts();
    getSellerOrders();
  }, [orderData]);



  useEffect(() => {
    if(Object.keys(image).length>0){
      updateProfile()
      setImage({})
    }

  }, [image])
  

 
  return (
    <>
      <CustomStatusBar
        backgroundColor={['#CBE4E8', '#D2E4E4']}
        barStyle={'dark-content'}
      />

      <ImageBackground
          source={require('../Assets/Images/waves1.jpg')}
          resizeMode={'cover'}
          style={{
            width: windowWidth * 1,
            // height: windowHeight * 0.3,
            paddingVertical:moderateScale(20,.6),
            // height: windowHeight * 0.9,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
          style={{position:'absolute', left:20, top:20}}
            name={'menu'}
            as={Feather}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          <View
            style={{
              width: windowWidth * 0.3,
              //   height: windowHeight * 0.3,
              alignItems: 'center',
              //   backgroundColor:'orange',
            }}>
            <View style={styles.Profile1}>
              <CustomImage
                resizeMode={'cover'}
                source={
                  image?.uri
                    ? {uri: image?.uri} : userData?.photo ?{uri:userData?.photo}
                    : require('../Assets/Images/logo.png')
                }
                style={{width: '100%', height: '100%'}}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.edit}
              onPress={() => {
                setImagePicker(true);
              }}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.white}
                size={moderateScale(16, 0.3)}
                onPress={() => {
                  setImagePicker(true);
                }}
              />
            </TouchableOpacity>
            <CustomText style={styles.text1} isBold>
              {userData?.name}
            </CustomText>
          </View>
        </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
          backgroundColor: Color.white,
          minHeight: windowHeight * 0.9,
        }}>
       
       

        <View style={{borderBottomWidth: 2, borderColor: Color.white}}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: windowWidth,
            height: windowHeight * 0.09,
            alignItems: 'center',
            backgroundColor: Color.themeBlue,
          }}>
          <View style={{alignItems: 'center'}}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.white,
              }}>
              Total Products
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.white,
              }}>
              {addedProducts?.length}
            </CustomText>
          </View>

          <View style={{alignItems: 'center'}}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.white,
              }}>
              Total Orders
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.white,
              }}>
              {/* {
                orderData.filter(item =>
                  item?.order?.filter(order => order.sellerId == userData?.id),
                ).length
              } */}
              {orders?.length}
            </CustomText>
          </View>
        </View>


        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={addedProducts}
          style={{
            width: windowWidth,
          }}
          contentContainerStyle={{
            alignItems: 'center',
            // paddingBottom: moderateScale(100, 0.3),
            paddingTop: moderateScale(20, 0.3),
          }}
          renderItem={({item, index}) => {
            return <Product item={item} seller={true} />;
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
      </ScrollView>
      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
      />
    </>
  );
};

export default MyAccounts;

const styles = StyleSheet.create({
  profileSection: {
    height: windowHeight * 0.09,
    width: windowHeight * 0.09,
    backgroundColor: '#fff',
    borderRadius: (windowHeight * 0.09) / 2,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Profile1: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: (windowWidth * 0.3) / 2,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
    // paddingVertical:moderateScale(20,.6)
    marginTop: moderateScale(20, 0.3),
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderColor : 'black'
  },
  edit: {
    backgroundColor: Color.themeColor1,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    top:110,
    right: 10,
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    paddingVertical: moderateScale(10, 0.6),
    fontSize: moderateScale(18, 0.3),
    color: Color.black,
    // width: windowWidth * 0.45,
  },
});
