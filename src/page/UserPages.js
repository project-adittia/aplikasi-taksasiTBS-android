/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ScrollView,
} from 'react-native';
import styles from '../style/style';
import moment from 'moment/moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserPage = ({navigation}) => {
  const Logout = async () => {
    try {
      await axios.delete('http://156.67.217.28:8080/api/logout');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('id_user');
      await AsyncStorage.removeItem('verifikasi');
      navigation.navigate('StartPage');
    } catch (error) {
      console.log(error);
    }
  };
  const [iduser, setIduser] = useState();
  const [verifikasi, setVerifikasi] = useState();
  const [dataHistoris, setDataHistoris] = useState([]);
  const [sapaan, setSapaan] = useState('');

  useEffect(() => {
    const getID = async () => {
      await AsyncStorage.getItem('id_user').then(value => {
        setIduser(value);
      });
    };

    const getStatus = async () => {
      await AsyncStorage.getItem('verifikasi').then(value => {
        setVerifikasi(value);
        console.log(value);
      });
    };

    if (moment().format('HH') < 12) {
      setSapaan('Pagi');
    } else if (moment().format('HH') < 15) {
      setSapaan('Siang');
    } else if (moment().format('HH') < 18) {
      setSapaan('Sore');
    } else {
      setSapaan('Malam');
    }

    getID();
    getStatus();
  }, [navigation]);

  useEffect(() => {
    const DataHistory = async () => {
      try {
        await axios
          .post('http://156.67.217.28:8080/api/history', {
            UserId: iduser,
          })
          .then(response => {
            const cek = response.data;
            setDataHistoris(cek);
            // console.log(cek);
          });
      } catch (error) {
        console.log(error);
      }
    };
    DataHistory();
  }, [iduser]);

  // console.log(verifikasi);

  const ListHistory = dataHistoris.map((item, index) => {
    return (
      <View key={index} style={styles.styleTable}>
        <Text style={styles.texttab}>{index + 1}</Text>
        <Text style={styles.texttab}>{item.nama_blok}</Text>
        <Text style={styles.texttab}>{item.jumlah_produksi}</Text>
        <Text style={styles.texttab}>{item.tanggal}</Text>
      </View>
    );
  });

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <ImageBackground
        source={require('../img/background.png')}
        style={styles.background}>
        <View style={styles.container3}>
          <View style={styles.cardWeather}>
            <View style={styles.weatherChild}>
              <Text style={styles.textDate}>
                {moment().format('DD MMMM YYYY')}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../img/location.png')}
                  style={{width: 25, height: 25}}
                />
                <Text style={styles.textLocation}>
                  Cikasungka, Bogor, Jawa Barat
                </Text>
              </View>
            </View>
            <View style={styles.weatherChild}>
              <Image
                source={require('../img/weather.png')}
                style={{width: 40, height: 40, right: 10}}
              />
              <Text style={styles.textTempeture}>29 C</Text>
            </View>
          </View>
          <View style={styles.cardUser}>
            <Text style={styles.textGreetings}>Selamat, {sapaan} User</Text>
            <Text style={styles.textInstructions}>
              Silahkan klik tombol di bawah ini untuk melakukan taksasi TBS
              kelapa sawit.
            </Text>
            {verifikasi === '0' ? (
              <TouchableOpacity
                style={styles.buttonTaksasi}
                disabled={true}
                onPress={() => navigation.navigate('FormTaksasi')}>
                <Text style={styles.textButton}>TAKSASI</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonTaksasi}
                onPress={() => navigation.navigate('FormTaksasi')}>
                <Text style={styles.textButton}>TAKSASI</Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              style={styles.buttonTaksasi}
              onPress={() => navigation.navigate('FormTaksasi')}>
              <Text style={styles.textButton}>TAKSASI</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.cardHistoryUser}>
            <Text style={styles.textInfo}>Riwayat Taksasi</Text>
            <Text style={styles.textInstructions}>
              Di bawah ini merupakan histori pekerjaan taksasi yang telah anda
              lakukan
            </Text>
            <View style={styles.styleTable}>
              <Text style={styles.texttab}>No</Text>
              <Text style={styles.texttab}>Nama Blok</Text>
              <Text style={styles.texttab}>Hasil Taksasi</Text>
              <Text style={styles.texttab}>Tanggal</Text>
            </View>
            {ListHistory}
          </View>
          <View style={styles.navbar}>
            <TouchableOpacity>
              <Image
                source={require('../img/message.png')}
                style={styles.imgnavbar}
              />
            </TouchableOpacity>
            <View style={styles.circleHome}>
              <TouchableOpacity>
                <Image
                  source={require('../img/home.png')}
                  style={styles.imgnavbar}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={require('../img/profile.png')}
                style={styles.imgnavbar}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalDrawer}>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>X | Close Modal</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, marginBottom: 20}}>
              <TouchableOpacity style={styles.buttonTaksasi} onPress={Logout}>
                <Text style={styles.textButton}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default UserPage;
