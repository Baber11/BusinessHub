import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';
import {windowWidth, windowHeight} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';

const SearchbarComponent = ({
  setNewData,
  placeholderName,
  placeHolderColor,
  array,
  arrayItem,
  fontSize,
  alignSelf,
  SearchStyle,
}) => {
  // console.log("🚀 ~ file: SearchbarComponent.js:28 ~ array:", array)
  // const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const orderData = useSelector(state => state.commonReducer.order);
  // console.log('order data =====>', typeof orderData[0]?.arrayItem.toString());

  // const searchref = useRef();

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);

  const OnSearch = text => {
    // console.log("🚀 ~ file: SearchbarComponent.js:40 ~ OnSearch ~ text:", text)
    let tempdata = array.filter(item => {
      // console.log("🚀 ~ file: SearchbarComponent.js:42 ~ tempdata ~ item:", item)
      // const onMap = arrayItem == 'order' ? item?.orderId : item?.Title
      return (arrayItem == 'order'
        ? item?.orderId.toString().indexOf(text) > -1
        : arrayItem == 'Product' ? item?.Title?.toLowerCase().indexOf(text?.toLowerCase()) > -1
        : item?.name?.toLowerCase().indexOf(text?.toLowerCase()) > -1)
    });
    // console.log('TempData======>>>',tempdata);

    setNewData(tempdata);
  };

  // useEffect(()=>{
  //  setNewData(orderData)
  // },[])

  return (
    <View
      
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10, 0.6),
      }}>
      <View
        style={[
         { width: windowWidth * 0.9,
          height: windowHeight * 0.06,
          borderWidth: 1,
          borderColor: Color.veryLightGray,
          borderRadius: moderateScale(20, 0.3),
          marginTop: moderateScale(20, 0.3),
          // marginLeft:moderateScale(20,0.3),
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: moderateScale(10, 0.6)},
          SearchStyle
        ]}>
        {/* <TouchableOpacity activeOpacity={0.6}> */}
        <Feather name="search" size={25} color="#000" />
        {/* </TouchableOpacity> */}

        <TextInput
          placeholder={placeholderName ? placeholderName : 'Search item here'}
          placeholderTextColor={placeHolderColor ? placeHolderColor : '#000'}
          fontSize={fontSize ? fontSize : 14}
          numberOfLines={1}
          value={search}
          onChangeText={text => {
            setSearch(text);
            OnSearch(text);
          }}
        />
      </View>

    </View>

    // <Modal
    //   animationIn="fadeIn"
    //   isVisible={isModalVisible}
    //   onBackdropPress={() => toggleModal()}>
    //   <View
    //     style={{
    //       height: 140,
    //       width: 250,
    //       backgroundColor: '#fff',
    //       borderRadius: 10,
    //       alignSelf: 'center',
    //     }}>
    //     <TouchableOpacity
    //       style={{
    //         borderBottomWidth: 1,
    //         borderColor: '#000',
    //         marginTop: 10,
    //         paddingVertical: 5,
    //       }}>
    //       <CustomText style={{fontSize: 17, color: '#000', marginLeft: 10}}>
    //         Sort By Name
    //       </CustomText>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{
    //         borderBottomWidth: 1,
    //         borderColor: '#000',
    //         marginTop: 10,
    //         paddingVertical: 5,
    //       }}>
    //       <CustomText style={{fontSize: 17, color: '#000', marginLeft: 10}}>
    //         Low To High Price
    //       </CustomText>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={{marginTop: 10, paddingVertical: 5}}>
    //       <CustomText style={{fontSize: 17, color: '#000', marginLeft: 10}}>
    //         High To Low Price
    //       </CustomText>
    //     </TouchableOpacity>
    //   </View>
    // </Modal>
  );
};

export default SearchbarComponent;
