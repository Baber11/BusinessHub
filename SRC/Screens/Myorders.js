import {View, Text,FlatList} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import Myorder from '../Components/MyorderComponent';

import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const Myorders = () => {
  const navigation = useNavigation()
  const orderData = useSelector(state => state.commonReducer.order);

  console.log("Data55",orderData)
 
  const Data1 = [
    {
      id:1,
      name:'Sushi',
      Title:'Minish Dish',
      price:"34",
      image : require('../Assets/Images/Mask2.png')
    },
    {
      id:2,
      name:'Salad',
      Title:'Menchi Katusha',
      price:"44",
      image : require('../Assets/Images/Mask3.png')
    },
    {
      id:3,
      name:'Tikka',
      Title:'Drawing Food',
      price:"64",
      image : require('../Assets/Images/Mask3.png')
    },
    {
      id:4,
      name:'Meat',
      Title:'Beef Food',
      price:"84",
      image : require('../Assets/Images/Mask3.png')
    },
    {
      id:5,
      name:'Meat',
      Title:'Beef Food',
      price:"84",
      image : require('../Assets/Images/Mask3.png')
    },
   
  
  ]
  
  return (
    <>
      <CustomStatusBar backgroundColor={'#D2E4E4'} barStyle={'dark-content'} />
    
      <Header
        headerColor={['#D2E4E4', '#D2E4E4']}
        // showLogout
        hideUser
      />
     
      
        <FlatList
        showsVerticalScrollIndicator={false}
          data={orderData}
          contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
          minHeight : windowHeight * 0.9,
          }}
          style={{
            backgroundColor :'white',
         
          }}
          renderItem={({item, index}) => {
            console.log("DATA34",item)
            return (
              // <CustomText>hello</CustomText>
              <Myorder item={item}/>
              
            );
          }}
        />

    </>
  );
};

export default Myorders;
