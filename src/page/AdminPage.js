/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ImageBackground, Modal} from 'react-native';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../style/style';
import moment from 'moment/moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 192.168.0.114 IP adress local

const AdminPage = ({navigation}) => {
  const Logout = async () => {
    try {
      await axios.delete('http://localhost:8080/api/logout');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      navigation.navigate('StartPage');
    } catch (error) {
      console.log(error);
    }
  };

  const [sapaan, setSapaan] = useState('');
  const [idchange, setIdchange] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (moment().format('HH') < 12) {
      setSapaan('Pagi');
    } else if (moment().format('HH') < 15) {
      setSapaan('Siang');
    } else if (moment().format('HH') < 18) {
      setSapaan('Sore');
    } else {
      setSapaan('Malam');
    }
    getDataUser();
  }, [idchange]);

  const [dataUser, setDataUser] = useState([]);

  const getDataUser = async () => {
    await axios
      .get('http://localhost:8080/api/alluser')
      .then(response => {
        const arrUser = response.data;
        const handleUser = [];

        arrUser.map(item => {
          if (item.role === 'user') {
            handleUser.push(item);
          }
        });

        setDataUser(handleUser);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [idVerif, setIdVerif] = useState('');

  const VerificationUser = async () => {
    try {
      await axios
        .put('http://localhost:8080/api/verify/' + idVerif)
        .then(response => {
          setIdchange(idVerif);
          console.log('Berhasil Diverifikasi');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const Listuser = dataUser.map((item, index) => {
    return (
      <View key={index} style={styles.styleTable2}>
        <Text style={styles.texttab}>{index + 1}</Text>
        <Text style={styles.texttab}>{item.nama}</Text>
        <Text style={styles.texttab}>
          {item.verified ? (
            '✔️'
          ) : (
            <TouchableOpacity
              onPress={() => {
                setIdVerif(item.id);
                VerificationUser();
              }}>
              <Text style={styles.texttab}> Verifikasi </Text>
            </TouchableOpacity>
          )}
        </Text>
      </View>
    );
  });

  return (
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
          <Text style={styles.textGreetings}>Selamat {sapaan} Admin</Text>
          <Text style={styles.textInstructionsAdmin}>
            Silahkan klik tombol di bawah ini untuk pergi menuju Halaman
            Taksasi.
          </Text>
          <TouchableOpacity
            style={styles.buttonTaksasi}
            onPress={() => navigation.navigate('ResultPage')}>
            <Text style={styles.textButton}>Hasil Taksasi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardListUser}>
          <Text style={styles.textTabAdmin}>Petugas Taksasi</Text>
          <Text style={styles.textInstructionsAdmin}>
            Di bawah ini merupakan daftar Petugas AKP aktif yang melakukan
            taksasi.
          </Text>
          <View style={styles.styleTable2}>
            <Text style={styles.texttab}>No</Text>
            <Text style={styles.texttab}>Nama Petugas</Text>
            <Text style={styles.texttab}>Status Verifikasi</Text>
          </View>
          <ScrollView>{Listuser}</ScrollView>
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
              <Text>Close Modal</Text>
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
  );
};

export default AdminPage;
