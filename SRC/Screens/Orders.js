import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
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
import CustomTable from '../Components/CustomTable';
import moment from 'moment';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import Product from '../Components/Product';
import navigationService from '../navigationService';

const Orders = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ file: HomeScreen.js:25 ~ HomeScreen ~ userData:', userData);
  const orders = useSelector(state => state.commonReducer.order);
  // console.log('🚀 ~ file: Orders.js:30 ~ orders:', orders);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const [selectedOrder, setSelectedOrder] = useState('');
  const [myOrder, setMyOrder] = useState([]);
  console.log('🚀 ~ file: Orders.js:39 ~ myOrder:', myOrder);
  const navigation = useNavigation();
  // console.log(
  //   '🚀 ~ file: HomeScreen.js:27 ~ HomeScreen ~ isFocused:',
  //   isFocused,
  // );
  const oneDayAgo = moment().subtract(1, 'day');

  const Orders = () => {
    orders.map(item =>
      item.order.map(
        order =>
          order?.sellerId == userData?.id &&
          setMyOrder(prev => [...prev, order]),
      ),
    );
  };

  const twentyFourHoursAgo = moment().subtract(24, 'hours');

  // const ordersPlacedInPast24Hours = orders.filter(order => {
  //   const orderDate = moment(order.orderDate);
  //   return orderDate.isAfter(twentyFourHoursAgo);
  // });
  // console.log("🚀 ~ file: Orders.js:66 ~ ordersPlacedInPast24Hours ~ ordersPlacedInPast24Hours:", ordersPlacedInPast24Hours)

  useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );
    // getOrders();
    Orders();
    return () => backhandler.remove();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={['#CBE4E8', '#D2E4E4']}
        barStyle={'dark-content'}
      />
      <Header headerColor={['#CBE4E8', '#D2E4E4']} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
          backgroundColor: '#CBE4E8',
          minHeight: windowHeight * 0.9,
        }}>
        <View
          style={{
            height: windowHeight * 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              marginTop: moderateVerticalScale(20, 0.6),
              width: windowWidth,
              paddingHorizontal: moderateScale(10, 0.6),
            }}>
            Latest Orders
          </CustomText>

          <FlatList
            numColumns={1}
            data={myOrder}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{
              // backgroundColor:'black',
              // height: windowHeight * 0.2,
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
                      marginTop:moderateScale(10,0.3)
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
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: moderateScale(13, 0.6),
                    }}>
                    ERROR 404 DATA NOT FOUND
                  </CustomText>
                </View>
              );
            }}
            renderItem={({item, index}) => {
              // console.log(
              //   '🚀 ~ file: Orders.js:691 ~ {orders?.map ~ item:',
              //   item,
              // );
              return (
                <OrderCard
                  item={item}
                  selectedOrder={selectedOrder}
                  setSelectedOrder={setSelectedOrder}
                />
              );
            }}
          />
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

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={myOrder}
          contentContainerStyle={{
            // backgroundColor:'black',
            // width:windowWidth,
            // alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: moderateScale(10, 0.3),
          }}
          renderItem={({item, index}) => {
            // console.log(
            //   '🚀 ~ file: Orders.js:691 ~ {orders?.map ~ item:',
            //   item,
            // );
            return (
              <OrderCard
                item={item}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
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
                    source={require('../Assets/Images/4.png')}
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
                  ERROR 404 DATA NOT FOUND
                </CustomText>
              </>
            );
          }}
        />
      </ScrollView>
    </>
  );
};

export default Orders;

const OrderCard = ({item}) => {
  // console.log('🚀 ~ file: Orders.js:708 ~ OrderCard ~ item:', item);
  return (
    <>
      <TouchableOpacity
        key={item?.id}
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          // marginRight: moderateScale(10, 0.3),
          marginHorizontal: moderateScale(10, 0.3),
          width: windowWidth * 0.95,
          height: windowHeight * 0.15,
          borderRadius: moderateScale(20, 0.6),
          flexDirection: 'row',
          marginVertical: moderateScale(10, 0.6),
        }}
        onPress={() => {
          navigationService.navigate('OrderDetails', {
            item: item,
            details: false,
          });
        }}>
        <View
          style={{
            width: windowWidth * 0.2,
            height: windowWidth * 0.2,
            borderRadius: (windowWidth * 0.2) / 2,

            marginLeft: moderateScale(10, 0.3),
            overflow: 'hidden',
            // backgroundColor: 'gray',
            borderRadius: moderateScale(10, 0.6),
            overflow: 'hidden',
          }}>
          <CustomImage
            source={require('../Assets/Images/logo.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'cover'}
          />
        </View>
        <View
          style={{
            marginLeft: moderateScale(20, 0.3),
            width: windowWidth * 0.6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // marginBottom:moderateScale(10,.3),
            }}>
            <CustomText
              style={{
                textAlign: 'left',
                color: 'black',
                fontSize: moderateScale(14, 0.6),
              }}>
              Order ID :{Math.floor(Math.random() * 1000000000)}
            </CustomText>
          </View>

          <CustomText
            style={{
              textAlign: 'left',
              color: Color.black,
              width: windowWidth * 0.3,
              fontSize: moderateScale(13, 0.6),
            }}
            isBold>
            Quantity : {item?.qty}
          </CustomText>
          <CustomText
            style={{
              textAlign: 'left',
              color: Color.black,
              marginTop: moderateScale(5, 0.3),
              fontSize: moderateScale(13, 0.6),
              width: windowWidth * 0.28,
            }}>
            {item?.price * item?.qty} Rs
          </CustomText>
        </View>
        <CustomText
          style={{
            position: 'absolute',
            top: 5,
            right: 10,
            textAlign: 'center',
            fontSize: moderateScale(12, 0.6),
            borderRadius: moderateScale(10, 0.6),
            padding: moderateScale(5, 0.6),
            color: Color.veryLightGray,
          }}>
          {moment(item?.date).fromNow()}
        </CustomText>
      </TouchableOpacity>
    </>
  );
};

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
