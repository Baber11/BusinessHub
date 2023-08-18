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
import navigationService from '../navigationService';

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
      price: 12000,
      qty: 1,
      status: 'Processed',
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      selectedColor: '#4e86c2',
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      selectedSize: 'S',
      cotton: 3,
      totalQty: 18,
      date:'2023-8-16',
      images: [
        require('../Assets/Images/Image.png'),
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      buyer:{
        name:'XYZ',
        contact:'439847298',
        address:"Karachi pakistan",
        email:'xyz@gmail.com'

      },
      comments: [
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser.png'),
          time: '2 days ago',
          text: 'I just love love & love my purchase. Highly recommended from my side',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman1.png'),
          time: '2 weeks ago',
          text: 'Excellent Product Same as shown in the photos',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman4.png'),
          time: '3 weeks ago',
          text: 'The quality of this product is very good. I realy like this. My experience with this product is realy good.',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser1.png'),
          time: '2 months ago',
          text: 'Quality is not good',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser2.png'),
          time: '3 weeks ago',
          text: 'Bad service',
        },
      ],
    },
    {
      id: 2,
      date:'2023-8-15',
      orderId: 12392830,
      price: 12000,
      numOfItems: 5,
      status: 'Shipped',
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 3,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: 'M',
      selectedColor: '#313436',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      buyer:{
        name:'XYZ',
        contact:'439847298',
        address:"Karachi pakistan",
        email:'xyz@gmail.com'
        
      },
      comments: [
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser.png'),
          time: '2 days ago',
          text: 'I just love love & love my purchase. Highly recommended from my side',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman1.png'),
          time: '2 weeks ago',
          text: 'Excellent Product Same as shown in the photos',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman4.png'),
          time: '3 weeks ago',
          text: 'The quality of this product is very good. I realy like this. My experience with this product is realy good.',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser1.png'),
          time: '2 months ago',
          text: 'Quality is not good',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser2.png'),
          time: '3 weeks ago',
          text: 'Bad service',
        },
      ],
    },
    {
      id: 3,
      date:'2023-8-12',

      orderId: 1238109238,
      price: 8000,
      numOfItems: 3,
      status: 'Processed',
      Title: 'Oversize Dress',
      subTitle: 'Oversize',

      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 2,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: 'L',
      selectedColor: '#2c4973',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      buyer:{
        name:'XYZ',
        contact:'439847298',
        address:"Karachi pakistan",
        email:'xyz@gmail.com'
        
      },
      comments: [
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser.png'),
          time: '2 days ago',
          text: 'I just love love & love my purchase. Highly recommended from my side',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman1.png'),
          time: '2 weeks ago',
          text: 'Excellent Product Same as shown in the photos',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman4.png'),
          time: '3 weeks ago',
          text: 'The quality of this product is very good. I realy like this. My experience with this product is realy good.',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser1.png'),
          time: '2 months ago',
          text: 'Quality is not good',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser2.png'),
          time: '3 weeks ago',
          text: 'Bad service',
        },
      ],
    },
    {
      id: 4,
      date:'2023-8-9',
      orderId: 2368263789,
      price: 9500,
      numOfItems: 2,
      status: 'Shipped',
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 2,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: 'M',
      selectedColor: '#1ABFBC',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      buyer:{
        name:'XYZ',
        contact:'439847298',
        address:"Karachi pakistan",
        email:'xyz@gmail.com',
      },
      comments: [
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser.png'),
          time: '2 days ago',
          text: 'I just love love & love my purchase. Highly recommended from my side',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman1.png'),
          time: '2 weeks ago',
          text: 'Excellent Product Same as shown in the photos',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman4.png'),
          time: '3 weeks ago',
          text: 'The quality of this product is very good. I realy like this. My experience with this product is realy good.',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser1.png'),
          time: '2 months ago',
          text: 'Quality is not good',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser2.png'),
          time: '3 weeks ago',
          text: 'Bad service',
        },
      ],
    },
  ];

  const previousOrders = [
    {
      id: 1,
      orderId: 3237687,
      price: 1200,
      date:'2023-8-5',
      qty: 1,
      status: 'Delivered',
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      selectedColor: '#4e86c2',
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      selectedSize: 'S',
      cotton: 3,
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      buyer:{
        name:'XYZ',
        contact:'439847298',
        address:"Karachi pakistan",
        email:'xyz@gmail.com',
      },
      comments: [
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser.png'),
          time: '2 days ago',
          text: 'I just love love & love my purchase. Highly recommended from my side',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman1.png'),
          time: '2 weeks ago',
          text: 'Excellent Product Same as shown in the photos',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman4.png'),
          time: '3 weeks ago',
          text: 'The quality of this product is very good. I realy like this. My experience with this product is realy good.',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser1.png'),
          time: '2 months ago',
          text: 'Quality is not good',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser2.png'),
          time: '3 weeks ago',
          text: 'Bad service',
        },
      ],
    },
    {
      id: 2,
      orderId: 12392830,
      date:'2023-8-2',
      price: 12000,
      numOfItems: 5,
      status: 'Cancelled',
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 3,
      buyer:{
        name:'XYZ',
        contact:'439847298',
        address:"Karachi pakistan",
        email:'xyz@gmail.com',
      },
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: 'M',
      selectedColor: '#313436',
      totalQty: 18,
      images: [
        require('../Assets/Images/Image.png'),
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      comments: [
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser.png'),
          time: '2 days ago',
          text: 'I just love love & love my purchase. Highly recommended from my side',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman1.png'),
          time: '2 weeks ago',
          text: 'Excellent Product Same as shown in the photos',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman4.png'),
          time: '3 weeks ago',
          text: 'The quality of this product is very good. I realy like this. My experience with this product is realy good.',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser1.png'),
          time: '2 months ago',
          text: 'Quality is not good',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser2.png'),
          time: '3 weeks ago',
          text: 'Bad service',
        },
      ],
    },
    {
      id: 3,
      orderId: 1238109238,
      price: 8000,
      numOfItems: 3,
      status: 'Delivered',
      Title: 'Oversize Dress',
      date:'2023-7-27',
      subTitle: 'Oversize',

      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 2,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: 'L',
      selectedColor: '#2c4973',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      buyer:{
        name:'XYZ',
        contact:'439847298',
        address:"Karachi pakistan",
        email:'xyz@gmail.com',
      },
      comments: [
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser.png'),
          time: '2 days ago',
          text: 'I just love love & love my purchase. Highly recommended from my side',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman1.png'),
          time: '2 weeks ago',
          text: 'Excellent Product Same as shown in the photos',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman4.png'),
          time: '3 weeks ago',
          text: 'The quality of this product is very good. I realy like this. My experience with this product is realy good.',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser1.png'),
          time: '2 months ago',
          text: 'Quality is not good',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser2.png'),
          time: '3 weeks ago',
          text: 'Bad service',
        },
      ],
    },
    {
      id: 4,
      orderId: 2368263789,
      date:'2023-7-24',
      price: 9500,
      numOfItems: 2,
      status: 'Cancelled',
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 2,
      colors: [
        '#4e86c2',
        '#2c4973',
        '#1ABFBC',
        '#C8CDD2',
        '#ECECEC',
        '#313436',
      ],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      cotton: 1,
      selectedSize: '#1ABFBC',
      selectedColor: 'M',
      totalQty: 18,
      buyer:{
        name:'XYZ',
        contact:'439847298',
        address:"Karachi pakistan",
        email:'xyz@gmail.com',
      },
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      comments: [
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser.png'),
          time: '2 days ago',
          text: 'I just love love & love my purchase. Highly recommended from my side',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman1.png'),
          time: '2 weeks ago',
          text: 'Excellent Product Same as shown in the photos',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyman4.png'),
          time: '3 weeks ago',
          text: 'The quality of this product is very good. I realy like this. My experience with this product is realy good.',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser1.png'),
          time: '2 months ago',
          text: 'Quality is not good',
        },
        {
          userName: 'ABC',
          image: require('../Assets/Images/dummyUser2.png'),
          time: '3 weeks ago',
          text: 'Bad service',
        },
      ],
    },
  ];

  return (
    <>
      <CustomStatusBar
        backgroundColor={['#CBE4E8', '#D2E4E4']}
        barStyle={'dark-content'}
      />
      <Header headerColor={['#CBE4E8', '#D2E4E4']}  />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
          backgroundColor: '#CBE4E8',
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
            // padding: moderateScale(10, 0.6),
            alignItems: 'center',
            flexDirection: 'row',
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
            marginLeft: moderateScale(20, 0.3),
          }}>
          History
        </CustomText>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={previousOrders}
          contentContainerStyle={{
            // backgroundColor:'black',
            width:windowWidth,
            alignSelf: 'center',
            alignItems:'center',
            marginTop: moderateScale(10, 0.3),
          }}
          renderItem={({item, index}) => {
            return (
              <OrderCard
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
          backgroundColor: 'white',
          // marginRight: moderateScale(10, 0.3),
          marginHorizontal:moderateScale(10,.3),
          width: windowWidth * 0.95,
          height: windowHeight * 0.15,
          borderRadius: moderateScale(20, 0.6),
          flexDirection: 'row',
          marginVertical: moderateScale(10, 0.6),
        }}
        onPress={() => {
          navigationService.navigate('OrderDetails', {item: item, details:true});
        }}>
        <View
          style={{
            width: windowWidth * 0.2,
            height: windowHeight * 0.12,
            marginLeft: moderateScale(10, 0.3),
            backgroundColor: 'black',
            borderRadius: moderateScale(10, 0.6),
            overflow: 'hidden',
          }}>
          <CustomImage
            source={item?.images[0]}
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
                fontSize: moderateScale(12, 0.6),
              }}
              isBold>
              Order ID : {item?.orderId}
            </CustomText>
            <CustomText
              style={{
                // width: windowWidth * 0.3,
                // right: -10,
                textAlign: 'center',
                fontSize: moderateScale(12, 0.6),
                borderRadius: moderateScale(10, 0.6),
                padding: moderateScale(5, 0.6),
                // position: 'absolute',
                // top: -15,
                
                color: Color.veryLightGray,
              }}
              isBold>
              {moment(item?.date).fromNow()}
            </CustomText>
          </View>

          <CustomText
            style={{
              textAlign: 'left',
              color: Color.black,
              width: windowWidth * 0.3,
              fontSize: moderateScale(12, 0.6),
            }}
            isBold>
            Qty : {item?.qty}
          </CustomText>
          <CustomText
            style={{
              textAlign: 'left',
              color: Color.black,
              marginTop: moderateScale(5, 0.3),
              fontSize: moderateScale(12, 0.6),
              width: windowWidth * 0.28,
            }}
            isBold>
            {item?.price} Rs
          </CustomText>
        </View>
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
