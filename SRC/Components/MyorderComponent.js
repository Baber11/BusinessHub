import {View, Text,} from 'react-native';
import React from 'react';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import { useNavigation } from '@react-navigation/native';


const Myorder = ({item}) => {
  console.log("orderCMP",item)
  const navigation = useNavigation()
  
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
        shadowColor: "#000",
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
          backgroundColor : 'white'
        }}>
        <CustomImage
          source={item.Image}
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
            color: '#2f2f2f',
            fontSize: moderateScale(13, 0.6),
          }}>
          OrderId :  {item.orderId}
        </CustomText>
        <CustomText
        numberOfLines={1}

            style={{
              color: '#000',
              fontSize: moderateScale(12, 0.6),
            }}>
            Quantity : {item?.Quantiity}
          </CustomText>
      

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
          Price : ${item.total}
        </CustomText>

  
          <CustomText
          isBold
           onPress={()=> navigation.navigate('OrderDetailScreen',{item})}
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

export default Myorder;
