import {View, Text} from 'react-native';
import React from 'react';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';

const Myorder = ({item}) => {
  console.log('object', item);
  return (
    <View
      style={{
        width: windowWidth * 0.9,
        paddingVertical: moderateScale(10, 0.6),
        backgroundColor: '#000',
        borderRadius: moderateScale(20, 0.3),
        marginTop: moderateScale(25, 0.3),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15, 0.6),
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: windowWidth * 0.2,
          height: windowWidth * 0.2,
          borderRadius: (windowWidth * 0.2) / 2,
          borderWidth: 1,
          borderColor: '#eee',
          overflow: 'hidden',
        }}>
        <CustomImage
          source={item.image}
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
          marginLeft: moderateScale(20, 0.3),
        }}>
        <CustomText
          style={{
            color: '#eee',
            fontSize: moderateScale(15, 0.6),
          }}>
          {item.name}
        </CustomText>
        <CustomText
          style={{
            color: '#eee',
            fontSize: moderateScale(15, 0.6),
          }}>
          {item.Title}
        </CustomText>
        <CustomText
          style={{
            color: '#eee',
            fontSize: moderateScale(15, 0.6),
          }}>
          Price : ${item.price}
        </CustomText>

        <View style={{flexDirection: 'row',justifyContent:'space-between',width:windowWidth*0.55,marginTop:moderateScale(5,0.3)}}>
         
        <CustomText
          style={{
            color: '#eee',
            fontSize: moderateScale(12, 0.6),}}>
           Qty
        </CustomText>  

        <CustomText
          style={{
            color: '#eee',
            fontSize: moderateScale(12, 0.6),}}>
           View all
        </CustomText>  

        </View>


      </View>    
    </View>
  );
};

export default Myorder;
