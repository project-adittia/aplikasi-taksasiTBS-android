/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
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

export const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [userArray, setUserArray] = useState([]);

  const passwordInputref = React.createRef();

  const HandleLogin = async e => {
    setErrorText('');
    if (!username) {
      setErrorText('Silahkan isi username anda!');
      return;
    }
    if (!password) {
      setErrorText('Masukkan password akun anda!');
      return;
    }
    setLoading(true);

    e.preventDefault();
    try {
      await axios
        .post('http://156.67.217.28:8080/api/login', {
          username: username,
          password: password,
        })
        .then(function (response) {
          if (response.data.role === 'admin') {
            AsyncStorage.setItem('token', response.data.accessToken);
            AsyncStorage.setItem('role', response.data.role);
            navigation.navigate('AdminStack');
            console.log('Admin berhasil Login');
          } else {
            const handle_id = response.data.UserId;
            AsyncStorage.setItem('id_user', handle_id.toString());
            AsyncStorage.setItem('token', response.data.accessToken);
            AsyncStorage.setItem('role', response.data.role);
            // AsyncStorage.setItem('verifikasi', response.data.verified);

            if (response.data.verified === false) {
              AsyncStorage.setItem('verifikasi', '0');
            } else {
              AsyncStorage.setItem('verifikasi', '1');
            }

            navigation.navigate('UserStack');
            console.log('User berhasil Login');
            console.log('id user', response.data.UserId);
          }
        });
    } catch (error) {
      setErrorText('Error');
    }
    setLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../img/background.png')}
        style={styles.background}>
        <KeyboardAvoidingView behavior="height">
          <View style={styles.container2}>
            <View style={styles.cardLoginPageTitle}>
              <View style={styles.titleFormLogin}>
                <Image
                  source={require('../img/user.png')}
                  style={{width: 60, height: 60}}
                />
                <Text style={styles.titleLoginpage}>LOGIN</Text>
              </View>
            </View>
            <View style={styles.cardLoginForm}>
              <View style={styles.cardLogin}>
                <Text style={styles.textTitle}>Username</Text>
                <TextInput
                  placeholder="Username"
                  style={styles.inputLogin}
                  onChangeText={Username => setUsername(Username)}
                />
                <Text style={styles.textTitle}>Password</Text>
                <TextInput
                  placeholder="Password"
                  style={styles.inputLogin}
                  onChangeText={Password => setPassword(Password)}
                  secureTextEntry={true}
                  keyboardType="default"
                  ref={passwordInputref}
                  blurOnSubmit={false}
                  onSubmitEditing={Keyboard.dismiss}
                />

                {errortext !== '' ? (
                  <Text style={styles.errorTextStyle}>{errortext}</Text>
                ) : null}

                <TouchableOpacity
                  style={styles.buttonLogin}
                  activeOpacity={0.5}
                  onPress={HandleLogin}>
                  <Text style={styles.textButton}>MASUK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{top: 15}}
                  onPress={() => navigation.navigate('RegisterPage')}>
                  <Text style={{color: '#4cad7e', fontWeight: 'bold'}}>
                    Belum mendaftarkan akun?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{top: 50}}>
                  <View style={{flexDirection: 'row'}}>
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
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
