import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
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
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import Product from '../Components/Product';
import navigationService from '../navigationService';
import SearchbarComponent from '../Components/SearchbarComponent';
import {Get} from '../Axios/AxiosInterceptorFunction';

const CustomerDashboard = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  // console.log('🚀 ~ file: HomeScreen.js:25 ~ HomeScreen ~ userData:', userData);
  const sellerServices = useSelector(
    state => state.commonReducer.sellerService,
  );
  // console.log(
  //   '🚀 ~ file: CustomerDashboard.js:38 ~ sellerServices:',
  //   sellerServices,
  // );
  const sellerProducts = useSelector(
    state => state.commonReducer.sellerProducts,
  );
  // console.log(
  //   '🚀 ~ file: CustomerDashboard.js:42 ~ CustomerDashboard ~ sellerProducts:',
  //   sellerProducts,
  // );
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const [selectedService, setSelectedService] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [allServices, setAllServices] = useState([]);
  // console.log(
  //   '🚀 ~ file: CustomerDashboard.js:47 ~ CustomerDashboard ~ allServices:',
  //   allServices,
  // );
  // console.log(
  //   '🚀 ~ file: CustomerDashboard.js:46 ~ CustomerDashboard ~ allProducts:',
  //   allProducts,
  // );

  const productList = async () => {
    const url = 'products';
    setIsLoading(true);
    const response = await Get(url);
    setIsLoading(false);
    if (response != undefined) {
      // console.log(
      //   '🚀 ~ file: CustomerDashboard.js:52 ~ productList ~ response:',
      //   response?.data,
      // );
      setAllProducts(response?.data?.data?.products);
    }
  };

  const serviceList = async () => {
    const url = 'services';
    setIsServiceLoading(true);
    const response = await Get(url);
    setIsServiceLoading(false);

    if (response != undefined) {
      setAllServices(response?.data?.data?.services);

      // console.log(
      //   '🚀 ~ file: CustomerDashboard.js:67 ~ serviceList ~ response:',
      //   response?.data,
      // );
    }
  };

  const [newData, setNewData] = useState([]);
  // console.log(
  //   '🚀 ~ file: CustomerDashboard.js:61 ~ CustomerDashboard ~ newData:',
  //   newData,
  // );

  useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (token != null) {
          BackHandler.exitApp();
        } else {
          navigation.goBack();
        }
        return true;
      },
    );
    return () => backhandler.remove();
  }, []);

  useEffect(() => {
    productList();
    serviceList();
    setNewData(allProducts);
  }, []);

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />
      <Header headerColor={['#D2E4E4', '#D2E4E4']} cart />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
          alignItems: 'center',
        }}
        style={{
          minHeight: windowHeight * 0.9,
          backgroundColor: 'white',
        }}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            textAlign: 'left',
            width: windowWidth,
            marginTop: moderateVerticalScale(20, 0.6),
            marginLeft: moderateScale(20, 0.3),
          }}>
          Services
        </CustomText>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: moderateScale(10, 0.6),
            alignItems: 'center',

            flexDirection: 'row',
            marginBottom: moderateScale(10, 0.6),
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          // style={styles.categoryContainer}
        >
          {isServiceLoading ? (
            <View style={{height:windowHeight*0.1, justifyContent:'center'}}>
            <ActivityIndicator
              color={Color.themeBlue}
              size={moderateScale(30, 0.6)}
            /></View>
          ) : (
            allServices?.map((item, index) => {
              // console.log(
              //   '🚀 ~ file: CustomerDashboard.js:145 ~ {allServices?.map ~ item:',
              //   item,
              // );
              return (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item?.userid}
                    style={{
                      flexDirection: 'row',
                      width: windowWidth * 0.9,
                      height: windowHeight * 0.15,
                      paddingVertical: moderateScale(10, 0.6),
                      paddingRight: moderateScale(10, 0.6),

                      borderRadius: moderateScale(10, 0.6),
                      borderColor: Color.veryLightGray,
                      borderWidth: 1,

                      marginHorizontal: moderateScale(5, 0.3),
                      backgroundColor: 'white',
                    }}
                    onPress={() => {
                      navigationService.navigate('ServiceDetails', {
                        item,
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
                          setSelectedService(item?.shop_name);
                          navigationService.navigate('ServiceDetails', {item});
                        }}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: moderateScale(10, 0.3),
                        justifyContent: 'center',
                      }}>
                      <CustomText
                        numberOfLines={1}
                        style={{
                          fontSize: moderateScale(16, 0.6),
                          width: windowWidth * 0.45,
                          color: 'black',
                        }}>
                        {item?.shop_name}
                      </CustomText>
                      <CustomText
                        numberOfLines={1}
                        style={{
                          fontSize: moderateScale(13, 0.6),
                          width: windowWidth * 0.45,
                          color: 'black',
                        }}>
                        {item?.category}
                      </CustomText>
                      <CustomText isBold>
                        starting from Rs {item?.charges}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                </>
              );
            })
          )}
        </ScrollView>

        <SearchbarComponent
          setNewData={setNewData}
          placeHolderColor={'#000'}
          placeholderName={'Enter Product Name'}
          array={allProducts}
          arrayItem={'Product'}
          fontSize={13}
          SearchStyle={{
            width: windowWidth * 0.95,
            marginLeft: moderateScale(10, 0.3),
          }}
        />

        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            textAlign: 'left',
            width: windowWidth,
            marginTop: moderateVerticalScale(20, 0.6),
            marginLeft: moderateScale(20, 0.3),
          }}>
          Products
        </CustomText>

        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'green',
              height: windowHeight * 0.4,
            }}>
            <ActivityIndicator
              size={moderateScale(45, 0.6)}
              color={Color.themeBlue}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={newData.length == 0 ? allProducts : newData}
            contentContainerStyle={{
              alignSelf: 'center',
              marginTop: moderateScale(5, 0.3),
            }}
            renderItem={({item, index}) => {
              return <Product item={item} />;
            }}
            ListEmptyComponent={() => {
              return (
                <>
                  <View
                    style={{
                      width: windowWidth * 0.79,
                      height: windowHeight * 0.25,
                      marginTop: moderateScale(30, 0.3),
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
                    isBold
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: moderateScale(13, 0.6),
                    }}>
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

export default CustomerDashboard;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.42,
    paddingVertical: moderateScale(10, 0.6),
    borderRadius: moderateScale(15, 0.6),
    marginTop: moderateScale(20, 0.3),
    paddingLeft: moderateScale(15, 0.6),
    paddingTop: moderateScale(10, 0.6),
  },
  categoryContainer: {
    height: windowHeight * 0.09,
    width: windowWidth * 1,
    padding: moderateScale(10, 0.6),
    marginTop: moderateScale(20, 0.3),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
