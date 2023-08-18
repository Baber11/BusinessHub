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
  // const seller = props?.route?.params?.seller;
  // console.log('🚀 ~ file: DressesDetail.js:28 ~ DressesDetail ~ item:', item,seller);
  const cartData = useSelector(state => state.commonReducer.cart);
  console.log(
    '🚀 ~ file: DressesDetail.js:26 ~ DressesDetail ~ cartData:',
    cartData,
  );
  const user = useSelector(state => state.commonReducer.userData);
  const cartitem = cartData?.find((x, index) => x?.id == item?.id);
  // console.log("🚀 ~ file: DressesDetail.js:23 ~ DressesDetail ~ item:", item)
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [Selectedcolor, SetSelectedColor] = useState(
    cartitem ? cartitem?.selectedColor : '',
  );
  console.log(
    '🚀 ~ file: DressesDetail.js:30 ~ DressesDetail ~ Selectedcolor:',
    Selectedcolor,
  );
  const [Selectedsize, setSelectedSize] = useState(
    cartitem ? cartitem?.selectedSize : '',
  );
  console.log(
    '🚀 ~ file: DressesDetail.js:35 ~ DressesDetail ~ Selectedsize:',
    Selectedsize,
  );
  // const [like, setLike] = useState(cartitem ? cartitem.like : item?.like);
  // console.log('🚀 ~ file: DressesDetail.js:39 ~ DressesDetail ~ liked:', like);

  const [index, setIndex] = useState(1);
  const [quantity, setQuantity] = useState(
    cartitem ? cartitem?.qty : item?.qty,
  );
  const [cotton, setcotton] = useState(
    cartitem ? cartitem?.cotton : item?.cotton,
  );
  const [comments, setComments] = useState(
    item?.comments ? item?.comments : [],
  );
  const [yourComment, setYourComment] = useState('');
  // console.log(
  //   '🚀 ~ file: DressesDetail.js:32 ~ DressesDetail ~ CartData:',
  //   cartData,
  // );

  // const [image1, setimage1] = useState(second)

  const addedItem = item => {
    dispatch(AddToCart(item));
  };

  const images = [
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/Mask.png'),
  ];

  // console.log('', cartData);

  // console.log("🚀 ~ file: DressesDetail.js:58 ~ DressesDetail ~ cartitem:", cartitem)
  const [finalItem, setFinalItem] = useState(
    cartitem != undefined ? cartitem : item,
  );
  const body = {
    Title: item?.Title,
    colors: item?.colors,
    cotton: cotton,
    id: item?.id,
    img: item?.img,
    // like: like,
    price: item?.price,
    qty: quantity,
    sale: item?.sale,
    size: item?.size,
    subTitle: item?.subTitle,
    selectedSize: Selectedsize,
    selectedColor: Selectedcolor,
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
            {index > 0 && item?.images.length > 1 && (
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
                    source={item?.images[index - 1]}
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
                source={
                  item?.images.length == 1
                    ? item?.images[index - 1]
                    : item?.images[index]
                }
                style={{
                  height: '100%',
                  height: '100%',
                }}
              />
            </View>
            {index < item?.images.length - 1 && (
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
                    source={item?.images[index + 1]}
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
              {finalItem?.Title}
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
              {finalItem?.subTitle}
            </CustomText>

            {/* <TouchableOpacity
              activeOpacity={0.6}
              style={{paddingRight: 10}}
              onPress={() => {
                setLike(!like);
                dispatch(setLiked({id: item?.id, liked: !like}));
              }}>
              {like ? (
                <Icon
                  name={'heart'}
                  as={Entypo}
                  size={moderateScale(25, 0.3)}
                  color={'#E50808'}
                />
              ) : (
                <Icon
                  name={'heart-outlined'}
                  as={Entypo}
                  size={moderateScale(25, 0.3)}
                  color={'black'}
                />
              )}
            </TouchableOpacity> */}
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
                width: windowWidth * 0.24,
              }}>
              ${finalItem?.price}.00
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
            {item?.colors.map(color => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    SetSelectedColor(color);
                    dispatch(setColor({id: item?.id, colors: color}));
                  }}
                  style={[styles.colorContainer, {backgroundColor: color}]}>
                  {Selectedcolor == color && (
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

          <View style={styles.ColorLine1}>
            {item?.size.map(size => {
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
                        Selectedsize == size ? Color.themeColor : '#F4F5F6',
                    },
                  ]}>
                  <CustomText
                    style={{
                      color: Selectedsize == size ? 'white' : '#8e9194',
                      fontSize: moderateScale(14, 0.6),
                      textTransform: 'uppercase',
                    }}>
                    {size}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </View>

          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: '#8e9194',
              width: windowWidth * 0.28,
            }}>
            Composition
          </CustomText>

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
                console.log('Body is here==========>>>>>>>>>>>>>>>>>', body);
                setComments(prev => [
                  ...prev,
                  {
                    userName: user?.name,
                    image: user?.image,
                    text: yourComment,
                    time: moment().format(' hh:mm:ss a'),
                  },
                ]);
                setYourComment('')
              }
            }
              text={'Add'}
              textColor={Color.white}
              width={windowWidth * 0.15}
              height={windowHeight * 0.045}
              fontSize={moderateScale(10, 0.6)}
              // marginBottom={moderateScale(10,.3)}
              // marginTop={moderateScale(20, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(30, 0.3)}
              // isGradient
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <CustomButton
          disabled={cartitem?.qty > 0 ? true : false}
          isBold
          onPress={() => addedItem(body)}
          text={cartitem?.qty > 0 ? 'Already Added':'ADD TO CART'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          fontSize={moderateScale(16, 0.6)}
          // marginBottom={moderateScale(10,.3)}
          // marginTop={moderateScale(20, 0.3)}
          bgColor={Color.themeBgColor}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
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
    marginLeft: moderateScale(15, 0.3),
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
  },

  ColorLine1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: windowWidth * 0.7,
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
