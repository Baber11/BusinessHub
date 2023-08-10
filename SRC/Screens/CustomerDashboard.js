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

const CustomerDashboard = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ file: HomeScreen.js:25 ~ HomeScreen ~ userData:', userData);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const [selectedService, setSelectedService] = useState('');
  console.log(
    '🚀 ~ file: HomeScreen.js:27 ~ HomeScreen ~ isFocused:',
    isFocused,
  );

  const Services = [
    {
      name: 'All',
      image2: require('../Assets/Images/menu.png'),
      image: require('../Assets/Images/menu1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'Dress',
      image: require('../Assets/Images/dress.png'),
      image2: require('../Assets/Images/dress1.png'),
      onPress: () => {
        console.log('here');
        navigationService.navigate('Dresses');
      },
    },
    {
      name: 'T-shirt',
      image: require('../Assets/Images/tshirt.png'),
      image2: require('../Assets/Images/tshirt1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'jeans',
      image: require('../Assets/Images/jeans.png'),
      image2: require('../Assets/Images/jeans1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'shoes',
      image: require('../Assets/Images/shoes.png'),
      image2: require('../Assets/Images/shoes1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'shoes',
      image: require('../Assets/Images/shoes.png'),
      image2: require('../Assets/Images/shoes1.png'),
      onPress: () => {
        console.log('here');
      },
    },
    {
      name: 'shoes',
      image: require('../Assets/Images/shoes.png'),
      image2: require('../Assets/Images/shoes1.png'),
      onPress: () => {
        console.log('here');
      },
    },
  ];

  const newArrivals = [
    {
      id: 1,
      Title: 'Oversize Dress',
      subTitle: 'Oversize',
      price: 14.0,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 1,
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
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
    {
      id: 2,
      Title: 'Blue Dress',
      subTitle: 'Slim Fit',
      price: 15.0,
      img: require('../Assets/Images/Image.png'),
      like: false,
      qty: 1,
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
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Image.png'),
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
    {
      id: 3,
      Title: 'Elegant Dress',
      subTitle: 'Slim Fit',
      price: 4.5,
      img: require('../Assets/Images/image3.png'),
      like: true,
      qty: 1,
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
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
    {
      id: 4,
      Title: 'White Dress',
      subTitle: 'Oversize',
      price: 6.9,
      img: require('../Assets/Images/Image.png'),
      like: true,
      sale: '30% off',
      qty: 1,
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
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Mask3.png'),
        require('../Assets/Images/Image.png'),
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
    },
    {
      id: 5,
      Title: 'Red Dress',
      subTitle: 'Oversize',
      price: 8.94,
      img: require('../Assets/Images/Image.png'),
      like: false,
      qty: 1,
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
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [require('../Assets/Images/Mask2.png')],
    },
    {
      id: 6,
      Title: 'Black Dress',
      subTitle: 'Oversize',
      price: 18.5,
      img: require('../Assets/Images/Image.png'),
      like: true,
      qty: 1,
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
      selectedSize: '',
      selectedColor: '',
      totalQty: 18,
      images: [
        require('../Assets/Images/Image.png'),
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
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
        paddingBottom:moderateScale(60,.3)
      }}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            marginTop: moderateVerticalScale(20, 0.6),
            marginLeft: moderateScale(20, 0.3),
          }}>
          Services
        </CustomText>
        <ScrollView
          contentContainerStyle={{
            height: windowHeight * 0.12,
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
          {Services.map((item, index) => {
            console.log(
              '🚀 ~ file: HomeScreen.js:146 ~ {categories.map ~ item:',
              item,
            );
            return (
              <>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    //  width: windowWidth * 0.16,
                    marginHorizontal: moderateScale(10, 0.3),
                    // justifyContent:'center'
                    // backgroundColor:'black'
                  }}
                  onPress={item?.onPress}>
                  <LinearGradient
                    style={{
                      height: moderateScale(52, 0.6),
                      width: moderateScale(52, 0.6),
                      borderRadius: moderateScale(10, 0.6),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    colors={
                      selectedService == item?.name
                        ? Color.themeBgColor
                        : ['#CBE4E8', 'white']
                    }>
                    <CustomImage
                      source={
                        selectedService == item?.name
                          ? item?.image2
                          : item?.image
                      }
                      // style={{}}
                      resizeMode={'cover'}
                      onPress={() => {
                        setSelectedService(item?.name);
                        item?.onPress();
                      }}
                    />
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
          Products
        </CustomText>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={newArrivals}
          contentContainerStyle={{
            alignSelf: 'center',
            marginTop: moderateScale(5, 0.3),
          }}
          renderItem={({item, index}) => {
            return <Product item={item} />;
          }}
        />
      </ScrollView>
    </>
  );
};

export default CustomerDashboard;

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
