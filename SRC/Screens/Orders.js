import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {useIsFocused} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import Product from '../Components/Product';

const Orders = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ file: HomeScreen.js:25 ~ HomeScreen ~ userData:', userData);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const [selectedOrder, setSelectedOrder] = useState('');
  console.log(
    '🚀 ~ file: HomeScreen.js:27 ~ HomeScreen ~ isFocused:',
    isFocused,
  );

  const latestOrders = [
    {
      id: 1,
      orderId: 3237687,
      price: 1200,
      numOfItems: 1,
      status: 'Processed',
    },
    {
      id: 2,
      orderId: 12392830,
      price: 12000,
      numOfItems: 5,
      status: 'Shipped',
    },
    {
      id: 3,
      orderId: 1238109238,
      price: 8000,
      numOfItems: 3,
      status: 'Processed',
    },
    {
      id: 4,
      orderId: 2368263789,
      price: 9500,
      numOfItems: 2,
      status: 'Shipped',
    },
  ];

  const previousOrders = [
    {
      id: 1,
      orderId: 1283791,
      price: 300,
      numOfItems: 2,
      status: 'Delivered',
    },
    {
      id: 2,
      orderId: 171928378,
      price: 12000,
      status: 'Cancelled',
      numOfItems: 6,
    },
    {
      id: 3,
      orderId: 3264874,
      price: 1200,
      numOfItems: 1,
      status: 'Delivered',
    },
    {
      id: 4,
      orderId: 37428377,
      price: 17000,
      numOfItems: 8,
      status: 'Delivered',
    },
  ];

  return (
    <>
      <CustomStatusBar
        backgroundColor={['#CBE4E8', '#D2E4E4']}
        barStyle={'dark-content'}
      />
      <Header headerColor={['#CBE4E8', '#D2E4E4']} cart />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
        }}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            marginTop: moderateVerticalScale(20, 0.6),
            marginLeft: moderateScale(20, 0.3),
          }}>
          Latest Orders
        </CustomText>
        <ScrollView
          contentContainerStyle={{
            // height: windowHeight * 0.12,
            // width: windowWidth * 1,
            padding: moderateScale(10, 0.6),
            marginTop: moderateScale(20, 0.3),
            alignItems: 'center',

            flexDirection: 'row',
            // backgroundColor:'purple',
            // marginBottom: moderateScale(60, 0.3),
            // justifyContent: 'space-between',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          // style={styles.categoryContainer}
        >
          {latestOrders.map((item, index) => {
            console.log(
              '🚀 ~ file: HomeScreen.js:146 ~ {categories.map ~ item:',
              item,
            );
            return (
              <OrderCard
                item={item}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
              />
            );
          })}
        </ScrollView>

        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            marginTop: moderateVerticalScale(20, 0.6),
            marginLeft: moderateScale(20, 0.3),
            // backgroundColor:'black'
          }}>
          History
        </CustomText>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={previousOrders}
          contentContainerStyle={{
            alignSelf: 'center',
            marginTop: moderateScale(10, 0.3),
            // backgroundColor:'black'
          }}
          renderItem={({item, index}) => {
            return (
              <OrderCard2
                item={item}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
              />
            );
          }}
        />
      </ScrollView>
    </>
  );
};

export default Orders;

const OrderCard = ({item}) => {
  return (
    <>
      <TouchableOpacity
        key={item?.id}
        style={{
          alignItems: 'center',
          marginHorizontal: moderateScale(10, 0.3),
          borderRadius: moderateScale(20, 0.6),
        }}
        onPress={item?.onPress}>
        <LinearGradient
          style={{
            // height: windowHeight * 0.25,
            width: windowWidth * 0.6,
            borderRadius: moderateScale(20, 0.6),
            alignItems: 'center',
            
            //   justifyContent: 'center',
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={
            item?.status =='Processed'
              ? [Color.blue, 'white']
              : [Color.orange, 'white']
          }>
          <CustomText
            style={{
              //   width: windowWidth * 0.14,
              marginTop: moderateScale(10, 0.3),
              textAlign: 'center',
              fontSize: moderateScale(20, 0.6),
              color: 'black',
            }}
            isBold>
            {` Order No ${item?.orderId}`}
          </CustomText>
          <CustomText
            style={{
              //   width: windowWidth * 0.14,
              textAlign: 'center',
              color: Color.darkGray,
              fontSize: moderateScale(30, 0.6),
            }}>
            {item?.numOfItems}
          </CustomText>
          <CustomText
            style={{
              //   width: windowWidth * 0.14,
              textAlign: 'center',
              color: 'black',
              fontSize: moderateScale(15, 0.6),
            }}
            >
            items
          </CustomText>
          <CustomText
            style={{
              textAlign: 'center',
              color: Color.black,
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(15, 0.6),
            }}
            isBold
            >
            Spent {item?.price}$
          </CustomText>
          <CustomText
            style={{
              textAlign: 'center',
              color: item?.status =='Processed' ? Color.blue : Color.orange,
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(15, 0.6),
              marginBottom: moderateScale(10, 0.6),
            }}
            isBold
            >
            {item?.status}
          </CustomText>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};
const OrderCard2 = ({item, selectedOrder, setSelectedOrder, width}) => {
  return (
    <>
      <TouchableOpacity
        key={item?.id}
        style={{
          alignItems: 'center',
          marginHorizontal: moderateScale(10, 0.3),
          borderRadius: moderateScale(20, 0.6),
        }}
        onPress={item?.onPress}>
        <LinearGradient
          style={{
            // height: windowHeight * 0.22,
            width: windowWidth * 0.44,
            borderRadius: moderateScale(20, 0.6),
            alignItems: 'center',

            //   justifyContent: 'center',
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={
            item?.status =='Cancelled'
              ? [Color.red, 'white']
              : [Color.green, 'white']
          }>
          <CustomText
            style={{
              //   width: windowWidth * 0.14,
              marginTop: moderateScale(10, 0.3),
              textAlign: 'center',
              fontSize: moderateScale(15, 0.6),
              color: 'black',
            }}
            isBold>
            {` Order No ${item?.orderId}`}
          </CustomText>
          <CustomText
            style={{
              //   width: windowWidth * 0.14,
              textAlign: 'center',
              color: Color.darkGray,
              fontSize: moderateScale(30, 0.6),
            }}>
            {item?.numOfItems}
          </CustomText>
          <CustomText
            style={{
              //   width: windowWidth * 0.14,
              textAlign: 'center',
              color: Color.black,
              fontSize: moderateScale(15, 0.6),
            }}
           >
            items
          </CustomText>
          <CustomText
            style={{
              textAlign: 'center',
              color: Color.black,
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(15, 0.6),
            }}
            isBold
            >
            Spent {item?.price}$
          </CustomText>
          <CustomText
            style={{
              textAlign: 'center',
              color: item?.status == 'Cancelled' ? 'red' :'green',
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(15, 0.6),
              marginBottom: moderateScale(10, 0.6),
            }}
            isBold>
            {item?.status}
          </CustomText>
        </LinearGradient>
        <CustomText
          style={{
            width: windowWidth * 0.14,
            textAlign: 'center',
            color: 'black',
          }}>
          {item?.name}
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
