import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/LoginScreen';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import Signup from './Screens/Signup';
import ChangePassword from './Screens/ChangePassword';
// import HomeScreen from './Screens/HomeScreen';
import LogoScreen from './Screens/LogoScreen';
import GetStarted from './Screens/GetStarted';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Color from './Assets/Utilities/Color';
import WalkThroughScreen from './Screens/WalkthroughScreen';

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  console.log("🚀 ~ file: appNavigation.js:27 ~ AppNavigator ~ walkThrough:", walkThrough)
  
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: appNavigation.js:33 ~ AppNavigator ~ token:', token);

  // console.log('token>>>>', token);
  // console.log('isVerified', isGoalCreated);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
    walkThrough == false ? 
    'WalkThroughScreen' :
    // token != null
    // ? 'HomeScreen' :
     'GetStarted';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
         <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="GetStarted" component={GetStarted} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="WalkThroughScreen" component={WalkThroughScreen} />

        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

// export const MyDrawer = () => {
//   const DrawerNavigation = createDrawerNavigator();
//   const firstScreen = 'HomeScreen';
//   return (
//     <DrawerNavigation.Navigator 
//      drawerContent={props => <Drawer {...props}/>}
//      initialRouteName={HomeScreen}
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           backgroundColor: '#c6cbef',
//           width: '100%',
//         },
//       }}
//      >
//       <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} 
//        options={{
//         drawerIcon: ({focused, size , color}) => (
//           <Ionicons
//              name="md-home"
//              size={size}
//              color={focused ? color : '#ccc'}
//           />),
//         title: 'Home',
//         drawerActiveBackgroundColor: Color.themeBgColor,
//         drawerActiveTintColor : Color.themeColor ,
//       }}
//        />
//       <DrawerNavigation.Screen name="AssetScreen" component={AssetScreen} 
//        options={{
//         drawerIcon: ({focused, size , color}) => (
//           <Ionicons
//              name="lock-closed"
//              size={size}
//              color={focused ? color : '#ccc'}
//           />),
//         title: 'AssetScreen',
//         drawerActiveBackgroundColor: Color.themeBgColor,
//         drawerActiveTintColor : Color.themeColor ,
//       }}/>
//     </DrawerNavigation.Navigator>
//   );
// };

export default AppNavigator;
