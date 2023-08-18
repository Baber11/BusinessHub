import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {AddToCart, RemoveToCart, setLiked} from '../Store/slices/common';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';

const Product = ({item, seller}) => {
  console.log("🚀 ~ file: Product.js:16 ~ Product ~ seller:", seller)
  
  const dispatch = useDispatch();
  const [like, setLike] = useState(item?.like);

  const cartData = useSelector(state => state.commonReducer.cart);
  console.log(
    '🚀 ~ file: ProductCard.js:21 ~ ProductCard ~ cartData:',
    cartData,
  );

  const addedItem = item => {
    // console.log('add DATA===>', cartData);

    dispatch(AddToCart(item));
  };

  const removeItem = item => {
    // console.log('REMOVE DATA', cartData);
    dispatch(RemoveToCart(item));
  };
  const tempitem = cartData?.find((x, index) => x?.id == item?.id);
  // console.log('QTY+++', tempitem);
  return (
    <View key={item?.id}>
      <TouchableOpacity
        onLongPress={() => {
          setLike(!like);
          // dispatch(setLiked({id : item?.id , liked : !item?.like}))
        }}
        activeOpacity={0.8}
        onPress={() => {
          if(!seller){

            if (!tempitem) {
              addedItem(item);
            }
          }
        }}
        style={{
          width: windowWidth * 0.45,
          height: windowHeight * 0.35,
          backgroundColor: '#fff',
          margin: moderateScale(5, 0.3),
          borderRadius: 5,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <TouchableOpacity
          onLongPress={() => {
            setLike(!like);
            // dispatch(setLiked({id : item?.id , liked : !item?.like}))
          }}
          onPress={() => {
            if (!seller) {
              if (!tempitem) {
                addedItem(item);
              }
            }
          }}
          activeOpacity={0.8}
          style={{
            width: windowWidth * 0.35,
            height: windowHeight * 0.22,
            overflow: 'hidden',
            borderRadius: 5,
            marginTop: moderateScale(15, 0.3),
          }}>
          <CustomImage
            onLongPress={() => {
              setLike(!like);
              // dispatch(setLiked({id : item?.id , liked : !item?.like}))
            }}
            onPress={() => {
              if (!seller) {
                if (!tempitem) {
                  addedItem(item);
                }
              }
            }}
            source={item?.img}
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
          isBold
          style={{
            textAlign: 'left',
            width: windowWidth * 0.35,
            height: windowHeight * 0.03,
            color: '#464342',
            marginTop: moderateScale(10, 0.3),
          }}>
          {item.Title}
        </CustomText>

        <CustomText
          style={{
            textAlign: 'left',
            width: windowWidth * 0.35,
            height: windowHeight * 0.03,
            color: '#a2a2a2',
          }}>
          {item.subTitle}
        </CustomText>

        <CustomText
          style={{
            textAlign: 'left',
            width: windowWidth * 0.35,
            color: Color.themeColor,
          }}>
          $ {item.price}
        </CustomText>

        <CustomText
          onPress={() => {
            // navigationService.navigate('ProductDetails',{item,seller:true})
            if (seller) {
              navigationService.navigate('OrderDetails', {item,details:true});
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
      </TouchableOpacity>

      {tempitem != undefined && tempitem?.qty > 0 && (
        <CustomButton
          isBold
          onPress={() => removeItem(item)}
          text={'Remove'}
          textColor={Color.white}
          width={windowWidth * 0.28}
          marginTop={moderateScale(10, 0.3)}
          marginBottom={moderateScale(10, 0.3)}
          height={windowHeight * 0.04}
          bgColor={Color.themeColor}
          fontSize={moderateScale(12, 0.6)}
          borderRadius={moderateScale(5, 0.3)}
        />
      )}
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
