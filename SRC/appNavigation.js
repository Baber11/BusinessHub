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
import HomeScreen from './Screens/HomeScreen';
import Drawer from './Drawer/Drawer';
import AdminDashboard from './Screens/AdminDashboard';
import CustomerDashboard from './Screens/CustomerDashboard';
import ProductDetails from './Screens/ProductDetails';
import CartScreen from './Screens/CartScreen';
import HomeScreenOther from './Screens/HomeScreenOther';

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const role = useSelector(state => state.authReducer.role);
  console.log("🚀 ~ file: appNavigation.js:31 ~ AppNavigator ~ role:", role)

  console.log("🚀 ~ file: appNavigation.js:27 ~ AppNavigator ~ walkThrough:", walkThrough)
  
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: appNavigation.js:33 ~ AppNavigator ~ token:', token);

  // console.log('token>>>>', token);
  // console.log('isVerified', isGoalCreated);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const HomeScreen = role == 'admin' ? 'MyDrawer' : 'HomeScreenOther' 
    const firstScreen =
    !walkThrough ? 
    'WalkThroughScreen' :
    token != null
    ? HomeScreen :
     'GetStarted';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
         <RootNav.Screen name="LoginScreen" component={LoginScreen} />
         <RootNav.Screen name="HomeScreen" component={HomeScreen} />
          <RootNav.Screen name="GetStarted" component={GetStarted} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="ProductDetails" component={ProductDetails} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="CartScreen" component={CartScreen} />
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen name="WalkThroughScreen" component={WalkThroughScreen} />
          <RootNav.Screen name="HomeScreenOther" component={HomeScreenOther} />


        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const firstScreen = 'HomeScreen';
  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,      
      }}>
      <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} />
      

      <DrawerNavigation.Screen
        name="AdminDashboard"
        component={AdminDashboard}
       
      />
      <DrawerNavigation.Screen
        name="CustomerDashboard"
        component={CustomerDashboard}
       
      />
       
    </DrawerNavigation.Navigator>
  );
};
export default AppNavigator;
