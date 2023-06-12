/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, ImageBackground, ActivityIndicator} from 'react-native';
import styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('role').then(value =>
        navigation.replace(
          value === null
            ? 'StartPage'
            : value === 'admin'
            ? 'AdminStack'
            : 'UserStack',
        ),
      );
    }, 2000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View>
      <ImageBackground
        source={require('../img/background.png')}
        style={styles.background}>
        <View style={styles.container}>
          <View style={styles.cardStartPage}>
            <View style={styles.cardTitle}>
              <Text style={styles.titleStarpage}>
                Aplikasi Sistem Monitoring dan Perhitungan Taksasi Tandan Buah
                Segar Kelapa Sawit
              </Text>
            </View>
          </View>
          <View style={styles.cardStartPage} />
          <View style={styles.cardStartPage}>
            <View style={styles.cardButton}>
              <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
