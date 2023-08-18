import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
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
import {ToastAndroid} from 'react-native';
import {Alert} from 'react-native';
import {TriangleColorPicker} from 'react-native-color-picker';
import Modal from 'react-native-modal';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {bindActionCreators} from 'redux';
import navigationService from '../navigationService';

const AddServices = props => {
  const item = props?.route?.params?.item;
  console.log('🚀 ~ file: DressesDetail.js:28 ~ DressesDetail ~ item:', item);
  const user = useSelector(state => state.commonReducer.userData);
  const [images, setImages] = useState(['plus']);
  console.log('🚀 ~ file: AddProduct.js:36 ~ AddProduct ~ images:', images);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [charges, setCharges] = useState();
  const [imagePickerModal, setImagePickerModal] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    if (Object.keys(image).length > 0) {
      setImages(prev => [...prev, image?.uri]);
      setImage({});
    }
  }, [image]);

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header showBack={true} headerColor={['#CBE4E8', '#D2E4E4']}  />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
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
            Add Service Details
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
            Add Sample Images
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
              // marginHorizontal:moderateScale(20,.3),
              //   backgroundColor: 'orange',
              width: windowWidth * 0.95,
              // paddingHorizontal: moderateScale(10, 0.6),
            }}>
            {images.length > 0 && (
              <FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                  {
                    // backgroundColor:'purple'
                  }
                }
                renderItem={({item, index}) => {
                  console.log(
                    '🚀 ~ file: AddProduct.js:133 ~ AddProduct ~ item:',
                    item,
                  );
                  return (
                    <>
                      {index == 0 ? (
                        images?.length < 6 ? (
                          <TouchableOpacity
                            style={{
                              width: windowWidth * 0.2,
                              height: windowHeight * 0.08,
                              marginHorizontal: moderateScale(10, 0.3),
                              // backgroundColor: 'red',
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
                        ) : (
                          <></>
                        )
                      ) : (
                        <View
                          style={{
                            width: windowWidth * 0.2,
                            height: windowHeight * 0.08,
                            backgroundColor: 'black',
                            borderRadius: moderateScale(10, 0.6),
                            marginHorizontal: moderateScale(5, 0.3),

                            // alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: Color.veryLightGray,
                            borderWidth: 1,
                            overflow: 'hidden',
                            marginRight: moderateScale(10, 0.6),
                          }}>
                          <CustomImage
                            source={{uri: item}}
                            style={{width: '100%', height: '100%'}}
                          />
                        </View>
                      )}
                    </>
                  );
                }}
              />
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
            Enter Service Details
          </CustomText>

          <TextInputWithTitle
            // iconName={'email'}
            // iconType={Fontisto}
            // LeftIcon={true}
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
            // iconName={'email'}
            // iconType={Fontisto}
            // LeftIcon={true}
            titleText={'Category'}
            placeholder={'Category'}
            setText={setCategory}
            value={category}
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
            // iconName={'email'}
            // iconType={Fontisto}
            // LeftIcon={true}
            titleText={'Charges'}
            placeholder={'Charges'}
            setText={setCharges}
            value={charges}
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
            maxLength={2000}
            titleText={'Description'}
            secureText={false}
            placeholder={'Give a brief description of your service.'}
            setText={setDescription}
            value={description}
            viewHeight={0.2}
            inputHeight={0.22}
            viewWidth={0.9}
            inputWidth={0.8}
            border={1}
            // borderColor={Color.veryLightGray}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.red}
            placeholderColor={Color.veryLightGray}
            borderRadius={moderateScale(5, 0.3)}
            multiline
            elevation
          />
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <CustomButton
          isBold
          onPress={() => {
            const body = {
              name: title,
              category: category,
              charges: charges,
              description: description,
            };
            for (let key in body) {
              // if (key == 'charges') {
              //   typeof body[key] != 'number' && Platform.OS == 'android'
              //     ? ToastAndroid.show('Charges should be number', ToastAndroid.SHORT)
              //     : Alert.alert('Charges is required');
              // }
              if (body[key] == '') {
                console.log(key);
                return Platform.OS == 'android'
                  ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
                  : Alert.alert(`${key} is required`);
              }
            }
            console.log(
              '🚀 ~ file: AddServices.js:285 ~ AddServices ~ body:',
              body,
            );
            navigation.goBack();
          }}
          text={'Save'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          fontSize={moderateScale(16, 0.6)}
          // marginBottom={moderateScale(10,.3)}
          // marginTop={moderateScale(20, 0.3)}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(30, 0.3)}
          // isGradient
        />
      </View>
      <ImagePickerModal
        show={imagePickerModal}
        setShow={setImagePickerModal}
        setFileObject={setImage}
      />
    </>
  );
};

export default AddServices;

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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: Color.themeColor,
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
