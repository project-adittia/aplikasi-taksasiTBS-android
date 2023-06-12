/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styles from '../style/style';

const StartPages = ({navigation}) => {
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
          <View style={styles.cardStartPage}></View>
          <View style={styles.cardStartPage}>
            <View style={styles.cardButton}>
              <TouchableOpacity
                style={styles.buttonLoginawal}
                onPress={() => navigation.navigate('Auth')}>
                <Text style={styles.textButton}>MASUK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default StartPages;
