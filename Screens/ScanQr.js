import {Box, Button, Center, IconButton, Text} from 'native-base';
import {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {auth, db} from '../firebase-config';
import AnimatedLottieView from 'lottie-react-native';
import {addDoc, collection, onSnapshot, query, where} from 'firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';

const ScanQr = ({navigation}) => {
  const [data, setData] = useState('');
  // const [cameraAllow, setCameraAllow] = useState(true);
  navigation.setOptions({
    headerRight: () => {
      return (
        <IconButton
          onPress={() => navigation.replace('Login')}
          icon={
            <MaterialIcons name="logout" size={24} color="black" />
          }></IconButton>
      );
    },
  });
  const handleRead = async e => {
    setData(e.data);
    // Alert.alert('Success', 'Attendance Marked Successfully');
    const currentUser = auth?.currentUser;
    const uid = currentUser?.uid;
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    onSnapshot(q, querySnapshot => {
      querySnapshot.forEach(doc => {
        addDoc(collection(db, 'attendance'), {
          name: doc.data().name,
          email: doc.data().email,
          enrollmentno: doc.data().enrollmentno,
          date: new Date().toUTCString(),
          time: new Date().toLocaleTimeString(),
          collegeName: e.data.toUpperCase(),
        });
      });
    });

    navigation.navigate('Success');
    // setData('');
  };
  return (
    <>
      {data ? (
        <>
          <Box
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Button
              onPress={() => {
                setData('');
              }}>
              <Text
                style={{
                  padding: 2,
                  color: 'white',
                  fontSize: 18,
                }}>
                Scan Again
              </Text>
            </Button>
          </Box>
        </>
      ) : (
        <Box height={'100%'}>
          <QRCodeScanner
            onRead={e => handleRead(e)}
            reactivate={data ? false : true}
            showMarker={true}></QRCodeScanner>
        </Box>
      )}
    </>
  );
};

export default ScanQr;
