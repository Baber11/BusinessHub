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

const OrderDetails = props => {
  const item = props.route.params.item;
  const details = props.route.params.details;
  console.log(
    '🚀 ~ file: DressesDetail.js:28 ~ DressfsdfesfdfsDefdtail ~ item:',
    item,
  );
  const user = useSelector(state => state.commonReducer.userData);
  const [index, setIndex] = useState(1);

  const [colors, setColors] = useState(
    item?.product ? JSON.parse(item?.product?.color) : JSON.parse(item?.color),
  );
  const [sizes, setSizes] = useState(
    item?.product ? JSON.parse(item?.product?.size) : JSON.parse(item?.size),
  );

  const [category, setCategory] = useState(
    item?.product ? item?.product?.category : item?.category,
  );
  const [title, setTitle] = useState(
    item?.product ? item?.product?.title : item?.title,
  );
  const [price, setPrice] = useState(
    item?.product ? item?.product?.price : item?.price,
  );
  const [quantity, setQuantity] = useState(
    details
      ? item?.product
        ? item?.product?.quantity
        : item?.quantity
      : item?.qty,
  );
  const images = [
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/Mask.png'),
  ];

  return (
    <>
      <CustomStatusBar backgroundColor={'#ffff'} barStyle={'dark-content'} />
      <Header showBack={true} headerColor={['#fff', '#fff']} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
        }}>
        <View style={styles.banner}>
          <View style={styles.container}>
            {index > 0 && item?.product_image?.length > 1 && (
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
                    item?.product_image?.length == 1
                      ? item?.product_image[index - 1]?.photo
                      : item?.product_image[index]?.photo,
                }}
                style={{
                  height: '100%',
                  height: '100%',
                }}
              />
            </View>
            {index < item?.product_image?.length - 1 && (
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
              {title}
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
              {category}
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
                width: windowWidth * 0.35,
              }}>
              {price}.00 PKR
            </CustomText>

            <View style={styles.conterContainer}>
              <CustomText
                isBold
                style={{
                  color: '#1B1721',
                  fontSize: moderateScale(14, 0.6),
                }}>
                Quantity:
                {quantity}
              </CustomText>
            </View>
          </View>

          {!['null', null, undefined, '', []].includes(colors) && (
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

          {!['null', null, undefined, '', []].includes(colors) && (
            <View style={styles.ColorLine}>
              {colors.map(color => {
                return (
                  <View
                    style={[styles.colorContainer, {backgroundColor: color}]}>
                    {item?.color == color && (
                      <Icon
                        name={'check'}
                        as={Entypo}
                        size={moderateScale(17, 0.3)}
                        color={'#fff'}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {!['null', null, undefined, '', []].includes(sizes) && (
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

          {!['null', null, undefined, '', []].includes(sizes) && (
            <View style={styles.ColorLine1}>
              {sizes.map(size => {
                return (
                  <View
                    style={[
                      styles.size,
                      {
                        backgroundColor:
                          item?.size == size ? Color.themeBlue : '#F4F5F6',
                        marginHorizontal: moderateScale(5, 0.3),
                      },
                    ]}>
                    <CustomText
                      style={{
                        color: item?.selectedSize == size ? 'white' : '#8e9194',
                        fontSize: moderateScale(14, 0.6),
                        textTransform: 'uppercase',
                      }}>
                      {size}
                    </CustomText>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {item?.order?.user && (
          <View
            style={{
              width: windowWidth * 0.95,
              borderRadius: moderateScale(10, 0.6),
              paddingHorizontal: moderateScale(15, 0.6),
              paddingVertical: moderateScale(10, 0.6),
              backgroundColor: 'white',
              marginTop: moderateScale(10, 0.3),
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: 'black',
                textAlign: 'left',
                width: windowWidth * 0.9,
              }}
              isBold>
              Buyer details
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'black',
                textAlign: 'left',
                marginTop: moderateScale(5, 0.3),
                width: windowWidth * 0.9,
              }}>
              Name : {item?.order?.user?.name}
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'black',
                textAlign: 'left',
                marginTop: moderateScale(5, 0.3),
                width: windowWidth * 0.9,
              }}>
              Email : {item?.order?.user?.email}
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'black',
                textAlign: 'left',
                marginTop: moderateScale(5, 0.3),
                width: windowWidth * 0.9,
              }}>
              Contact : {item?.order?.user?.phone}
            </CustomText>
            {item?.pickup_point && (
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: 'black',
                  textAlign: 'left',
                  marginTop: moderateScale(5, 0.3),
                  width: windowWidth * 0.9,
                }}>
                Address : {item?.pickup_point}
              </CustomText>
            )}
          </View>
        )}

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
            data={item?.product_review}
            contentContainerStyle={{
              alignSelf: 'center',
              marginTop: moderateScale(5, 0.3),
            }}
            renderItem={({item, index}) => {
              return <CommentsSection item={item} />;
            }}
            ListEmptyComponent={
              <CustomText
                style={{
                  fontSize: moderateScale(15, 0.6),
                  color: Color.veryLightGray,
                }}>
                No Reviews
              </CustomText>
            }
          />
        </View>
        {!details && (
          <View
            style={{
              width: windowWidth * 0.95,
              height: windowHeight * 0.1,
              flexDirection: 'row',
              borderRadius: moderateScale(10, 0.6),
              paddingHorizontal: moderateScale(15, 0.6),
              backgroundColor: 'white',
              marginTop: moderateScale(10, 0.3),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              style={{fontSize: moderateScale(15, 0.6), color: 'black'}}
              isBold>
              Total
            </CustomText>
            <CustomText
              style={{fontSize: moderateScale(15, 0.6), color: 'black'}}
              isBold>
              PKR {item?.product?.price * item?.qty}.0
            </CustomText>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default OrderDetails;

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
    marginHorizontal: moderateScale(5, 0.3),
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
    paddingHorizontal: moderateScale(10, 0.6),
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    // flexWrap:'no-wrap',
    // width: windowWidth * 0.8,
    marginVertical: moderateScale(10, 0.6),
  },

  ColorLine1: {
    flexDirection: 'row',
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    // width: windowWidth * 0.7,
    marginVertical: moderateScale(10, 0.6),
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
