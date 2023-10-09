import {View, Text} from 'react-native';
import React from 'react';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';

const MyOrderCard = ({item , type}) => {
  //  console.log("🚀 ~ file: MyorderComponent.js:11 ~ MyOrderCard ~ item:", item?.order_id)
  
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: windowWidth * 0.93,
        paddingVertical: moderateScale(10, 0.6),
        backgroundColor: '#f9fafd',
        borderRadius: moderateScale(20, 0.3),
        marginTop: moderateScale(12, 0.3),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15, 0.6),
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        // marginBottom : moderateScale(10,0.3)
      }}>
      <View
        style={{
          width: windowWidth * 0.2,
          height: windowWidth * 0.2,
          borderRadius: (windowWidth * 0.2) / 2,
          borderWidth: 1,
          borderColor: Color.themeColor,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}>
        <CustomImage
          source={require('../Assets/Images/logo.png')}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode={'cover'}
        />
      </View>

      <View
        style={{
          width: windowWidth * 0.4,
          justifyContent: 'center',
          marginLeft: moderateScale(10, 0.3),
        }}>
        <CustomText
          // isBold
          numberOfLines={1}
          style={{
            // backgroundColor:'red',
            width:windowWidth*0.5,
            color: '#2f2f2f',
            fontSize: moderateScale(13, 0.6),
          }}>
          OrderId : {item?.orderId ? item?.orderId : item?.order_id}
        </CustomText>
        {item?.quantity ? (<CustomText
          numberOfLines={1}
          style={{
            color: '#000',
            fontSize: moderateScale(12, 0.6),
          }}>
          Quantity : {item?.quantity}
        </CustomText>):(<CustomText
          numberOfLines={1}
          style={{
            color: '#000',
            fontSize: moderateScale(12, 0.6),
          }}>Service : {item?.title ? item?.title : item?.service?.shop_name}</CustomText>)}
        
         
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.62,
            marginTop: moderateScale(5, 0.3),
          }}>
          <CustomText
            numberOfLines={1}
            style={{
              color: '#000',
              fontSize: moderateScale(15, 0.6),
            }}>
            Price : PKR {item?.total ? item?.total : `${item?.charges}` }
          </CustomText>

          <CustomText
            isBold
            onPress={() => navigation.navigate('OrderDetailScreen', {item : item , type : type})}
            style={{
              color: '#000',
              fontSize: moderateScale(12, 0.6),
            }}>
            Details
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default MyOrderCard;
