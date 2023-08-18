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
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import Entypo from 'react-native-vector-icons/Entypo'

const SellerProduct = (props) => {

  const [item, setItem] = useState(props?.route?.params?.item ? props?.route?.params?.item : {} )

  console.log("🚀 ~ file: SellerProducts.js:28 ~ item:", item)
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
      id: 1,
      Title: 'Stitching',
      subTitle:'stiching',
      price:200,
      description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      image: require('../Assets/Images/dummyman4.png'),
      images: [require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png')],
      onPress: () => {
        console.log('here');
        navigationService.navigate('Dresses');
      },
    },
    {
      id: 2,
      subTitle:'stiching',
      Title: 'Painting',
      description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      price:300,
      image: require('../Assets/Images/dummyUser2.png'),
      images: [require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png')],
      onPress: () => {
        console.log('here');
      },
    },
    {
      id: 3,
      subTitle:'stiching',
      description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      Title: 'jeans',
      price:600,
      image: require('../Assets/Images/dummyman1.png'),
      images: [require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png')],
      onPress: () => {
        console.log('here');
      },
    },
    {
      id: 4,
      subTitle:'stiching',
      description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      Title: 'shoes',
      price:400,
      image: require('../Assets/Images/dummyUser1.png'),
      images: [require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png')],

      onPress: () => {
        console.log('here');
      },
    },
    {
      id: 5,
      subTitle:'stiching',
      Title: 'shoes',
      image: require('../Assets/Images/dummyman4.png'),
      images: [require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png'),require('../Assets/Images/Mask2.png')],

      onPress: () => {
        console.log('here');
      },
    },
  ];
  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      Title: 'T-Shirts',
      price: '90',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      colors: ['#4e86e1', '#2c4973', '#1ABFBC', '#C8C', '#313436'],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      totalQty: 18,
      totalCotton: 5,
      like: false,
    },
    {
      id: 2,
      Title: 'T-Shirts',
      price: '20',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      colors: ['#4e86e1', '#2c4973', '#2A4333', 'black', '#313436'],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      totalQty: 18,
      like: false,
    },
    {
      id: 3,
      Title: 'T-Shirts',
      price: '20',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      colors: ['#4e86e1', '#2c4973', '#2A4333', 'black', '#313436'],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      totalQty: 18,
      like: false,
    },
    {
      id: 4,
      Title: 'T-Shirts',
      price: '20',
      subTitle: 'Oversize',
      img: require('../Assets/Images/Image.png'),
      images: [
        require('../Assets/Images/Mask.png'),
        require('../Assets/Images/Mask2.png'),
      ],
      colors: ['#4e86e1', '#2c4973', '#2A4333', 'black', '#313436'],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      totalQty: 18,
      like: false,
    },
  ]);

  // useEffect(() => {
  //   if(Object.keys(item).length>0){
  //     setAllProducts(prev=>[item,...prev])
     
  //   }

    
  
    
  // }, [isFocused])
  

  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />
      <Header headerColor={['#D2E4E4', '#D2E4E4']}  />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
        }}
        style={{
          minHeight: windowHeight * 0.9,
          backgroundColor: '#D2E4E4',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal:moderateScale(10,.6),
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
            onPress={() => { navigationService.navigate('AddServices')}}
            text={'service'}
            textColor={Color.white}
            iconName={'plus'}
            iconType={Entypo}
            width={windowWidth * 0.28}
            height={windowHeight * 0.04}
            fontSize={moderateScale(12,.6)}
            // marginTop={moderateScale(10, 0.3)}
            bgColor={Color.yellow}
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
                  key={item?.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent : 'center',
                    width: windowWidth * 0.45,
                    paddingVertical: moderateScale(5, 0.6),
                    borderRadius: moderateScale(20, 0.6),
                    borderColor: Color.veryLightGray,
                    borderWidth: 1,
                    //  width: windowWidth * 0.16,
                    marginHorizontal: moderateScale(5, 0.3),
                    backgroundColor: 'white',
                  }}
                  onPress={()=>{
                    navigationService.navigate('ServiceDetails',{item, seller:true})
                  }}
                >
                  <View
                    style={{
                      width: moderateScale(50, 0.6),
                      height: moderateScale(50, 0.6),
                      borderRadius: moderateScale(5, 0.6),
                      backgroundColor: 'white',
                      overflow: 'hidden',
                      marginLeft: moderateScale(10, 0.6),
                    }}>
                    <CustomImage
                      source={item?.image}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode={'stretch'}
                      onPress={() => {
                        setSelectedService(item?.Title);
                        // item?.onPress();
                        navigationService.navigate('ServiceDetails',)

                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: moderateScale(10, 0.3),
                    }}>
                    <CustomText
                      style={{
                        width: windowWidth * 0.16,
                        // textAlign: 'center',
                        color: 'black',
                      }}>
                      {item?.Title}
                    </CustomText>
                    <CustomText isBold>Rs 25</CustomText>
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal:moderateScale(10,.6),
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
            onPress={() => {navigationService.navigate('AddProduct')}}
            text={'Product'}
            textColor={Color.white}
            iconName={'plus'}
            iconType={Entypo}
            width={windowWidth * 0.28}
            height={windowHeight * 0.04}
            fontSize={moderateScale(12,.6)}
            // marginTop={moderateScale(10, 0.3)}
            bgColor={Color.yellow}
            borderRadius={moderateScale(20, 0.3)}
            // isGradient
            isBold
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={allProducts}
          contentContainerStyle={{
            alignSelf: 'center',
            marginTop: moderateScale(5, 0.3),
          }}
          renderItem={({item, index}) => {
            return <Product item={item} seller={true} />;
          }}
        />
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
