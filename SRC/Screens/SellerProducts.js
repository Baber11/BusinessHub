import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
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
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import Product from '../Components/Product';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { deleteService } from '../Store/slices/common';

const SellerProduct = props => {
  const [item, setItem] = useState(
    props?.route?.params?.item ? props?.route?.params?.item : {},
  );
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const sellerProducts = useSelector(
    state => state.commonReducer.sellerProducts,
  );
  console.log("🚀 ~ file: SellerProducts.js:44 ~ SellerProduct ~ sellerProducts:", sellerProducts)
  const sellerService = useSelector(state => state.commonReducer.sellerService);
  console.log("🚀 ~ file: SellerProducts.js:43 ~ SellerProduct ~ sellerService:", sellerService)
  const [products, setProducts] = useState(
    sellerProducts.filter(item => {
      return item?.userId == userData.id;
    }),
  );
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const [selectedService, setSelectedService] = useState('');
  const dispatch = useDispatch()
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
    },
    {
      id: 5,
      subTitle: 'stiching',
      Title: 'shoes',
      image: require('../Assets/Images/dummyman4.png'),
      images: [
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
        require('../Assets/Images/Mask2.png'),
      ],

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
  const [selectedItem, setSelectedItem] = useState({})

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
      <Header headerColor={['#D2E4E4', '#D2E4E4']} />
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
              sellerService?.some(
                item => item?.serviceOwner?.id == userData?.id,
              )
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
            width={windowWidth * 0.28}
            height={windowHeight * 0.04}
            fontSize={moderateScale(12, 0.6)}
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
          }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {sellerService?.filter(
            (item, index) => item?.serviceOwner?.id == userData?.id,
          ).length > 0 ? (
            sellerService
              ?.filter((item, index) => item?.serviceOwner?.id == userData?.id)
              .map((item, index) => {
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
                          source={{uri: item?.images[0]?.image?.uri}}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          resizeMode={'stretch'}
                          onPress={() => {
                            setSelectedService(item?.Title);
                            // item?.onPress();
                            navigationService.navigate('ServiceDetails', {item: item, seller:true});
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
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <CustomButton
                            onPress={() => {

                              navigationService.navigate('AddServices', {item});
                            }}
                            text={'Edit'}
                            textColor={Color.white}
                            iconName={'pencil'}
                            iconType={Entypo}
                            // width={windowWidth * 0.28}
                            height={windowHeight * 0.035}
                            fontSize={moderateScale(10, 0.6)}
                            marginTop={moderateScale(4, 0.3)}
                            bgColor={Color.yellow}
                            borderRadius={moderateScale(20, 0.3)}
                            iconStyle={{
                              fontSize: moderateScale(14, 0.6),
                            }}
                            marginRight={moderateScale(5, 0.3)}
                            isBold
                          />
                          <CustomButton
                            onPress={() => {
                              dispatch(deleteService(item))
                            }}
                            text={'Delete'}
                            textColor={Color.white}
                            iconName={'delete'}
                            iconType={MaterialIcons}
                            // width={windowWidth * 0.28}
                            height={windowHeight * 0.035}
                            fontSize={moderateScale(10, 0.6)}
                            marginTop={moderateScale(4, 0.3)}
                            bgColor={Color.yellow}
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
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: windowWidth * 0.9,
                height: windowHeight * 0.2,
              }}>
              <CustomText
                style={{fontSize: moderateScale(20, 0.6), color: 'black'}}>
                No services yet
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
            width={windowWidth * 0.28}
            height={windowHeight * 0.04}
            fontSize={moderateScale(12, 0.6)}
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
          data={products}
          contentContainerStyle={{
            alignSelf: 'center',
            marginTop: moderateScale(5, 0.3),
          }}
          
          renderItem={({item, index}) => {
            return <Product item={item} seller={true} />;
          }}
          ListEmptyComponent={() => {
            return (
              <>
                <View
                  style={{
                    width: windowWidth * 0.9,
                    height: windowHeight * 0.4,
                    marginTop: moderateScale(30, 0.3),
                    alignSelf: 'center',

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
                    fontSize: moderateScale(16, 0.6),
                    marginTop: moderateScale(-40, 0.3),
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
