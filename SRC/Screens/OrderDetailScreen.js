import {View, ImageBackground , TouchableOpacity} from 'react-native';
import React , {useRef,useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import Color from '../Assets/Utilities/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Divider, FlatList, Icon} from 'native-base';
import { useNavigation } from '@react-navigation/native';
// import Color from '../Assets/Utilities/Color';

const OrderDetailScreen = props => {
  const navigation = useNavigation()
  const [index , setIndex] = useState(0)
  // const [flatListRef,setFlatListref] = useState()
  // console.log(
  //   '🚀 ~ file: Walkthrough.js:62 ~ Walkthrough ~ viewableItems',
  //   flatListRef,
  // );
  const onViewableItemsChanged = ({viewableItems}) => {
    console.log(
      '🚀 ~ file: Walkthrough.js:62 ~ Walkthrough ~ viewableItems',
      viewableItems,
    );
    setIndex(viewableItems[0]?.index);
  
  };

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 100
  }
  // const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged }])

  const scrollToIndex = index => {
    console.log(
      '🚀 ~ file: BottomSheetSelect.js:50 ~ scrollToIndex ~ index:',
      index,
    );
    flatListRef.current.scrollToIndex({animated: true, index});
  };

  const listing = [
    {
      id: 1,
      name: 'Size',
      size: 24,
    },
    {
      id: 2,
      name: 'google mount',
      size: 24,
    },
    {
      id: 3,
      name: 'Frame',
      size: 24,
    },
    {
      id: 4,
      name: 'made In',
      size: 24,
    },
    {
      id: 5,
      name: 'Designed In',
      size: 24,
    },
  ];

  const item = props.route.params.item;
  console.log('Item Data======>>>>>>>>>>>>>>>>>>', item);
  return (
    <ImageBackground
      source={require('../Assets/Images/imageBackground.png')}
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#eeeeee',
      }}>
          <FlatList
        pagingEnabled
        horizontal
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsHorizontalScrollIndicator={false}
        data={item?.order}
        contentContainerStyle={{
          alignSelf: 'center',
 }}
        style={{
          flexGrow: 0,
        }}
        renderItem={({item, index}) => {
          return (
            <View 
            style={{
              width : windowWidth,
              height : windowHeight * 0.9,
            }}
           
            // scrollEventThrottle={16}

            
            >

            
      <CustomText
        style={{
          color: '#000',
          fontSize: moderateScale(22, 0.6),
          textAlign: 'center',
          marginTop: moderateScale(30, 0.3),
        }}>
        {item.Title}
      </CustomText>
      <CustomText
        style={{
          color: Color.veryLightGray,
          fontSize: moderateScale(11, 0.6),
          textAlign: 'center',
        }}>
        {item?.subTitle}
      </CustomText>

    
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.3,
                backgroundColor: 'transparent',
              }}>
              <CustomImage
                source={item?.images[0]}
                style={{
                  height: '100%',
                  width: '100%',
                  // backgroundColor : 'red'
                }}
                resizeMode={'contain'}
              />
            </View>
       

      <View
        style={{
          flexDirection: 'row',
          marginTop: moderateScale(15, 0.3),
          paddingHorizontal: moderateScale(15, 0.6),
          alignItems: 'center',
          width: '100%',
        }}>
        {item?.colors.map((data, index) => {
          return (
            <View
              style={{
                width: windowWidth * 0.06,
                height: windowWidth * 0.06,
                borderRadius: (windowWidth * 0.06) / 2,
                backgroundColor: data.toLocaleLowerCase(),
                borderWidth: 1,
                marginRight: moderateScale(7, 0.3),
                justifyContent : 'center',
                alignItems : 'center'
              }}>
                { data.toLocaleLowerCase() == item?.selectedColor.toLocaleLowerCase() &&
                  <Icon 
                  name ={'check'}
                  as={FontAwesome}
                  size={moderateScale(15,0.3)}
                  color={'green'}
                  
                  />

                }

              </View>
          );
        })}

        <CustomText
          style={{
            color: '#0a0d38',
            fontSize: moderateScale(25, 0.6),
            position: 'absolute',
            right: 10,
          }}>
          ${item?.price}
        </CustomText>
      </View>

    
       <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(20, 0.3),
                paddingHorizontal: moderateScale(18, 0.6),
              }}>
              <CustomText
                style={{color: Color.ver, fontSize: moderateScale(12, 0.6)}}>
                Size
              </CustomText>

              <CustomText
                style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                {item.selectedSize}
              </CustomText>
            </View>
            <Divider
              my="2"
              width="96"
              alignSelf={'center'}
              _light={{bg: 'gray.200'}}
            />
             <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(20, 0.3),
                paddingHorizontal: moderateScale(18, 0.6),
              }}>
              <CustomText
                style={{color: Color.ver, fontSize: moderateScale(12, 0.6)}}>
               Category
              </CustomText>

              <CustomText
                style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                {item.subTitle}
              </CustomText>
            </View>
            <Divider
              my="2"
              width="96"
              alignSelf={'center'}
              _light={{bg: 'gray.200'}}
            />

<View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(20, 0.3),
                paddingHorizontal: moderateScale(18, 0.6),
              }}>
              <CustomText
                style={{color: Color.veryLightGray, fontSize: moderateScale(12, 0.6)}}>
                Quantity
              </CustomText>

              <CustomText
                style={{color: '#000', fontSize: moderateScale(15, 0.6)}}>
                {item.qty}
              </CustomText>
            </View>
            <Divider
              my="2"
              width="96"
              alignSelf={'center'}
              _light={{bg: 'gray.200'}}
            />
           

     
      </View>
         );
        }}
      />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width : windowWidth ,
            alignSelf : 'center',
            // backgroundColor:'red',
            justifyContent:'center'
            // position: 'absolute',
            // bottom: moderateScale(30, 0.6),
          }}>
          {item?.order.map((x, i) => {
            return (
              <View
                style={{
                  width:
                    index == i ? moderateScale(12, 0.6) : moderateScale(8, 0.6),
                  height:
                    index == i ? moderateScale(12, 0.6) : moderateScale(8, 0.6),
                  borderRadius:
                    index == i ? moderateScale(6, 0.6) : moderateScale(5, 0.6),
                  backgroundColor:
                    index == i ? Color.themeColor : Color.themeLightGray,
                  marginRight: moderateScale(4, 0.6),
                }}></View>
            );
          })}
        </View>
       <TouchableOpacity
        style={{
          width: windowWidth * 0.4,
          paddingVertical: moderateScale(20, 0.6),
          backgroundColor: '#fe7e37',
          position: 'absolute',
          bottom: moderateScale(90,0.6),
          alignSelf: 'center',
          shadowColor: '#fe7e37',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 10,
        }}
        onPress={()=>{
          navigation.goBack()
        }}
        >
        <CustomText
          style={{
            color: '#fff',
            fontSize: moderateScale(13, 0.6),
            textAlign: 'center',
          }}>
         Close
        </CustomText>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default OrderDetailScreen;
