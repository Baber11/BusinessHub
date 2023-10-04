import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
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

const ProductDetails = props => {
  const item = props?.route?.params?.item;
  // console.log("🚀 ~ file: ProductDetails.js:31 ~ ProductDetails ~ item:", item)
  const cartData = useSelector(state => state.commonReducer.cart);
  
  const user = useSelector(state => state.commonReducer.userData);

  const userRole = useSelector(state=> state.commonReducer.selectedRole)
  const cartitem = cartData?.find((x, index) => x?.id == item?.id);
  // console.log("🚀 ~ file: ProductDetails.js:36 ~ ProductDetails ~ cartitem:", cartitem)
  // console.log("🚀 ~ file: DressesDetail.js:23 ~ DressesDetail ~ item:", item)
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [selectedColor, setSelectedColor] = useState(
    cartitem ? cartitem?.selectedColor : '',
  );

  const [selectedSize, setSelectedSize] = useState(
    cartitem ? cartitem?.selectedSize : '',
  );

  const [index, setIndex] = useState(1);
  // console.log(
  //   '🚀 ~ file: DressesDetail.js:28 ~ DressesDetail ~ item:',
  //   item?.product_image[index-1],
  // );
  const [quantity, setQuantity] = useState(userRole == 'vendor' ? item?.quantity : cartitem ? cartitem?.product_quantity : 1  )
  // const [quantity, setQuantity] = useState( 
  //   cartitem ? cartitem?.quantity : item?.quantity ? item?.quantity : 1,
  // );
  const [cotton, setcotton] = useState(
    cartitem ? cartitem?.cotton : item?.cotton ? item?.cotton : 1,
  );
  const [comments, setComments] = useState(
    item?.comments ? item?.comments : [],
  );
  const [yourComment, setYourComment] = useState('');

  const addedItem = item => {
    // dispatch(AddToCart({qty:1,...item}));
    // console.log('Console it============>>>>>>>>>>>',{product_quantity:quantity,product_id:item?.id,selectedSize:selectedSize, selectedColor:selectedColor, ...item})
    dispatch(AddToCart({product_quantity:quantity,product_id:item?.id,selectedSize:selectedSize, selectedColor:selectedColor, ...item}));
  };

  const removeItem = item => {
    dispatch(RemoveToCart(item));
  };

  const images = [
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/Mask.png'),
  ];

  const [finalItem, setFinalItem] = useState(
    cartitem != undefined ? cartitem : item,
  );
  const body = {
    Title: item?.Title,
    colors: item?.colors,
    cotton: cotton,
    id: item?.id,
    images: item?.images,
    // like: like,
    price: item?.price,
    product_quantity: quantity,
    sale: item?.sale,
    size: item?.size,
    subTitle: item?.subTitle,
    selectedSize: selectedSize,
    selectedColor: selectedColor,
    totalQty: item?.totalQty,
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header showBack={true} headerColor={['#CBE4E8', '#D2E4E4']} cart />
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
                    backgroundColor: Color.themeColor,
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
                    backgroundColor: Color.themeColor,
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
                color: Color.themeColor,
                fontSize: 24,
                width: windowWidth * 0.38,
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

          <View style={styles.ColorLine}>
            {JSON.parse(item?.color)?.map(color => {
              // console.log('Here================')
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

          {item?.size?.length > 0 && (
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
                      selectedSize == size ? Color.themeColor : '#F4F5F6',
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

          {/* <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: '#8e9194',
              width: windowWidth * 0.28,
            }}>
            Composition
          </CustomText> */}

          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: moderateScale(5, 0.6),
              alignItems: 'center',
            }}>
            <CustomText
              isBold
              style={{
                color: '#2F2B29',
                fontSize: 16,
                width: windowWidth * 0.36,
              }}>
              Organic Cotton
            </CustomText>

            <View style={styles.conterContainer}>
              <TouchableOpacity
                style={{
                  width: windowWidth * 0.06,
                  height: windowHeight * 0.03,
                  borderRadius: (windowWidth * 0.06) / 3,
                  backgroundColor: '#f2f2f2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setcotton(cotton + 1);
                  dispatch(setCotton({id: item.id, val: 1}));
                }}>
                <CustomText
                  isBold
                  style={{
                    color: '#000',
                    fontSize: 13,
                  }}>
                  +
                </CustomText>
              </TouchableOpacity>

              <CustomText
                isBold
                style={{
                  color: '#2F2B29',
                  fontSize: 18,
                }}>
                {cotton}
              </CustomText>

              <TouchableOpacity
                onPress={() => {
                  if (cotton > 1) {
                    setcotton(cotton - 1);
                  }
                  item?.cotton > 1 &&
                    dispatch(setCotton({id: item?.id, val: -1}));
                }}
                style={{
                  width: windowWidth * 0.06,
                  height: windowHeight * 0.03,
                  borderRadius: (windowWidth * 0.06) / 3,
                  backgroundColor: '#f2f2f2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomText
                  isBold
                  style={{
                    color: '#000',
                    fontSize: 13,
                  }}>
                  -
                </CustomText>
              </TouchableOpacity>
            </View>
          </View> */}
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
              // border={1}
              borderColor={Color.veryLightGray}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(10, 0.3)}
              color={Color.themeColor}
              marginRight={moderateScale(10, 0.3)}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              marginBottom={moderateScale(10, 0.3)}
              elevation
            />
            <CustomButton
              isBold
              onPress={() => {
                const body = {
                  userName: user?.name,
                  image: user?.image,
                  text: yourComment,
                  time: moment().format(' hh:mm:ss a'),
                };
                // console.log('Body is here==========>>>>>>>>>>>>>>>>>', body);
                setComments(prev => [
                  ...prev,
                  {
                    userName: user?.name,
                    image: user?.image,
                    text: yourComment,
                    time: moment().format(' hh:mm:ss a'),
                  },
                ]);
                setYourComment('');
              }}
              text={'Add'}
              textColor={Color.white}
              width={windowWidth * 0.15}
              height={windowHeight * 0.045}
              fontSize={moderateScale(10, 0.6)}
              // marginBottom={moderateScale(10,.3)}
              // marginTop={moderateScale(20, 0.3)}
              bgColor={Color.themeBlue}
              borderRadius={moderateScale(30, 0.3)}
              // isGradient
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <CustomButton
          // disabled={cartitem?.product_quantity > 0 ? true : false}
          isBold
          onPress={() => {
            // console.log('Body========>>>>>', body);
            if(cartitem?.product_quantity > 0){
              // console.log('Here 1')
               removeItem(cartitem?.id) 
            }else{
              // console.log('Here 2')

              addedItem(item);
            }
          }}
          text={cartitem?.product_quantity > 0 ? 'Remove From Cart' : 'ADD TO CART'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          fontSize={moderateScale(16, 0.6)}
          // marginBottom={moderateScale(10,.3)}
          // marginTop={moderateScale(20, 0.3)}
          bgColor={Color.themeBlue}
          borderRadius={moderateScale(30, 0.3)}
          // isGradient
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
    backgroundColor: Color.themeColor,
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
