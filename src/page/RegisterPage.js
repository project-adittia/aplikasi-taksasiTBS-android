/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Keyboard,
} from 'react-native';
import styles from '../style/style';

export const SignUp = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [role, setRole] = useState('user');
  const [msg, setMsg] = useState('');

  const Register = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/signup', {
        name: nama,
        username: username,
        password: password,
        role: role,
        confPassword: confpassword,
      });
      navigation.navigate('LoginPage');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <View style={{flex:1}}>
      <ImageBackground
        source={require('../img/background.png')}
        style={styles.background}>
        <View style={styles.container2}>
          <View style={styles.cardLoginPageTitle}>
            <View style={styles.titleFormLogin}>
              <Image
                source={require('../img/user.png')}
                style={{width: 60, height: 60}}
              />
              <Text style={styles.titleLoginpage}>DAFTAR</Text>
            </View>
          </View>
          <View style={styles.cardLoginForm}>
            <View style={styles.cardLoginreg}>
              <Text style={styles.textTitle}>Nama     </Text>
              <TextInput
                placeholder="Nama Lengkap"
                style={styles.inputLoginreg}
                onChangeText={Nama => setNama(Nama)}
              />
              <Text style={styles.textTitle}>Username</Text>
              <TextInput
                placeholder="Username"
                style={styles.inputLoginreg}
                onChangeText={Username => setUsername(Username)}
              />
              <Text style={styles.textTitle}>Password</Text>
              <TextInput
                placeholder="Password"
                style={styles.inputLoginreg}
                onChangeText={Password => setPassword(Password)}
                secureTextEntry={true}
                keyboardType="default"
                blurOnSubmit={false}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.textconfirm}>Konfirmasi Password</Text>
              <TextInput
                placeholder="Masukan kembali password anda"
                style={styles.inputLoginreg}
                onChangeText={confPassword => setConfPassword(confPassword)}
                secureTextEntry={true}
                keyboardType="default"
                blurOnSubmit={false}
                onSubmitEditing={Keyboard.dismiss}
              />

              {/* {errortext != '' ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null} */}

              <TouchableOpacity
                style={styles.buttonDaftar}
                activeOpacity={0.5}
              >
                <Text style={styles.textButton} onPress={Register}>
                  DAFTAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{flexDirection: 'row', top: 25}}>
                  <Text style={{color: '#4cad7e'}}>Hubungi Admin</Text>
                  <Image
                    source={require('../img/whatsapp.png')}
                    style={{width: 15, height: 15, marginLeft: 5}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
