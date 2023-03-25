import AnimatedLottieView from 'lottie-react-native';
import {Box, Button, Center, HStack, IconButton, Text} from 'native-base';
import assets from '../assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Success = ({navigation}) => {
  return (
    <Center width={'100%'}>
      <Box
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AnimatedLottieView source={assets.lottieFiles.success} autoPlay loop />
      </Box>
      {/* <Button
        android_ripple={{color: 'white'}}
        style={{
          width: '90%',
        }}>
        <Text
          style={{
            padding: 2,
            color: 'white',
            fontSize: 18,
          }}>
          Log Out
        </Text>
      </Button> */}
    </Center>
  );
};
export default Success;
