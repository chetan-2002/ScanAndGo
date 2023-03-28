import {Box, Button, Center, IconButton, Text} from 'native-base';
import {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {auth, db} from '../firebase-config';

import {addDoc, collection, onSnapshot, query, where} from 'firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanQr = ({navigation}) => {
  const [data, setData] = useState('');

  const removeItem = async () => {
    await AsyncStorage.removeItem('UID')
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => console.log(error));
  };
  navigation.setOptions({
    headerRight: () => {
      return (
        <IconButton
          onPress={() => {
            removeItem();
          }}
          icon={
            <MaterialIcons name="logout" size={24} color="black" />
          }></IconButton>
      );
    },
  });

  const allowRead = async e => {};
  const handleRead = async e => {
    await AsyncStorage.getItem('UID')
      .then(uid => {
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
      })
      .catch(error => {
        console.log(error);
      });
    setData(e.data);
    navigation.navigate('Success');
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
