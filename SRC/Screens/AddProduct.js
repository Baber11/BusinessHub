import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import {FlatList, Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import CommentsSection from '../Components/CommentsSection';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import moment from 'moment';
import ImagePickerModal from '../Components/ImagePickerModal';
import {ToastAndroid, ActivityIndicator} from 'react-native';
import {Alert} from 'react-native';
import {TriangleColorPicker} from 'react-native-color-picker';
import Modal from 'react-native-modal';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import navigationService from '../navigationService';
import {setAddProducts} from '../Store/slices/common';
import {Patch, Post} from '../Axios/AxiosInterceptorFunction';

const AddProduct = props => {
  const item = props?.route?.params?.item;
  // console.log('🚀 ~ file: AddProduct.js:31 ~ AddProduct ~ item:', item);
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  const [index, setIndex] = useState(1);
  const [images, setImages] = useState(
    item?.product_image ? item?.product_image : [],
  );
  const [title, setTitle] = useState(item?.title ? item?.title : '');
  const [subTitle, setSubTitle] = useState(
    item?.category ? item?.category : '',
  );
  const [price, setPrice] = useState(item?.price ? `${item?.price}` : '');
  // console.log('🚀 ~ file: AddProduct.js:38 ~ AddProduct ~ price:', price);
  const [quantity, setQuantity] = useState(
    item?.quantity ? `${item?.quantity}` : '',
  );
  const [colors, setColors] = useState(
    item?.color ? JSON.parse(item?.color) : [],
  );
  // console.log('🚀 ~ file: AddProduct.js:47 ~ AddProduct ~ colors:', colors);
  const [sizes, setSizes] = useState(item?.size ? JSON.parse(item?.size) : []);
  const [cotton, setCotton] = useState([]);
  const [imagePickerModal, setImagePickerModal] = useState(false);
  const [image, setImage] = useState({});
  const [colorModal, setColorModal] = useState(false);
  const [size, setSize] = useState('');
  const sizesArray = ['XS', 'S', 'M', 'L', 'XL'];
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addProduct = async () => {
    const body = {
      title: title,
      category: subTitle,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    const formData = new FormData();
    for (let key in body) {
      formData.append(key, body[key]);
    }
    images?.map((item, index) => formData.append(`photo[${index}]`, item));
    colors?.map((item, index) => formData.append(`color[${index}]`, item));
    sizes?.map((item, index) => formData.append(`size[${index}]`, item));
    // console.log(
    //   '🚀 ~ file: AddProduct.js:75 ~ addProduct ~ formData:',
    //   JSON.stringify(formData, null, 2),
    // );

    for (let key in body) {
      if (images.length < 1) {
        return Platform.OS == 'android'
          ? ToastAndroid.show('Add atleast one image', ToastAndroid.SHORT)
          : Alert.alert('Add atleast one image');
      } else if (key == 'price' || key == 'totalQty') {
        if (isNaN(body[key])) {
          return Platform.OS == 'android'
            ? ToastAndroid.show(`${key} should be number`, ToastAndroid.SHORT)
            : Alert.alert(`${key} should be number`);
        }
      } 
      // else if (key == 'colors') {
      //   if (!body[key].length) {
      //     return Platform.OS == 'android'
      //       ? ToastAndroid.show('Add atleast one color', ToastAndroid.SHORT)
      //       : Alert.alert('Add atleast one color');
      //   }
      // } 
      else if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert('All Fields are required');
      }
    }
    // console.log('🚀 ~ file: AddProduct.js:428 ~ AddProduct ~ body:', {
    //   userId: user?.id,
    //   item: {
    //     id: item?.id ? item?.id : -1,
    //     product_quantity: 1,
    //     selectedColor: '',
    //     selectedSize: '',
    //     size: sizes,
    //     ...body,
    //   },
    // });

    const url = 'auth/product';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      // console.log(
      //   '🚀 ~ file: SellerProducts.js:63 ~ AddProduct ~ response:',
      //   response?.data,
      // );

      navigation.goBack();
    }

    // dispatch(
    //   setAddProducts({
    //     userId: user?.id,
    //     item: {
    //       id: item?.id ? item?.id : -1,
    //       qty: 1,
    //       selectedColor: '',
    //       selectedSize: '',
    //       size: sizes,
    //       ...body,
    //     },
    //   }),
    // );
    // navigation.goBack();

    // navigationService.navigate('SellerProduct',{item:{...body,images:images.slice(0)}})
  };

  const updateProduct = async id => {
    const url = `auth/product/${id}?_method=put`;
    const body = {
      // photo: images,
      title: title,
      category: subTitle,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      // color: colors,
      // size: sizes,
    };

    const formData = new FormData();
    for (let key in body) {
      formData.append(key, body[key]);
    }
    if (images.length > item?.product_image.length) {
      // console.log(
      //   'new images==================>>>>>',
      //   images.slice(item?.product_image.length),
      // );
      images
        ?.slice(item?.product_image.length)
        ?.map((item, index) => formData.append(`photo[${index}]`, item));
    }

    // images.map((item, index)=> formData.append(`photo[${index}]`,item) )
    sizes?.map((item, index) => formData.append(`size[${index}]`, item));
    colors?.map((item, index) => formData.append(`color[${index}]`, item));

    // console.log(
    //   '🚀 ~ file: AddProduct.js:172 ~ updateProduct ~ formData:',
    //   formData,
    // );
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    // console.log(
    //   '🚀 ~ file: AddProduct.js:174 ~ updateProduct ~ response?.data:',
    // );

    if (response?.data?.success) {
      // console.log(
      //   '🚀 ~ file: AddProduct.js:174 ~ updateProduct ~ response?.data:',
      //   response?.data,
      // );
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (Object.keys(image).length > 0) {
      setImages(prev => [...prev, image]);
      setImage({});
    }

    if (size != '') {
      if (sizes.includes(size)) {
        Platform.OS == 'android'
          ? ToastAndroid.show('Already added', ToastAndroid.SHORT)
          : Alert.alert('already added');
      } else {
        setSizes(prev => [...prev, size]);
        setSize('');
      }
    }
  }, [image, size]);

  return (
    <>
      <CustomStatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <Header showBack={true} headerColor={['#fff', '#fff']} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
          marginBottom: moderateScale(10, 0.3),
        }}>
        <View style={styles.banner}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.6),
              color: Color.black,
              textAlign: 'center',
              marginLeft: moderateScale(30, 0.3),
              //   backgroundColor: 'black',
              width: windowWidth * 0.95,
            }}
            isBold>
            Add Product Details
          </CustomText>

          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
              textAlign: 'left',
              marginLeft: moderateScale(30, 0.3),
              marginTop: moderateScale(10, 0.3),
              //   backgroundColor: 'black',
              width: windowWidth * 0.95,
            }}
            isBold>
            Add Product Images
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color: Color.veryLightGray,
              marginLeft: moderateScale(30, 0.3),
              //   backgroundColor: 'black',
              width: windowWidth * 0.95,
            }}>
            Add upto 5 images. First image is your product's cover that will be
            highlighted everywhere
          </CustomText>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: moderateScale(10, 0.3),

              width: windowWidth * 0.95,
              flexWrap: 'wrap',
              // paddingHorizontal: moderateScale(10, 0.6),
            }}>
            {images?.length > 0 &&
              images?.map((item, index) => {
                // console.log(
                //   '🚀 ~ file: AddServices.js:149 ~ images.map ~ item:',
                //   item,
                // );
                return (
                  <View
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.08,
                      backgroundColor: 'black',
                      borderRadius: moderateScale(10, 0.6),
                      marginHorizontal: moderateScale(20, 0.3),

                      // alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: Color.veryLightGray,
                      borderWidth: 1,
                      overflow: 'hidden',
                      marginRight: moderateScale(10, 0.6),
                      marginBottom: moderateScale(10, 0.3),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setImages(images.filter(i => i?.uri != item?.uri));
                      }}
                      style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        borderRadius: moderateScale(5, 0.6),
                        zIndex: 1,
                        right: 3,
                        top: 3,
                      }}>
                      <Icon
                        onPress={() => {
                          setImages(images.filter(i => i?.uri != item?.uri));
                        }}
                        name={'cross'}
                        as={Entypo}
                        size={4}
                        color={Color.black}
                      />
                    </TouchableOpacity>
                    <CustomImage
                      source={{uri: item?.photo ? item?.photo : item?.uri}}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                );
              })}
            {images.length < 5 && (
              <TouchableOpacity
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.08,
                  marginHorizontal: moderateScale(20, 0.3),
                  borderRadius: moderateScale(10, 0.6),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: Color.veryLightGray,
                  borderWidth: 1,
                }}
                onPress={() => {
                  setImagePickerModal(true);
                }}>
                <Icon name={'plus'} as={AntDesign} size={5} />
              </TouchableOpacity>
            )}
          </View>
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
              textAlign: 'left',
              marginLeft: moderateScale(30, 0.3),
              marginTop: moderateScale(10, 0.3),
              //   backgroundColor: 'black',
              width: windowWidth * 0.95,
            }}
            isBold>
            Enter Product Details
          </CustomText>

          <TextInputWithTitle
            titleText={'Title'}
            placeholder={'Title'}
            setText={setTitle}
            value={title}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.9}
            border={1}
            // borderColor={Color.white}
            backgroundColor={Color.white}
            marginTop={moderateScale(15, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
          <TextInputWithTitle
            titleText={'Sub Title'}
            placeholder={'Products e.g: dress, scarf, stationary'}
            setText={setSubTitle}
            value={subTitle}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.9}
            border={1}
            // borderColor={Color.white}
            backgroundColor={Color.white}
            marginTop={moderateScale(15, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
          <TextInputWithTitle
            titleText={'Total Quantity'}
            placeholder={'Total Quantity'}
            setText={setQuantity}
            value={quantity}
            keyboardType={'numeric'}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.9}
            border={1}
            // borderColor={Color.white}
            backgroundColor={Color.white}
            marginTop={moderateScale(15, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
          <TextInputWithTitle
            titleText={'Price'}
            keyboardType={'numeric'}
            placeholder={'Price'}
            setText={setPrice}
            value={price}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.9}
            border={1}
            // borderColor={Color.white}
            backgroundColor={Color.white}
            marginTop={moderateScale(15, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
              textAlign: 'left',
              marginLeft: moderateScale(30, 0.3),
              marginTop: moderateScale(15, 0.3),
              //   backgroundColor: 'black',
              width: windowWidth * 0.95,
            }}
            isBold>
            Select Available Sizes
          </CustomText>

          <DropDownSingleSelect
            array={sizesArray}
            item={size}
            setItem={setSize}
            placeholder={'sizes'}
            width={windowWidth * 0.9}
            dropDownHeight={windowHeight * 0.06}
            // backgroundColor={Color.purple}
            dropdownStyle={{
              width: windowWidth * 0.9,
              borderBottomWidth: 0,
              // backgroundColor : 'red'
            }}
            borderColor={Color.lightGrey}
            elevation
            // backgroundColor={'white'}
          />
          {sizes?.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'black',
                marginTop: moderateScale(15, 0.3),
                width: windowWidth * 0.95,
                //   marginLeft: moderateScale(20, 0.3),
              }}>
              {sizes?.map(item => {
                return (
                  <View
                    style={{
                      width: moderateScale(30, 0.6),
                      height: moderateScale(30, 0.6),
                      borderRadius: moderateScale(30, 0.6) / 2,
                      marginHorizontal: moderateScale(5, 0.3),
                      backgroundColor: Color.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: Color.veryLightGray,
                      borderWidth: 1,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSizes(sizes.filter(i => i != item));
                      }}
                      style={{
                        position: 'absolute',
                        backgroundColor: Color.themeBlue,
                        borderRadius: moderateScale(5, 0.6),
                        zIndex: 1,
                        right: -4,
                        top: -4,
                      }}>
                      <Icon
                        onPress={() => {
                          setSizes(sizes.filter(i => i != item));
                        }}
                        name={'cross'}
                        as={Entypo}
                        size={4}
                        color={Color.white}
                      />
                    </TouchableOpacity>
                    <CustomText
                      style={{
                        fontSize: moderateScale(12, 0.6),
                        color: 'black',
                      }}>
                      {item}
                    </CustomText>
                  </View>
                );
              })}
            </View>
          )}
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
              textAlign: 'left',
              marginLeft: moderateScale(30, 0.3),
              marginTop: moderateScale(10, 0.3),
              //   backgroundColor: 'black',
              width: windowWidth * 0.95,
            }}
            isBold>
            Select Available Colors
          </CustomText>

          <CustomButton
            onPress={() => {
              if (colors.length < 6) {
                setColorModal(true);
              } else {
                Platform.OS == 'android'
                  ? ToastAndroid.show(
                      'You can only add 6 colors',
                      ToastAndroid.SHORT,
                    )
                  : Alert.alert('You can only add 6 colors');
              }
            }}
            text={'Add Colors'}
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(15, 0.3)}
            bgColor={Color.themeBlue}
            borderRadius={moderateScale(5, 0.3)}
            // isGradient
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              //   backgroundColor: 'black',
              marginTop: moderateScale(10, 0.3),
              width: windowWidth * 0.95,
              //   marginLeft: moderateScale(20, 0.3),
            }}>
            {colors.map(item => {
              return (
                <View
                  style={{
                    width: moderateScale(30, 0.6),
                    height: moderateScale(30, 0.6),
                    borderRadius: moderateScale(30, 0.6) / 2,
                    marginHorizontal: moderateScale(5, 0.3),
                    backgroundColor: item,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setColors(colors.filter(i => i != item));
                    }}
                    style={{
                      position: 'absolute',
                      backgroundColor: Color.themeBlue,
                      borderRadius: moderateScale(5, 0.6),
                      zIndex: 1,
                      right: -3,
                      top: -3,
                    }}>
                    <Icon
                      onPress={() => {
                        setColors(colors.filter(i => i != item));
                      }}
                      name={'cross'}
                      as={Entypo}
                      size={4}
                      color={Color.white}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <CustomButton
          disabled={false}
          isBold
          onPress={() => {
            if (item) {
              updateProduct(item?.id);
            } else {
              addProduct();
            }
          }}
          text={
            isLoading ? (
              <ActivityIndicator
                size={moderateScale(25, 0.6)}
                color={'white'}
              />
            ) : item ? (
              'Update'
            ) : (
              'Save'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          fontSize={moderateScale(16, 0.6)}
          // marginBottom={moderateScale(10,.3)}
          // marginTop={moderateScale(20, 0.3)}
          bgColor={Color.themeBlue}
          borderRadius={moderateScale(30, 0.3)}
          // isGradient
        />
      </View>
      <ImagePickerModal
        show={imagePickerModal}
        setShow={setImagePickerModal}
        setFileObject={setImage}
      />
      <Modal
        isVisible={colorModal}
        onBackdropPress={() => {
          setColorModal(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View>
          <TriangleColorPicker
            onColorSelected={color => {
              if (colors.includes(color)) {
                Alert.alert('already selected');
              } else {
                setColors(prev => [...prev, color]),
                  Platform.OS == 'android'
                    ? ToastAndroid.show('Color is Selected', ToastAndroid.SHORT)
                    : Alert.alert('Color is Selected');
                setColorModal(false);
              }
            }}
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.3,
              marginTop: moderateScale(40, 0.3),
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default AddProduct;

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
    backgroundColor: 'transparent',
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
    backgroundColor: Color.themeBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: windowWidth * 0.95,
    // height: windowHeight * 0.8,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: moderateScale(10, 0.3),
    shadowColor: '#0000000A',
    shadowOffset: {width: 0, height: 2},
    paddingVertical: moderateScale(20, 0.6),
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
