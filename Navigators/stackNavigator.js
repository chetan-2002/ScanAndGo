import {createStackNavigator} from '@react-navigation/stack';

import Login from '../Screens/Login';
import ScanQr from '../Screens/ScanQr';
import Signup from '../Screens/Signup';
import Success from '../Screens/Success';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ScanQr"
        component={ScanQr}
        options={{
          headerTitle: 'Scan QR Code',
        }}
      />
      {/* <Stack.Screen
        name="GenerateQR"
        component={GenerateQr}
        options={{
          headerTitle: 'Generate QR Code',
        }}
      /> */}
      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="AttendanceList"
        component={AttendanceList}></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default MyStack;
