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
import SearchbarComponent from '../Components/SearchbarComponent';
import CustomButton from '../Components/CustomButton';
import Entypo from 'react-native-vector-icons/Entypo'
// import SearchbarComponent from '../Components/SearchbarComponent';

const CustomerDashboard = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  // console.log('🚀 ~ file: HomeScreen.js:25 ~ HomeScreen ~ userData:', userData);
  const sellerServices = useSelector(state => state.commonReducer.sellerService)
  console.log("🚀 ~ file: CustomerDashboard.js:38 ~ sellerServices:", sellerServices)
  const sellerProducts = useSelector(state=> state.commonReducer.sellerProducts)
  const navigation = useNavigation();
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
      id: 1,
      Title: 'Stitching',
      subTitle: 'stiching',
      price: 200,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      image: require('../Assets/Images/dummyman4.png'),
      images: [
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      onPress: () => {
        console.log('here');
        navigationService.navigate('Dresses');
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
      subTitle: 'stiching',
      Title: 'Painting',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      price: 300,
      image: require('../Assets/Images/dummyUser2.png'),
      images: [
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      onPress: () => {
        console.log('here');
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
      subTitle: 'stiching',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      Title: 'jeans',
      price: 600,
      image: require('../Assets/Images/dummyman1.png'),
      images: [
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      onPress: () => {
        console.log('here');
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
      subTitle: 'stiching',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      Title: 'shoes',
      price: 400,
      image: require('../Assets/Images/dummyUser1.png'),
      images: [
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
      ],

      onPress: () => {
        console.log('here');
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
      id: 5,
      subTitle: 'stiching',
      Title: 'shoes',
      price: 450,
      image: require('../Assets/Images/dummyman4.png'),
      images: [
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
      ],

      onPress: () => {
        console.log('here');
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
  const [newData, setNewData] = useState(sellerProducts);
  // console.log('🚀 ~ file: CustomerDashboard.js:646 ~ newData:', newData);

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

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />
      <Header headerColor={['#D2E4E4', '#D2E4E4']} cart />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
          alignItems:'center'
        }}
        style={{
          minHeight: windowHeight * 0.9,
          backgroundColor: '#D2E4E4',
        }}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            textAlign:'left',
            width:windowWidth,
            marginTop: moderateVerticalScale(20, 0.6),
            marginLeft: moderateScale(20, 0.3),
          }}>
          Services
        </CustomText>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: moderateScale(10, 0.6),
            // marginTop: moderateScale(10, 0.3),
            alignItems: 'center',

            flexDirection: 'row',
            marginBottom:moderateScale(10,.6)
            // backgroundColor:'purple',
            // marginBottom: moderateScale(60, 0.3),
            // justifyContent: 'space-between',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          // style={styles.categoryContainer}
        >
          {sellerServices.map((item, index) => {
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
                      source={{uri: item?.images[0]?.image?.uri}}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode={'stretch'}
                      onPress={() => {
                        setSelectedService(item?.Title);
                        // item?.onPress();
                        navigationService.navigate('ServiceDetails',{item});
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: moderateScale(10, 0.3),
                      justifyContent:'center'
                      // backgroundColor:'black'
                    }}>
                    <CustomText
                      numberOfLines={1}
                      style={{
                        fontSize: moderateScale(16, 0.6),
                        width: windowWidth * 0.45,
                        // textAlign: 'center',
                        color: 'black',
                      }}>
                      {item?.Title}
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
                  
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
        </ScrollView>

        <SearchbarComponent
          setNewData={setNewData}
          placeHolderColor={'#000'}
          placeholderName={'Enter Product Name'}
          array={sellerProducts}
          arrayItem={'Product'}
          fontSize={13}
          SearchStyle={{width: windowWidth * 0.95,marginLeft:moderateScale(10,0.3)}}
        />

        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            textAlign:'left',
            width:windowWidth,
            marginTop: moderateVerticalScale(20, 0.6),
            marginLeft: moderateScale(20, 0.3),
            // backgroundColor:'black'
          }}>
          Products
        </CustomText>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={newData}
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
                    alignSelf:'center'
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
                  isBold
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize:moderateScale(13,0.6)
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
