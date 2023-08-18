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
  console.log('🚀 ~ file: DressesDetail.js:28 ~ DressesDetail ~ item:', item);
  const user = useSelector(state => state.commonReducer.userData);
  const [index, setIndex] = useState(1);

  const images = [
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/image3.png'),
    require('../Assets/Images/Mask2.png'),
    require('../Assets/Images/Mask.png'),
  ];

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header showBack={true} headerColor={['#CBE4E8', '#D2E4E4']} cart={!details} />
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
              {item?.Title}
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
              {item?.subTitle}
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
                width: windowWidth * 0.3,
              }}>
              ${item?.price}.00
            </CustomText>

            <View style={styles.conterContainer}>
              <CustomText
                isBold
                style={{
                  color: '#1B1721',
                  fontSize: moderateScale(14, 0.6),
                }}>
              
                Quantity:
                {details ? item?.totalQty : item?.qty}
              </CustomText>
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
                <View style={[styles.colorContainer, {backgroundColor: color}]}>
                  {item?.selectedColor == color && (
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
                <View
                  style={[
                    styles.size,
                    {
                      backgroundColor:
                        item?.selectedSize == size
                          ? Color.themeColor
                          : '#F4F5F6',
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
              <CustomText
                isBold
                style={{
                  color: '#2F2B29',
                  fontSize: 18,
                }}>
                {item?.cotton}
              </CustomText>
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
            data={item?.comments}
            contentContainerStyle={{
              alignSelf: 'center',
              marginTop: moderateScale(5, 0.3),
            }}
            renderItem={({item, index}) => {
              return <CommentsSection item={item} />;
            }}
            ListEmptyComponent={
              <CustomText style={{fontSize:moderateScale(15,.6), color:Color.veryLightGray}}>No Reviews</CustomText>
            }
          />
        </View>
       {item?.buyer &&( <View
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
            Name : {item?.buyer?.name}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: 'black',
              textAlign: 'left',
              marginTop: moderateScale(5, 0.3),
              width: windowWidth * 0.9,
            }}>
            Email : {item?.buyer?.email}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: 'black',
              textAlign: 'left',
              marginTop: moderateScale(5, 0.3),
              width: windowWidth * 0.9,
            }}>
            Contact : {item?.buyer?.contact}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: 'black',
              textAlign: 'left',
              marginTop: moderateScale(5, 0.3),
              width: windowWidth * 0.9,
            }}>
            Address : {item?.buyer?.address}
          </CustomText>
        </View>)}
       {!details && <View
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
            {item?.price * item?.qty}.0 Rs
          </CustomText>
        </View>}
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
