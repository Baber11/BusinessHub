import {View, Text} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
// import Color from '../Assets/Utilities/Color';

const OrderDetailScreen = (props) => {

  const item = props.route.params.item;
  console.log("AK",item)
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor:'#eeeeee'
        
      }}>


    <View style={{marginTop:moderateScale(30,0.3)}}>  
      <CustomText
        style={{
          color: '#000',
          fontSize: moderateScale(22, 0.6),
          textAlign: 'center',
        }}>
        Cairn Android
      </CustomText>
      <CustomText
        style={{
          color: '#000',
          fontSize: moderateScale(15, 0.6),
          textAlign: 'center',
        }}>
        Sky Helmet
      </CustomText>
      </View>

      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.3,
          alignSelf: 'center',
          marginTop:moderateScale(20,0.3)
        }}>
        <CustomImage
          source={require('../Assets/Images/Image2.png')}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode={'contain'}
        />
      </View>


      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:moderateScale(15,0.3),paddingHorizontal:moderateScale(10,0.6),alignItems:'center'}}> 

      <View style={{flexDirection:'row',justifyContent:'space-around',width:windowWidth*0.25}}>
       <View style={{width:windowWidth*0.06,height:windowWidth*0.06,borderRadius:(windowWidth*0.06/2),backgroundColor:"#fe7f32",borderWidth:1}}></View>
       <View style={{width:windowWidth*0.06,height:windowWidth*0.06,borderRadius:(windowWidth*0.06/2),backgroundColor:"#fff",borderWidth:1}}></View>
       <View style={{width:windowWidth*0.06,height:windowWidth*0.06,borderRadius:(windowWidth*0.06/2),backgroundColor:"#0a0d38",borderWidth:1}}></View>
       </View>

       <CustomText
        style={{color: '#0a0d38',fontSize: moderateScale(25, 0.6), }}>
        ${item.price}45.69
      </CustomText>
      </View>

     
     <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:moderateScale(30,0.3),paddingHorizontal:moderateScale(18,0.6)}}>
     <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        Size
      </CustomText>

      <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        54-24
      </CustomText>
     </View>

     <View style={{width:windowWidth*0.92,borderBottomWidth:1,borderColor:'#fff',alignSelf:'center'}}></View>

      
     
     <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:moderateScale(30,0.3),paddingHorizontal:moderateScale(18,0.6)}}>
     <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        Size
      </CustomText>

      <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        54-24
      </CustomText>
     </View>

     <View style={{width:windowWidth*0.92,borderBottomWidth:1,borderColor:'#fff',alignSelf:'center'}}></View>

     <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:moderateScale(30,0.3),paddingHorizontal:moderateScale(18,0.6)}}>
     <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        Size
      </CustomText>

      <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        54-24
      </CustomText>
     </View>

     <View style={{width:windowWidth*0.92,borderBottomWidth:1,borderColor:'#fff',alignSelf:'center'}}></View>

     <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:moderateScale(30,0.3),paddingHorizontal:moderateScale(18,0.6)}}>
     <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        Size
      </CustomText>

      <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        54-24
      </CustomText>
     </View>

     <View style={{width:windowWidth*0.92,borderBottomWidth:1,borderColor:'#fff',alignSelf:'center'}}></View>

     <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:moderateScale(30,0.3),paddingHorizontal:moderateScale(18,0.6)}}>
     <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        Size
      </CustomText>

      <CustomText
        style={{color: '#000',fontSize: moderateScale(15, 0.6), }}>
        54-24
      </CustomText>
     </View>

     <View style={{width:windowWidth*0.92,borderBottomWidth:1,borderColor:'#fff',alignSelf:'center'}}></View>




     <View style={{width:windowWidth*0.4,paddingVertical:moderateScale(25,0.6),backgroundColor:'#fe7e37',alignSelf:'center',marginTop:moderateScale(-30,0.3),shadowColor: "#fe7e37",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 10,}}>
        <CustomText
          style={{color: '#fff',fontSize: moderateScale(13, 0.6),textAlign:'center' }}>
          ADD TO CART
        </CustomText>
     </View>

      


    </View>
  );
};

export default OrderDetailScreen;
