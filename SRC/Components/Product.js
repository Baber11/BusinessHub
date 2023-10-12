import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddToCart,
  RemoveToCart,
  deleteProducts,
  setLiked,
} from '../Store/slices/common';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import numeral from 'numeral';
import {Delete, Get} from '../Axios/AxiosInterceptorFunction';

const Product = ({item, seller, customStyle,setAddedProducts, addedProducts}) => {
  // console.log('🚀 ~ file: Product.js:16 ~ Product ~ item:', item);
  // console.log("🚀 ~ file: Product.js:16 ~ Product ~ seller:", seller)
  const token = useSelector(state => state.authReducer.token);

  const dispatch = useDispatch();
  const [like, setLike] = useState(item?.like);
  const [isLoading, setIsLoading] = useState(false);

  const cartData = useSelector(state => state.commonReducer.cart);
  const Role = useSelector(state => state.authReducer.role);
  // console.log('🚀 ~ file: Product.js:25 ~ Product ~ Role:', Role);

  const addedItem = item => {
    // console.log('cartIte===================?????????',{product_quantity:1,product_id:item?.id,...item})
    dispatch(AddToCart({product_quantity:1,product_id:item?.id,...item}));
  };

  const removeItem = item => {
    dispatch(RemoveToCart(item));
  };

  const editProduct = async id => {
    // console.log('id===========================>>>>>', id);
    const url = `auth/product/${id}`;
    // setIsLoading(true);
    const response = await Get(url, token);
    // setIsLoading(false);
    if (response != undefined) {
    //  console.log(
    //     '🚀 ~ file: AddServices.js:126 ~ editService ~ response?.data:',
    //     response?.data,
    //   );
      navigationService.navigate('AddProduct', {item: response?.data?.data});
    }
  };

  const deleteProduct = async id => {
    const url = `auth/product/${id}`;
    setIsLoading(true)
    const response = await Delete(url, apiHeader(token));
    setIsLoading(false)

    if(response != undefined){
      
      // console.log("🚀 ~ file: Product.js:65 ~ deleteService ~ response:", response?.data)
      setAddedProducts(addedProducts.filter(product=> product?.id != item?.id))  
      
    }

  };

  const tempitem = cartData?.find((x, index) => x?.id == item?.id);

  return (
    <View key={item?.id}>
      <TouchableOpacity
        onLongPress={() => {
          setLike(!like);
        }}
        activeOpacity={0.8}
        onPress={() => {
          if (!seller) {
            navigationService.navigate('ProductDetails', {item});

            // if (!tempitem) {
            //   addedItem(item);
            // }
          } else {
            navigationService.navigate('OrderDetails', {
              item,
              details: true,
            });
          }
        }}
        style={[
          {
            width: windowWidth * 0.45,
            // height: windowHeight * 0.35,
            paddingVertical: moderateScale(5, 0.6),
            backgroundColor: Color.white,
            borderWidth:1,
            borderColor:Color.veryLightGray,
            margin: moderateScale(5, 0.3),
            borderRadius: 5,
            alignItems: 'center',
          },
          tempitem != undefined && {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
          },
        ]}>
        <TouchableOpacity
          onLongPress={() => {
            setLike(!like);
            // dispatch(setLiked({id : item?.id , liked : !item?.like}))
          }}
          onPress={() => {
            if (!seller) {
              navigationService.navigate('ProductDetails', {item});

              // if (!tempitem) {
              //   addedItem(item);
              // }
            } else {
              navigationService.navigate('OrderDetails', {
                item,
                details: true,
              });
            }
          }}
          activeOpacity={0.8}
          style={{
            width: '90%',
            height: windowHeight * 0.22,
            overflow: 'hidden',
            backgroundColor: 'black',
            borderRadius: 5,
            // marginTop: moderateScale(15, 0.3),
          }}>
          <CustomImage
            onLongPress={() => {
              setLike(!like);
              // dispatch(setLiked({id : item?.id , liked : !item?.like}))
            }}
            onPress={() => {
              if (!seller) {
                // if (!tempitem) {
                //   addedItem(item);
                // }
                navigationService.navigate('ProductDetails', {item});


              } else {
                navigationService.navigate('OrderDetails', {
                  item,
                  details: true,
                });
              }
            }}
            source={
              item?.img ? item?.img : {uri: item?.product_image[0]?.photo}
            }
            resizeMode={'cover'}
            style={{
              height: '100%',
              height: '100%',
            }}
          />

          {/* {item?.sale && (
            <View style={styles.sale}>
              <CustomText
                isBold
                style={{
                  color: '#fff',
                  fontSize: 12,
                }}>
                {item.sale}
              </CustomText>
            </View>
          )} */}
        </TouchableOpacity>

        <CustomText
          numberOfLines={1}
          isBold
          style={{
            textAlign: 'left',
            width: '90%',
            height: windowHeight * 0.03,
            color: '#464342',
            marginTop: moderateScale(10, 0.3),
          }}>
          {item?.title}
        </CustomText>

        {!seller && (
          <CustomText
          numberOfLines={1}
            style={{
              textAlign: 'left',
              width: windowWidth * 0.4,
              height: windowHeight * 0.03,
              color: '#a2a2a2',
            }}>
            {item?.category}
          </CustomText>
        )}
        <CustomText
          style={{
            // backgroundColor : 'red',
            textAlign: 'left',
            width: windowWidth * 0.4,
            color: '#053b55',
            fontSize: moderateScale(11, 0.6),
          }}>
          Rs {numeral(item?.price).format('0,0')}
          {/* {item?.price} */}
        </CustomText>
        {/* {!seller && <CustomButton
              onPress={() => {
                // navigationService.navigate('ProductDetails',{item,seller:true})
                if (seller) {
                  navigationService.navigate('OrderDetails', {
                    item,
                    details: true,
                  });
                } else {
                  navigationService.navigate('ProductDetails', {item});
                }
              }}
              text={ 'View Details'}
              textColor={Color.white}
              // iconName={'pencil'}
              // iconType={Entypo}
              // width={windowWidth * 0.28}
              height={windowHeight * 0.035}
              fontSize={moderateScale(10, 0.6)}
              marginTop={moderateScale(4, 0.3)}
              bgColor={Color.themeBlue}
              borderRadius={moderateScale(20, 0.3)}
              iconStyle={{
                fontSize: moderateScale(14, 0.6),
              }}
              marginRight={moderateScale(-60, 0.3)}
              isBold
            />} */}

        {/* {!seller && (
          <CustomText
            onPress={() => {
              // navigationService.navigate('ProductDetails',{item,seller:true})
              if (seller) {
                navigationService.navigate('OrderDetails', {
                  item,
                  details: true,
                });
              } else {
                navigationService.navigate('ProductDetails', {item});
              }
            }}
            style={{
              textAlign: 'right',
              width: windowWidth * 0.35,
              color: '#2C2928',
              position: 'absolute',
              bottom: moderateScale(10, 0.3),
              right: moderateScale(15, 0.3),
              fontSize: moderateScale(11, 0.6),
            }}>
            View Details
          </CustomText>
        )} */}
        {Role == 'vendor' && (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <CustomButton
              onPress={() => {
                editProduct(item?.id);
              }}
              text={ 'Edit'}
              textColor={Color.white}
              iconName={'pencil'}
              iconType={Entypo}
              // width={windowWidth * 0.28}
              height={windowHeight * 0.035}
              fontSize={moderateScale(10, 0.6)}
              marginTop={moderateScale(4, 0.3)}
              bgColor={Color.themeBlue}
              borderRadius={moderateScale(20, 0.3)}
              iconStyle={{
                fontSize: moderateScale(14, 0.6),
              }}
              marginRight={moderateScale(5, 0.3)}
              isBold
            />
            <CustomButton
              onPress={() => {
                deleteProduct(item?.id)
                // dispatch(deleteProducts(item));
              }}
              text={isLoading ? <ActivityIndicator size={'small'} color={'white'} /> : 'Delete'}
              textColor={Color.white}
              iconName={!isLoading && 'delete'}
              iconType={!isLoading && MaterialIcons}
              width={windowWidth * 0.2}
              height={windowHeight * 0.035}
              fontSize={moderateScale(10, 0.6)}
              marginTop={moderateScale(4, 0.3)}
              bgColor={Color.themeBlue}
              borderRadius={moderateScale(20, 0.3)}
              iconStyle={{
                fontSize: moderateScale(14, 0.6),
              }}
              isBold
            />
          </View>
        )}
      </TouchableOpacity>

      {/* {tempitem != undefined && !seller && (
        <CustomButton
          isBold
          onPress={() => removeItem(item)}
          text={'Remove'}
          textColor={Color.white}
          width={windowWidth * 0.28}
          marginTop={moderateScale(10, 0.3)}
          marginBottom={moderateScale(10, 0.3)}
          height={windowHeight * 0.04}
          bgColor={Color.themeBlue}
          fontSize={moderateScale(12, 0.6)}
          borderRadius={moderateScale(5, 0.3)}
        />
      )} */}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  bottomImage: {
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    top: moderateScale(10, 0.3),
    left: moderateScale(5, 0.3),
    zIndex: 1,
  },

  sale: {
    position: 'absolute',
    bottom: moderateScale(10, 0.3),
    right: moderateScale(5, 0.3),
    zIndex: 1,
    width: windowWidth * 0.2,
    height: windowHeight * 0.03,
  },
});
