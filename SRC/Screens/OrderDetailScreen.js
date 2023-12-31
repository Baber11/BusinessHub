import {View, ImageBackground, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import Color from '../Assets/Utilities/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Divider, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
// import Color from '../Assets/Utilities/Color';

const OrderDetailScreen = props => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const onViewableItemsChanged = ({viewableItems}) => {
    setIndex(viewableItems[0]?.index);
  };

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 100,
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({animated: true, index});
  };

  const listing = [
    {
      id: 1,
      name: 'Size',
      size: 24,
    },
    {
      id: 2,
      name: 'google mount',
      size: 24,
    },
    {
      id: 3,
      name: 'Frame',
      size: 24,
    },
    {
      id: 4,
      name: 'made In',
      size: 24,
    },
    {
      id: 5,
      name: 'Designed In',
      size: 24,
    },
  ];

  const item1 = props.route.params.item;
  console.log(
    '🚀 ~ file: OrderDetailScref sdfsd fen.js:74 ~ OrderDetdfsfailScreen ~ item:',
    item1,
  );

  const type = props.route.params.type;

  return (
    <ImageBackground
      source={require('../Assets/Images/imageBackground.png')}
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#eeeeee',
      }}>
     
      <FlatList
        pagingEnabled
        horizontal
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        showsHorizontalScrollIndicator={false}
        data={item1?.orderdetail ? item1?.orderdetail : [item1]}
        contentContainerStyle={{
          alignSelf: 'center',
        }}
        style={{
          flexGrow: 0,
        }}
        renderItem={({item, index}) => {
          // console.log(
          //   '🚀 ~ file: OrderDetailScreen.js:103 ~ OrderDetailScreen ~ item:',
          //   item?.product,
          // );
          return (
           
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.9,
              }}>
                 <ScrollView showsVerticalScrollIndicator={false}>
              <CustomText
                style={{
                  color: '#000',
                  fontSize: moderateScale(22, 0.6),
                  textAlign: 'center',
                  marginTop: moderateScale(30, 0.3),
                }}>
                {item?.product?.title
                  ? item?.product?.title
                  : item?.service?.shop_name}
              </CustomText>
              <CustomText
                style={{
                  color: Color.themeLightGray,
                  fontSize: moderateScale(11, 0.6),
                  textAlign: 'center',
                }}>
                {item?.product?.category
                  ? item?.product?.category
                  : item?.service?.category}
              </CustomText>
              <View
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.3,
                  backgroundColor: 'transparent',
                }}>
                <CustomImage
                  source={
                    // require('../Assets/Images/logo.png')
                    {
                      uri: item?.product?.product_image[0]?.photo
                        ? item?.product?.product_image[0]?.photo
                        : item?.images
                        ? item?.images[0]
                        : item?.service_image
                        ? item?.service_image[0]?.photo
                        : item?.orderdetail[0]?.images
                        ? item?.orderdetail[0]?.images[0]
                        : require('../Assets/Images/logo.png'),
                    }
                  }
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  resizeMode={'contain'}
                />
              </View>
              {item?.product?.color && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: moderateScale(15, 0.3),
                    paddingHorizontal: moderateScale(15, 0.6),
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {JSON.parse(item?.product?.color)?.map((data, index) => {
                    return (
                      <View
                        style={{
                          width: windowWidth * 0.06,
                          height: windowWidth * 0.06,
                          borderRadius: (windowWidth * 0.06) / 2,
                          backgroundColor: data.toLocaleLowerCase(),
                          borderWidth: 1,
                          marginRight: moderateScale(7, 0.3),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {data.toLocaleLowerCase() ==
                          item?.color.toLocaleLowerCase() && (
                          <Icon
                            name={'check'}
                            as={FontAwesome}
                            size={moderateScale(15, 0.3)}
                            color={'green'}
                          />
                        )}
                      </View>
                    );
                  })}
                  <CustomText
                    style={{
                      color: '#0a0d38',
                      fontSize: moderateScale(25, 0.6),
                      position: 'absolute',
                      right: 10,
                    }}>
                    PKR {item?.price}
                  </CustomText>
                </View>
              )}
              {item?.size && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: moderateScale(20, 0.3),
                      paddingHorizontal: moderateScale(18, 0.6),
                    }}>
                    <CustomText
                      style={{
                        color: Color.veryLightGray,
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      Size
                    </CustomText>

                    <CustomText
                      style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                      {item?.size}
                    </CustomText>
                  </View>
                  <Divider
                    my="2"
                    width="96"
                    alignSelf={'center'}
                    _light={{bg: 'gray.200'}}
                  />
                </>
              )}
              {item?.charges && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: moderateScale(30, 0.3),
                      paddingHorizontal: moderateScale(18, 0.6),
                    }}>
                    <CustomText
                      style={{
                        color: Color.veryLightGray,
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      charges
                    </CustomText>

                    <CustomText
                      style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                      {item?.charges}
                    </CustomText>
                  </View>
                  <Divider
                    my="2"
                    width="96"
                    alignSelf={'center'}
                    _light={{bg: 'gray.200'}}
                  />
                </>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: moderateScale(30, 0.3),
                  paddingHorizontal: moderateScale(18, 0.6),
                }}>
                <CustomText
                  style={{
                    color: Color.veryLightGray,
                    fontSize: moderateScale(12, 0.6),
                  }}>
                  Category
                </CustomText>

                <CustomText
                  style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                  {item?.product
                    ? item?.product?.title
                    : item?.service?.shop_name}
                </CustomText>
              </View>
              <Divider
                my="2"
                width="96"
                alignSelf={'center'}
                _light={{bg: 'gray.200'}}
              />
              {type && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: moderateScale(30, 0.3),
                      paddingHorizontal: moderateScale(18, 0.6),
                    }}>
                    <CustomText
                      style={{
                        color: Color.veryLightGray,
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      Reservation date
                    </CustomText>

                    <CustomText
                      style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                      {moment(item?.date).format('ll')}
                    </CustomText>
                  </View>
                  <Divider
                    my="2"
                    width="96"
                    alignSelf={'center'}
                    _light={{bg: 'gray.200'}}
                  />
                </>
              )}
              {item?.qty && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: moderateScale(20, 0.3),
                      paddingHorizontal: moderateScale(18, 0.6),
                    }}>
                    <CustomText
                      style={{
                        color: Color.themeLightGray,
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      Quantity
                    </CustomText>

                    <CustomText
                      style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                      {item?.qty}
                    </CustomText>
                  </View>
                  <Divider
                    my="2"
                    width="96"
                    alignSelf={'center'}
                    _light={{bg: 'gray.200'}}
                  />
                </>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: moderateScale(20, 0.3),
                  paddingHorizontal: moderateScale(18, 0.6),
                }}>
                <CustomText
                  style={{
                    color: Color.themeLightGray,
                    fontSize: moderateScale(12, 0.6),
                  }}>
                  PickUp point
                </CustomText>

                <CustomText
                  style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                  {item1?.pickup_point}
                </CustomText>
              </View>
              <Divider
                my="2"
                width="96"
                alignSelf={'center'}
                _light={{bg: 'gray.200'}}
              />
            
              
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: moderateScale(20, 0.3),
                      paddingHorizontal: moderateScale(18, 0.6),
                    }}>
                    <CustomText
                      style={{
                        color: Color.themeLightGray,
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      seller Name
                    </CustomText>

                    <CustomText
                      style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                      {item1?.orderdetail ? item1?.orderdetail[0]?.product?.seller_info[0]?.name :item1?.service?.seller_info[0]?.name}
                    </CustomText>
                  </View>
                  <Divider
                    my="2"
                    width="96"
                    alignSelf={'center'}
                    _light={{bg: 'gray.200'}}
                  />
               
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: moderateScale(20, 0.3),
                  paddingHorizontal: moderateScale(18, 0.6),
                }}>
                <CustomText
                  style={{
                    color: Color.themeLightGray,
                    fontSize: moderateScale(12, 0.6),
                  }}>
                  seller Contact
                </CustomText>

                <CustomText
                  style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                  {item1?.orderdetail ? item1?.orderdetail[0]?.product?.seller_info[0]?.phone : item?.service?.seller_info[0]?.phone}
                </CustomText>
              </View>
              <Divider
                my="2"
                width="96"
                alignSelf={'center'}
                _light={{bg: 'gray.200'}}
              />
         
              {/* {(item?.description || item?.service?.description) && (
                <>
                  <View
                    style={{
                      // flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: moderateScale(30, 0.3),
                      paddingHorizontal: moderateScale(18, 0.6),
                    }}>
                    <CustomText
                      style={{
                        color: Color.themeLightGray,
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      Description
                    </CustomText>

                    <CustomText
                      style={{
                        color: '#000',
                        marginTop: moderateScale(10, 0.3),
                        // backgroundColor: 'purple',
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      {item.description
                        ? item.description
                        : item?.service?.description}
                    </CustomText>
                  </View>
                  <Divider
                    my="2"
                    width="96"
                    alignSelf={'center'}
                    _light={{bg: 'gray.200'}}
                  />
                </>
              )} */}

              {/* <TouchableOpacity
                style={{
                  width: windowWidth * 0.4,
                  paddingVertical: moderateScale(20, 0.6),
                  backgroundColor: Color.darkBlue,
                  alignSelf: 'center',
                  marginTop:moderateScale(20,0.3),
                  shadowColor: Color.themeBlue,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 10,
                  borderRadius: moderateScale(5, 0.3),
                }}
                onPress={() => {
                  navigation.goBack();
                }}>
                <CustomText
                  style={{
                    color: '#fff',
                    fontSize: moderateScale(13, 0.6),
                    textAlign: 'center',
                  }}>
                  Close
                </CustomText>
              </TouchableOpacity> */}
            
            </ScrollView>
            </View>
           
          );
        }}
        ListEmptyComponent={() => {
          return (
            <>
              <View
                style={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.4,
                  marginTop: moderateScale(30, 0.3),
                  alignSelf: 'center',
                  // backgroundColor:'red'
                }}>
                <CustomImage
                  source={require('../Assets/Images/4.jpg')}
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
                  fontSize: moderateScale(15, 0.6),
                  marginTop: moderateScale(-50, 0.3),
                }}>
                DATA NOT ADDED YET
              </CustomText>
            </>
          );
        }}

        // ListFooterComponent={({item , index})=>{
        //   console.log('index is ================>' , item)
        //   return(
        //     <></>
        //     // <CustomText>{index}</CustomText>
        //   )
        // }}
      />
      {!type && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: windowWidth,
            alignSelf: 'center',
            // backgroundColor:'red',
            justifyContent: 'center',
            // position: 'absolute',
            // bottom: moderateScale(30, 0.6),
          }}>
          {item1?.orderdetail?.map((x, i) => {
            // console.log('index, i ', index, i);
            return (
              <View
                style={{
                  width:
                    index == i
                      ? moderateScale(10, 0.6)
                      : moderateScale(10, 0.6),
                  height:
                    index == i
                      ? moderateScale(10, 0.6)
                      : moderateScale(10, 0.6),
                  borderRadius:
                    index == i ? moderateScale(5, 0.6) : moderateScale(5, 0.6),
                  backgroundColor:
                    index == i ? Color.themeLightGray : Color.themeLightGray,
                  marginRight: moderateScale(4, 0.6),
                }}></View>
            );
          })}
        </View>
      )}
    
    </ImageBackground>
  );
};

export default OrderDetailScreen;
