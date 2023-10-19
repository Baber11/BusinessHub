import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  ActivityIndicator,
  BackHandler,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatList, Icon, ScrollView} from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import {
  ScaledSheet,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomTable from '../Components/CustomTable';
import moment from 'moment';
import {Delete, Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import Product from '../Components/Product';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { deleteService } from '../Store/slices/common';

const SellerProduct = props => {
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ file: SellerProducts.js:40 ~ SellerProduct ~ token:", token)
  const userData = useSelector(state => state.commonReducer.userData);
  const sellerProducts = useSelector(
    state => state.commonReducer.sellerProducts,
  );
  // const sellerService = useSelector(state => state.commonReducer.sellerService);

  const [isLoading, setIsLoading] = useState(false);
  const [isProductLoading, setProductLoading] = useState(false);
  const [services, setServices] = useState([]);
  console.log("🚀 ~ file: SellerProducts.js:45 ~ SellerProduct ~ services:", services[0]?.images[0])
  const [products, setProducts] = useState(
    sellerProducts.filter(item => {
      return item?.userId == userData.id;
    }),
  );

  const [addedProducts, setAddedProducts] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const getProducts = async () => {
    const url = 'auth/product';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      // console.log(
      //   '🚀 ~ file: CustomerDashboard.js:52 ~ productList ~ response:',
      //   response?.data,
      // );
      console.log('parsed data=========================',response?.data)
      // console.log('parsed data=========================',JSON.parse(response?.data?.data[9]?.size))
      setAddedProducts(response?.data?.data);
    }
  };

  const getServices = async () => {
    const url = 'auth/service';
    setProductLoading(true);
    const response = await Get(url, token);
    setProductLoading(false);
    if (response?.data?.success) {
      // console.log(
      //   '🚀 ~ file: AddServices.js:114 ~ getServices ~ response:',
      //   response?.data,
      // );

      response?.data?.data
        ? setServices([response?.data?.data])
        : setServices([]);
      // console.log('response?.data?.data?.filter',response?.data?.data?.filter(item=> item?.user_id == userData?.id))
    }
  };

  const editService = async item => {
    const url = `auth/service/${item?.id}`;
    // setIsLoading(true);
    const response = await Get(url, token);
    // setIsLoading(false);

    if (response != undefined) {
      // console.log(
      //   '🚀 ~ file: SellerProducts.js:87 ~ editService ~ response:',
      //   response?.data,
      // );
      navigationService.navigate('AddServices', {item});
    }
  };

  const deleteService = async id => {
    const url = `auth/service/${id}`;
    setIsLoading(true);
    const response = await Delete(url, apiHeader(token));
    setIsLoading(false);
    // console.log(
    //   '🚀 ~ file: SellerProducts.js:98 ~ is ~ response:',
    //   response?.data,
    // );
    if (response != undefined) {
      getServices();
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    getProducts();
    getServices();
  }, [isFocused]);

  useEffect(() => {
    setProducts(
      sellerProducts.filter(item => {
        return item?.sellerId == userData?.id;
      }),
    );
  }, [isFocused, sellerProducts]);

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />
      <Header headerColor={['#fff', '#fff']} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
        }}
        style={{
          minHeight: windowHeight * 0.9,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
            alignItems: 'center',
            // backgroundColor: 'purple',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              // marginTop: moderateVerticalScale(20, 0.6),
              // marginLeft: moderateScale(20, 0.3),
            }}>
            Services
          </CustomText>
          <CustomButton
            onPress={() => {
              services.length > 0
                ? ToastAndroid.show(
                    'Service is already added',
                    ToastAndroid.SHORT,
                  )
                : navigationService.navigate('AddServices');
            }}
            text={'service'}
            textColor={Color.white}
            iconName={'plus'}
            iconType={Entypo}
            width={windowWidth * 0.25}
            height={windowHeight * 0.04}
            fontSize={moderateScale(10, 0.6)}
            // marginTop={moderateScale(10, 0.3)}
            bgColor={Color.themeBlue}
            borderRadius={moderateScale(20, 0.3)}
            // isGradient
            isBold
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: moderateScale(10, 0.6),
            // marginTop: moderateScale(10, 0.3),
            alignItems: 'center',
            flexDirection: 'row',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {isLoading ? (
            <View
              style={{
                height: windowHeight * 0.1,
                width: windowWidth * 0.9,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'green',
              }}>
              <ActivityIndicator
                color={Color.themeBlue}
                size={moderateScale(30, 0.6)}
              />
            </View>
          ) : services?.length > 0 ? (
            services?.map((item, index) => {
              // console.log(
              //   '🚀 ~ file: SellerProducts.js:203 ~ .map ~ item:',
              //   item,
              // );
              return (
                <>
                  <TouchableOpacity
                    key={item?.userid}
                    style={{
                      flexDirection: 'row',
                      width: windowWidth * 0.9,
                      height: windowHeight * 0.15,
                      paddingVertical: moderateScale(10, 0.6),
                      paddingRight: moderateScale(10, 0.6),

                      borderRadius: moderateScale(20, 0.6),
                      borderColor: Color.veryLightGray,
                      borderWidth: 1,
                      //  width: windowWidth * 0.16,
                      marginHorizontal: moderateScale(5, 0.3),
                      backgroundColor: 'white',
                    }}
                    onPress={() => {
                      navigationService.navigate('ServiceDetails', {
                        item,
                        seller: true,
                      });
                    }}>
                    <View
                      style={{
                        width: windowWidth * 0.3,
                        height: windowHeight * 0.12,
                        borderRadius: moderateScale(5, 0.6),
                        backgroundColor: 'white',
                        overflow: 'hidden',
                        marginLeft: moderateScale(10, 0.6),
                      }}>
                      <CustomImage
                        source={{uri: item?.images[0]?.photo}}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode={'stretch'}
                        onPress={() => {
                          navigationService.navigate('ServiceDetails', {
                            item,
                            seller: true,
                          });
                        }}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: moderateScale(10, 0.3),
                      }}>
                      <CustomText
                        numberOfLines={1}
                        style={{
                          fontSize: moderateScale(16, 0.6),
                          width: windowWidth * 0.45,
                          // textAlign: 'center',
                          color: 'black',
                        }}>
                        {item?.shop_name}
                      </CustomText>
                      <CustomText
                        numberOfLines={1}
                        style={{
                          fontSize: moderateScale(13, 0.6),
                          width: windowWidth * 0.45,
                          // width: windowWidth * 0.16,
                          // textAlign: 'center',
                          color: 'black',
                        }}>
                        {item?.category}
                      </CustomText>
                      <CustomText isBold>
                        starting from Rs {item?.charges}
                      </CustomText>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <CustomButton
                          onPress={() => {
                            editService(item);
                          }}
                          text={'Edit'}
                          textColor={Color.white}
                          iconName={'pencil'}
                          iconType={Entypo}
                          // width={windowWidth * 0.28}
                          height={windowHeight * 0.035}
                          fontSize={moderateScale(10, 0.6)}
                          marginTop={moderateScale(4, 0.3)}
                          bgColor={Color.themeBlue}
                          borderRadius={moderateScale(20, 0.3)}
                          iconStyle={{
                            fontSize: moderateScale(14, 0.6),
                          }}
                          marginRight={moderateScale(5, 0.3)}
                          isBold
                        />
                        <CustomButton
                          onPress={() => {
                            // dispatch(deleteService(item))
                            deleteService(item?.id);
                          }}
                          text={'Delete'}
                          textColor={Color.white}
                          iconName={'delete'}
                          iconType={MaterialIcons}
                          // width={windowWidth * 0.28}
                          height={windowHeight * 0.035}
                          fontSize={moderateScale(10, 0.6)}
                          marginTop={moderateScale(4, 0.3)}
                          bgColor={Color.themeBlue}
                          borderRadius={moderateScale(20, 0.3)}
                          iconStyle={{
                            fontSize: moderateScale(14, 0.6),
                          }}
                          isBold
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                 
                </>
              );
            })
          ) : (
            <View
              style={{
                width: windowWidth * 0.9,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: windowWidth * 0.6,
                  height: windowHeight * 0.2,
                  alignSelf: 'center',
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
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: moderateScale(15, 0.6),
                }}
                isBold>
                DATA NOT ADDED YET
              </CustomText>
            </View>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
            alignItems: 'center',
            // backgroundColor: 'purple',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              // marginTop: moderateVerticalScale(20, 0.6),
              // marginLeft: moderateScale(20, 0.3),
            }}>
            Products
          </CustomText>
          <CustomButton
            onPress={() => {
              navigationService.navigate('AddProduct');
            }}
            text={'Product'}
            textColor={Color.white}
            iconName={'plus'}
            iconType={Entypo}
            width={windowWidth * 0.25}
            height={windowHeight * 0.04}
            fontSize={moderateScale(10, 0.6)}
            // marginTop={moderateScale(10, 0.3)}
            bgColor={Color.themeBlue}
            borderRadius={moderateScale(20, 0.3)}
            // isGradient
            isBold
          />
        </View>

        {isProductLoading ? (
          <View
            style={{
              height: windowHeight * 0.6,
              width: windowWidth,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'green',
            }}>
            <ActivityIndicator
              color={Color.themeBlue}
              size={moderateScale(45, 0.6)}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={addedProducts}
            contentContainerStyle={{
              alignSelf: 'center',
              marginTop: moderateScale(5, 0.3),
            }}
            renderItem={({item, index}) => {
              return (
                <Product
                  item={item}
                  seller={true}
                  setAddedProducts={setAddedProducts}
                  addedProducts={addedProducts}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <>
                  <View
                    style={{
                      width: windowWidth * 0.8,
                      height: windowHeight * 0.32,
                      marginTop: moderateScale(20, 0.3),
                      alignSelf: 'center',
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
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: moderateScale(17, 0.6),
                      marginTop: moderateScale(-25, 0.3),
                      paddingVertical: moderateScale(5, 0.6),
                    }}
                    isBold>
                    DATA NOT ADDED YET
                  </CustomText>
                </>
              );
            }}
          />
        )}
      </ScrollView>
    </>
  );
};

export default SellerProduct;

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
  categoryContainer: {
    height: windowHeight * 0.09,
    width: windowWidth * 1,
    padding: moderateScale(10, 0.6),
    marginTop: moderateScale(20, 0.3),
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'purple',
    justifyContent: 'space-between',
  },
});
