import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
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
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomTable from '../Components/CustomTable';
import moment from 'moment';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import Product from '../Components/Product';
import navigationService from '../navigationService';
import CustomButton from '../Components/CustomButton';
import Entypo from 'react-native-vector-icons/Entypo';

const Orders = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const orders = useSelector(state => state.commonReducer.order);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedTab, setSelectedTab] = useState('Products');
  const [myOrder, setMyOrder] = useState([]);
  console.log(
    '🚀 ~ file: Orders.js:44 ~ Orders ~ myOrder:',
    myOrder[0]?.created_at,
  );
  const [serviceOrder, setServiceOrder] = useState([]);
  console.log('🚀 ~ file: Orders.js:46 ~ Orders ~ serviceOrder:', serviceOrder);

  const navigation = useNavigation();
  const oneDayAgo = moment().subtract(1, 'day');

  const dateDiff = item => {
    console.log('🚀 ~ file: Orders.js:73 ~ dateDiff ~ item:', item);
    const currentDate = moment();
    const newDate = moment(item);
    console.log('Date difference=========', currentDate.diff(newDate, 'h'));
    return currentDate.diff(newDate, 'h');
  };

  const getSellerOrders = async () => {
    const url = 'auth/vendor/order/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);

    if (response != undefined) {
      console.log(
        '🚀 ~ file: Orders.js:76 ~ getSellerOrders ~ response:',
        response?.data,
      );
      setMyOrder(response?.data?.orders);
    }
  };
  const getSellerServices = async () => {
    const url = 'auth/vendor/services/book/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);

    if (response != undefined) {
      return setServiceOrder(response?.data?.data);
    }
  };

  useEffect(() => {
    getSellerOrders();
    getSellerServices();

    // Orders();
  }, [orders]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={['#CBE4E8', '#D2E4E4']}
        barStyle={'dark-content'}
      />
      <Header headerColor={['#fff', '#fff']} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
          backgroundColor: Color.white,
          minHeight: windowHeight * 0.9,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.7,
              borderWidth: 1,
              borderColor: Color.themeBlue,
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
                color: selectedTab == 'Products' ? 'white' : Color.themeBlue,
                backgroundColor:
                  selectedTab == 'Products' ? Color.themeBlue : 'transparent',
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
                color: selectedTab == 'Services' ? 'white' : Color.themeBlue,
                backgroundColor:
                  selectedTab == 'Services' ? Color.themeBlue : 'transparent',
              }}
              onPress={() => {
                setSelectedTab('Services');
              }}>
              Services
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth,
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10, 0.6),

              alignItems: 'center',
            }}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(20, 0.6),
                paddingVertical: moderateScale(10, 0.6),

                width: windowWidth * 0.4,
              }}>
              Latest Orders
            </CustomText>
          </View>
          {isLoading ? (
            <View
              style={{
                height: windowHeight * 0.1,
                width: windowWidth * 0.9,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                color={Color.themeBlue}
                size={moderateScale(30, 0.6)}
              />
            </View>
          ) : (
            <FlatList
              numColumns={1}
              data={
                selectedTab == 'Products'
                  ? myOrder
                      .filter(item => dateDiff(item.created_at) < 48)
                      .reverse()
                  : serviceOrder
                      .filter(item => item?.status != 'rejected' && dateDiff(item?.created_at) < 48)
                      .reverse()
              }
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{
                paddingHorizontal: moderateScale(10, 0.6),
                alignItems: 'center',
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      width: windowWidth * 0.7,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        width: windowWidth * 0.6,
                        height: windowHeight * 0.2,
                        alignSelf: 'center',
                        marginTop: moderateScale(10, 0.3),
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
                        fontSize: moderateScale(13, 0.6),
                      }}>
                      DATA NOT ADDED YET
                    </CustomText>
                  </View>
                );
              }}
              renderItem={({item, index}) => {
                return (
                  // <MyOrderCard item={item} />
                  <View style={{}}>
                    <OrderCard
                      item={item}
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      width={windowWidth * 0.85}
                      selectedTab={selectedTab}
                    />
                    {selectedTab == 'Services' && item?.status == 'pending' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          // marginTop: moderateScale(5, 0.3),
                          // backgroundColor: 'red',
                          width: windowWidth * 0.6,
                          alignSelf: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <CustomButton
                          onPress={async () => {
                            const url = `auth/services/book/status/${item?.id}`;
                            const body = {status: 'accepted'};
                            const response = await Post(
                              url,
                              body,
                              apiHeader(token),
                            );
                            if (response != undefined) {
                              console.log(
                                '🚀 ~ file: Orders.js:304 ~ onPress={ ~ response:',
                                response?.data,
                              );
                              getSellerServices();
                            }
                          }}
                          text={'Accept'}
                          textColor={Color.white}
                          // iconName={'pencil'}
                          // iconType={Entypo}
                          width={windowWidth * 0.28}
                          height={windowHeight * 0.04}
                          fontSize={moderateScale(12, 0.6)}
                          marginTop={moderateScale(4, 0.3)}
                          bgColor={Color.themeBlue}
                          borderRadius={moderateScale(20, 0.3)}
                          iconStyle={{
                            fontSize: moderateScale(14, 0.6),
                          }}
                          // marginRight={moderateScale(5, 0.3)}
                          isBold
                        />
                        <CustomButton
                          onPress={async () => {
                            const url = `auth/services/book/status/${item?.id}`;
                            const body = {status: 'rejected'};
                            const response = await Post(
                              url,
                              body,
                              apiHeader(token),
                            );
                            if (response != undefined) {
                              console.log(
                                '🚀 ~ file: Orders.js:304 ~ onPress={ ~ response:',
                                response?.data,
                              );
                              getSellerServices();
                            }
                          }}
                          text={'Reject'}
                          textColor={Color.white}
                          // iconName={'pencil'}
                          // iconType={Entypo}
                          width={windowWidth * 0.28}
                          height={windowHeight * 0.04}
                          fontSize={moderateScale(12, 0.6)}
                          marginTop={moderateScale(4, 0.3)}
                          bgColor={Color.themeBlue}
                          borderRadius={moderateScale(20, 0.3)}
                          iconStyle={{
                            fontSize: moderateScale(14, 0.6),
                          }}
                          // marginRight={moderateScale(5, 0.3)}
                          isBold
                        />
                      </View>
                    )}
                  </View>
                );
              }}
            />
          )}
        </View>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            // marginLeft: moderateScale(20, 0.3),
            // backgroundColor:'black',
            width: windowWidth,
            paddingHorizontal: moderateScale(10, 0.5),
            marginTop: moderateScale(10, 0.3),
          }}>
          History
        </CustomText>

        {isLoading ? (
          <View
            style={{
              height: windowHeight * 0.5,
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
            numColumns={1}
            data={
              selectedTab == 'Products'
                ? myOrder
                    .filter(item => dateDiff(item?.created_at) >= 48)
                    .reverse()
                : serviceOrder
                    .filter(item => dateDiff(item?.created_at) >= 48 || item?.status =='rejected')
                    .reverse()
            }
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: moderateScale(10, 0.3),
            }}
            renderItem={({item, index}) => {
              return (
                <OrderCard
                  item={item}
                  selectedOrder={selectedOrder}
                  setSelectedOrder={setSelectedOrder}
                  selectedTab={selectedTab}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <>
                  <View
                    style={{
                      width: windowWidth * 0.8,
                      height: windowHeight * 0.3,
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
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: moderateScale(13, 0.6),
                      marginTop: moderateScale(-15, 0.3),
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

export default Orders;

const OrderCard = ({item, width, selectedTab}) => {
  console.log('🚀 ~ file: Orders.js:349 ~ OrderCard ~ item:', item);
  return (
    <View
      key={item?.id}
      style={{
        marginBottom: moderateScale(10, 0.3),
        width: width ? width : windowWidth * 0.95,
        paddingVertical: moderateScale(10, 0.6),
        marginHorizontal: moderateScale(5, 0.3),
        backgroundColor: '#f9fafd',
        borderRadius: moderateScale(20, 0.3),
        marginTop: moderateScale(12, 0.3),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15, 0.6),
        // marginVertical: moderateScale(10, 0.6),

        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        // marginBottom : moderateScale(10,0.3)
      }}>
      {selectedTab == 'Services' && (
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 10,
            // padding:moderateScale(5,.6),
            borderRadius: moderateScale(10, 0.6),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomText style={{fontSize: moderateScale(8, 0.6)}}>
            {item?.status}
          </CustomText>
          <View
            style={{
              height: moderateScale(5, 0.6),
              width: moderateScale(5, 0.6),
              borderRadius: moderateScale(5, 0.6) / 2,
              marginLeft: moderateScale(3, 0.3),
              backgroundColor:
                item?.status == 'accepted'
                  ? 'green'
                  : item?.status == 'pending'
                  ? 'orange'
                  : 'red',
            }}></View>
        </View>
      )}
      <View
        style={{
          width: windowWidth * 0.2,
          height: windowWidth * 0.2,
          borderRadius: (windowWidth * 0.2) / 2,
          borderWidth: 1,
          borderColor: Color.themeBlue,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}>
        <CustomImage
          source={require('../Assets/Images/logo.png')}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode={'cover'}
        />
      </View>

      <View
        style={{
          width: windowWidth * 0.4,
          justifyContent: 'center',
          marginLeft: moderateScale(10, 0.3),
        }}>
        <CustomText
          // isBold
          numberOfLines={1}
          style={{
            // backgroundColor: 'red',
            width: windowWidth * 0.5,
            color: '#2f2f2f',
            fontSize: moderateScale(13, 0.6),
          }}>
          Order Id :
          {item?.order?.orderId ? item?.order?.orderId : item?.order_id}
        </CustomText>
        {item?.product_quantity || item?.qty ? (
          <CustomText
            numberOfLines={1}
            style={{
              color: '#000',
              fontSize: moderateScale(12, 0.6),
            }}>
            Quantity :
            {item?.product_quantity ? item?.product_quantity : item?.qty}
          </CustomText>
        ) : (
          <CustomText
            numberOfLines={1}
            style={{
              color: '#000',
              fontSize: moderateScale(12, 0.6),
            }}>
            Service : {item?.service?.shop_name}
          </CustomText>
        )}

        <CustomText
          numberOfLines={1}
          style={{
            color: '#000',
            fontSize: moderateScale(15, 0.6),
          }}>
          Price : PKR
          {item.total ? item?.total : item?.price ? item?.price : item?.charges}
        </CustomText>
      </View>
      <CustomText
        isBold
        onPress={() => {
          if (selectedTab == 'Products') {
            navigationService.navigate('OrderDetails', {
              item: item,
              details: false,
            });
          } else {
            navigationService.navigate('ServiceDetails', {
              item: item,
              details: false,
              seller: true,
            });
          }
        }}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          color: '#000',
          fontSize: moderateScale(12, 0.6),
        }}>
        Details
      </CustomText>
    </View>
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

// const OrderCard = ({item, width}) => {
//   // console.log('🚀 ~ file: Orders.js:708 ~ OrderCard ~ item:', item);
//   return (
//     <>
//       <TouchableOpacity
//
//         style={{
//           alignItems: 'center',
//           backgroundColor: 'white',
//           // marginRight: moderateScale(10, 0.3),
//           marginHorizontal: moderateScale(10, 0.3),
//           width: width,
//           height: windowHeight * 0.15,
//           borderRadius: moderateScale(20, 0.6),
//           flexDirection: 'row',
//           marginVertical: moderateScale(10, 0.6),
//         }}
//         onPress={() => {
//           navigationService.navigate('OrderDetails', {
//             item: item,
//             details: false,
//           });
//         }}>
//         <View
//           style={{
//             width: windowWidth * 0.2,
//             height: windowWidth * 0.2,
//             borderRadius: (windowWidth * 0.2) / 2,

//             marginLeft: moderateScale(10, 0.3),
//             overflow: 'hidden',
//             // backgroundColor: 'gray',
//             borderRadius: moderateScale(10, 0.6),
//             overflow: 'hidden',
//           }}>
//           <CustomImage
//             source={require('../Assets/Images/logo.png')}
//             style={{width: '100%', height: '100%'}}
//             resizeMode={'cover'}
//           />
//         </View>
//         <View
//           style={{
//             marginLeft: moderateScale(20, 0.3),
//             width: windowWidth * 0.6,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               // marginBottom:moderateScale(10,.3),
//             }}>
//             <CustomText
//               style={{
//                 textAlign: 'left',
//                 color: 'black',
//                 fontSize: moderateScale(14, 0.6),
//               }}>
//               Order ID :{Math.floor(Math.random() * 1000000000)}
//             </CustomText>
//           </View>

//           <CustomText
//             style={{
//               textAlign: 'left',
//               color: Color.black,
//               width: windowWidth * 0.3,
//               fontSize: moderateScale(13, 0.6),
//             }}
//             isBold>
//             Quantity : {item?.qty}
//           </CustomText>
//           <CustomText
//             style={{
//               textAlign: 'left',
//               color: Color.black,
//               marginTop: moderateScale(5, 0.3),
//               fontSize: moderateScale(13, 0.6),
//               width: windowWidth * 0.28,
//             }}>
//             {item?.price * item?.qty} Rs
//           </CustomText>
//         </View>
//         <CustomText
//           style={{
//             position: 'absolute',
//             top: 5,
//             right: 10,
//             textAlign: 'center',
//             fontSize: moderateScale(12, 0.6),
//             borderRadius: moderateScale(10, 0.6),
//             padding: moderateScale(5, 0.6),
//             color: Color.veryLightGray,
//           }}>
//           {moment(item?.date).fromNow()}
//         </CustomText>
//       </TouchableOpacity>
//     </>
//   );
// };
