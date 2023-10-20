import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import {FlatList, Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  AddToCart,
  RemoveToCart,
  decrementQuantity,
  increamentQuantity,
  setColor,
  setCotton,
  setSize,
} from '../Store/slices/common';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {useIsFocused} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import CommentsSection from '../Components/CommentsSection';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import moment from 'moment';
import {Post} from '../Axios/AxiosInterceptorFunction';

const ProductDetails = props => {
  const item = props?.route?.params?.item;
  console.log(
    '🚀 ~ file: ProductDetails.js:39 ~ ProductDetails ~ item:',
    item?.seller_info,
  );

  const cartData = useSelector(state => state.commonReducer.cart);
  const token = useSelector(state => state.authReducer.token);

  const user = useSelector(state => state.commonReducer.userData);

  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const cartitem = cartData?.find((x, index) => x?.id == item?.id);
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [selectedColor, setSelectedColor] = useState(
    cartitem ? cartitem?.selectedColor : '',
  );

  const [selectedSize, setSelectedSize] = useState(
    cartitem ? cartitem?.selectedSize : '',
  );

  const [index, setIndex] = useState(1);

  const [quantity, setQuantity] = useState(
    userRole == 'vendor'
      ? item?.quantity
      : cartitem
      ? cartitem?.product_quantity
      : 1,
  );

  const [comments, setComments] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [yourComment, setYourComment] = useState('');

  const addReview = async () => {
    const url = 'auth/review';
    const body = {
      product_id: item?.id,
      description: yourComment,
    };
    setisLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setisLoading(false);

    if (response != undefined) {
      setComments(prev => [
        ...prev,
        {
          user: {photo: user?.photo, name: user?.name},
          description: yourComment,
          time: moment(),
        },
      ]);
      setYourComment('');
    }
  };

  const addedItem = item => {
    dispatch(
      AddToCart({
        product_quantity: quantity,
        product_id: item?.id,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
        ...item,
      }),
    );
  };

  const removeItem = item => {
    dispatch(RemoveToCart(item));
  };

  const [finalItem, setFinalItem] = useState(
    cartitem != undefined ? cartitem : item,
  );

  useEffect(() => {
    setComments(item?.product_review);
    console.log(
      '🚀 ~ file: ProductDetails.js:31 ~ ProductDetails ~ ite\fd0:',
      item?.product_review,
    );
    return () => {
      setComments([]);
    };
  }, [focused]);

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header showBack={true} headerColor={['#fff', '#fff']} cart />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
        }}>
        <View style={styles.banner}>
          <View style={styles.container}>
            {index > 0 && item?.product_image.length > 1 && (
              <>
                <View
                  style={{
                    width: windowWidth * 0.6,
                    height: windowHeight * 0.32,
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    left: -170,
                    position: 'absolute',
                    backgroundColor: 'black',
                  }}>
                  <CustomImage
                    source={{uri: item?.product_image[index - 1]?.photo}}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index - 1);
                  }}
                  style={{
                    height: moderateScale(25, 0.6),
                    width: moderateScale(25, 0.6),
                    borderRadius: moderateScale(25, 0.6) / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: -5,
                    backgroundColor: Color.themeBlue,
                  }}>
                  <Icon name={'left'} as={AntDesign} color={'white'} />
                </TouchableOpacity>
              </>
            )}

            <View
              style={{
                width: windowWidth * 0.6,
                height: windowHeight * 0.34,
                // alignItems: 'center',
                overflow: 'hidden',
                alignSelf: 'center',
                backgroundColor: 'black',
              }}>
              <CustomImage
                source={{
                  uri:
                    item?.product_image.length == 1
                      ? item?.product_image[index - 1]?.photo
                      : item?.product_image[index]?.photo,
                }}
                style={{
                  height: '100%',
                  height: '100%',
                }}
              />
            </View>
            {index < item?.product_image.length - 1 && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index + 1);
                  }}
                  style={{
                    height: moderateScale(25, 0.6),
                    width: moderateScale(25, 0.6),
                    borderRadius: moderateScale(25, 0.6) / 2,
                    alignItems: 'center',
                    zIndex: 1,
                    justifyContent: 'center',
                    right: -5,
                    backgroundColor: Color.themeBlue,
                  }}>
                  <Icon name={'right'} as={AntDesign} color={'white'} />
                </TouchableOpacity>

                <View
                  style={{
                    width: windowWidth * 0.6,
                    height: windowHeight * 0.32,
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    right: -170,
                    position: 'absolute',
                    backgroundColor: 'black',
                  }}>
                  <CustomImage
                    source={{uri: item?.product_image[index + 1]?.photo}}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                  />
                </View>
              </>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: moderateScale(10, 0.6),
              alignItems: 'center',
              // backgroundColor:'purple',
            }}>
            <CustomText
              isBold
              numberOfLines={1}
              style={{
                color: '#252E2B',
                fontSize: moderateScale(18, 0.6),
                width: windowWidth * 0.4,
                textAlign: 'left',
                // backgroundColor:'orange',
              }}>
              {finalItem?.title}
            </CustomText>

            <CustomText
              style={{
                color: '#818181',
                width: windowWidth * 0.38,
                fontSize: moderateScale(14, 0.6),
                textAlign: 'left',
                // backgroundColor:'red',
              }}
              numberOfLines={1}>
              {finalItem?.category}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: moderateScale(5, 0.6),
              alignItems: 'center',
            }}>
            <CustomText
              isBold
              style={{
                color: Color.themeBlue,
                fontSize: 24,
                width: windowWidth * 0.4,
              }}>
              {finalItem?.price}.0 PKR
            </CustomText>

            <View style={styles.conterContainer}>
              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity + 1);
                  dispatch(increamentQuantity(item));
                }}
                style={styles.icon}>
                <CustomText
                  isBold
                  style={{
                    color: '#ffffff',
                    fontSize: moderateScale(13, 0.6),
                  }}>
                  +
                </CustomText>
              </TouchableOpacity>

              <CustomText
                isBold
                style={{
                  color: '#1B1721',
                  fontSize: moderateScale(14, 0.6),
                }}>
                {quantity}
              </CustomText>

              <TouchableOpacity
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                  dispatch(decrementQuantity(item));
                }}
                style={styles.icon}>
                <CustomText
                  isBold
                  style={{
                    color: '#ffffff',
                    fontSize: moderateScale(13, 0.6),
                  }}>
                  -
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>

          {!['null', null, undefined, '', []].includes(item?.color) && (
            <CustomText
              isBold
              style={{
                color: '#201E1D',
                fontSize: moderateScale(14, 0.6),
                width: windowWidth * 0.17,
                marginLeft: moderateScale(10, 0.3),
              }}>
              Color
            </CustomText>
          )}

          <View style={styles.ColorLine}>
            {JSON.parse(item?.color)?.map(color => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedColor(color);
                    dispatch(setColor({id: item?.id, colors: color}));
                  }}
                  style={[
                    styles.colorContainer,
                    {
                      backgroundColor: color,
                      marginHorizontal: moderateScale(5, 0.3),
                    },
                  ]}>
                  {selectedColor == color && (
                    <Icon
                      name={'check'}
                      as={Entypo}
                      size={moderateScale(17, 0.3)}
                      color={'#fff'}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {!['null', null, undefined, '', []].includes(item?.size) && (
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                color: '#201E1D',
                width: windowWidth * 0.17,
                marginLeft: moderateScale(10, 0.3),
              }}>
              Size
            </CustomText>
          )}

          <View style={styles.ColorLine1}>
            {JSON.parse(item?.size)?.map(size => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSize(size);
                    dispatch(
                      setSize({
                        id: cartitem ? cartitem?.id : item?.id,
                        size: size,
                      }),
                    );
                  }}
                  style={[
                    styles.size,
                    {
                      backgroundColor:
                        selectedSize == size ? Color.themeBlue : '#F4F5F6',
                      marginHorizontal: moderateScale(5, 0.3),
                    },
                  ]}>
                  <CustomText
                    style={{
                      color: selectedSize == size ? 'white' : '#8e9194',
                      fontSize: moderateScale(14, 0.6),
                      textTransform: 'uppercase',
                    }}>
                    {size}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={{
            width: windowWidth * 0.95,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: moderateScale(10, 0.3),
            borderRadius: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(14, 0.6),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            About Seller
          </CustomText>

          <CustomText
            isBold
            style={{
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(10, 0.3),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Name : 
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                marginTop: moderateScale(10, 0.3),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
              {item?.seller_info[0]?.name}
            </CustomText>
          </CustomText>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(10, 0.3),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Phone : 
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                marginTop: moderateScale(10, 0.3),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
              {item?.seller_info[0]?.phone}
            </CustomText>
            
          </CustomText>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(10, 0.3),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Email : 
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                marginTop: moderateScale(10, 0.3),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
               {item?.seller_info[0]?.email}
            </CustomText>
         
          </CustomText>
        </View>

        <View
          style={{
            width: windowWidth * 0.95,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: moderateScale(10, 0.3),
            borderRadius: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(14, 0.6),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Reviews
          </CustomText>

          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={comments}
            contentContainerStyle={{
              alignSelf: 'center',
              marginTop: moderateScale(5, 0.3),
            }}
            renderItem={({item, index}) => {
              return <CommentsSection item={item} />;
            }}
          />
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(14, 0.6),
              marginTop: moderateScale(10, 0.3),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Your review
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor:'black',
              width: windowWidth * 0.9,
              justifyContent: 'space-between',
            }}>
            <TextInputWithTitle
              titleText={'Write a review'}
              // secureText={false}
              placeholder={'Write a review'}
              setText={setYourComment}
              value={yourComment}
              viewHeight={0.05}
              viewWidth={0.7}
              inputWidth={0.7}
              borderColor={Color.veryLightGray}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(10, 0.3)}
              color={Color.themeBlue}
              marginRight={moderateScale(10, 0.3)}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              marginBottom={moderateScale(10, 0.3)}
              elevation
            />
            <CustomButton
              isBold
              onPress={addReview}
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                  'Add'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.15}
              height={windowHeight * 0.045}
              fontSize={moderateScale(10, 0.6)}
              bgColor={Color.themeBlue}
              borderRadius={moderateScale(30, 0.3)}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <CustomButton
          isBold
          onPress={() => {
            if (cartitem?.product_quantity > 0) {
              removeItem(cartitem?.id);
            } else {
              addedItem(item);
            }
          }}
          text={cartitem?.product_quantity > 0 ? 'Remove ' : 'ADD TO CART'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          fontSize={moderateScale(16, 0.6)}
          bgColor={Color.themeBlue}
          borderRadius={moderateScale(30, 0.3)}
        />
      </View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  size: {
    height: windowWidth * 0.08,
    alignItems: 'center',
    // backgroundColor:'red',
    width: windowWidth * 0.08,
    borderRadius: (windowWidth * 0.1) / 2,
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight * 0.08,
    backgroundColor: '#FFFFFF',
    //  alignItems:'center',
    bottom: 0,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    height: windowHeight * 0.35,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  colorContainer: {
    height: windowWidth * 0.08,
    width: windowWidth * 0.08,
    borderRadius: (windowWidth * 0.1) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: moderateScale(15, 0.3),
  },
  icon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: (windowWidth * 0.06) / 2,
    backgroundColor: Color.themeBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: windowWidth * 0.95,
    // height: windowHeight * 0.8,
    backgroundColor: 'white',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: moderateScale(10, 0.3),
    shadowColor: '#0000000A',
    shadowOffset: {width: 0, height: 2},
  },

  conterContainer: {
    width: windowWidth * 0.27,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: moderateScale(5, 0.6),
    // backgroundColor:'black'
  },

  ColorLine: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    // flexWrap:'no-wrap',
    // width: windowWidth * 0.8,
    marginTop: moderateScale(15, 0.3),
    marginBottom: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.6),
  },

  ColorLine1: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    // width: windowWidth * 0.7,
    marginTop: moderateScale(15, 0.3),
    marginBottom: moderateScale(15, 0.3),
  },

  bottomBanner: {
    width: windowWidth,
    height: windowHeight * 0.13,
    position: 'absolute',
    bottom: moderateScale(0, 0.3),
    backgroundColor: '#fff',
    elevation: 1,
  },
});
