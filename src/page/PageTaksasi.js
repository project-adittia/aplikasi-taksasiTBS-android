/* eslint-disable prettier/prettier */
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormTaksasi = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [dataBlok, setDataBlok] = useState([]);

  const [handlepokoktotal, setHandlepokoktotal] = useState('');
  const [handlepokoksampel, setHandlepokoksampel] = useState('');
  const [handlebuahmatang, setHandlebuahmatang] = useState('');
  const [handleluas, setHandleluas] = useState('');

  const [daftarblok, setDaftarblok] = useState([]);

  const APIget = async () => {
    await axios
      .get('http://localhost:8080/api/blok')
      .then(res => {
        // console.log(res.data);
        const datablok = res.data;

        const dropblok = [];
        const listblok = [];

        datablok.forEach((item, index) => {
          dropblok.push({
            id: item.id,
            blok: item.nama_blok,
            tahun_tanam: item.tahun_tanam,
            jumlah_pokok: item.jumlah_pokok,
            rbt: item.rbt,
          });
          listblok.push({
            label: item.nama_blok,
            value: item.nama_blok,
          });
        });
        setDataBlok(dropblok);
        setItems(listblok);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [iduser, setIduser] = useState();

  useEffect(() => {
    AsyncStorage.getItem('id_user').then(value => {
      setIduser(value);
    });
    APIget();
  }, [daftarblok]);

  const HandleParameterBlok = () => {
    dataBlok.forEach(async (item, index) => {
      if (item.blok === value) {
        const angka_kerapatan_panen = parseInt(
          handlepokoksampel / handlebuahmatang,
        );
        const tandan_panen = parseInt(
          handlepokoktotal / (handlepokoksampel / handlebuahmatang),
        );

        // await axios
        // .post('http://localhost:5000/predict', {
        //   datas: [
        //     blok,
        //     parseInt(item.tahun_tanam),
        //     parseInt(handleluas),
        //     item.jumlah_pokok,
        //     parseInt(handlepokoksampel),
        //     parseInt(handlebuahmatang),
        //     angka_kerapatan_panen,
        //     item.rbt,
        //     tandan_panen,
        //   ],
        // });
        // let result_predict;

        await axios
          .post('http://localhost:5000/predict-taksasi', {
            datas: [
              parseInt(index + 1),
              parseInt(item.tahun_tanam),
              parseInt(handleluas),
              parseInt(handlepokoktotal),
              parseInt(handlepokoksampel),
              parseInt(handlebuahmatang),
              angka_kerapatan_panen,
              item.rbt,
              tandan_panen,
            ],
          })
          .then(res => {
            const result_predict = res.data;

            daftarblok.push({
              id: item.id,
              tanggal: moment().add(1, 'days').format('YYYY-MM-DD'),
              blok: item.blok,
              tahun_tanam: item.tahun_tanam,
              luas_panen: handleluas,
              jumlah_pokok: handlepokoktotal,
              pokok_sampel: handlepokoksampel,
              buah_matang: handlebuahmatang,
              akp: angka_kerapatan_panen,
              rbt: item.rbt,
              jumlah_tandan_panen: tandan_panen,
              jumlah_produksi: result_predict,
              tenaga_kerja: Math.ceil(handleluas / 3),
              jumlah_transportassi: Math.ceil((result_predict) / 5000),
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const HandleFinish = () => {
    daftarblok.forEach(async (item, index) => {
      await axios.post('http://localhost:8080/api/taksasi', {
        id_petugas: iduser,
        tanggal: item.tanggal,
        nama_blok: item.blok,
        luas_panen: item.luas_panen,
        pokok_total_panen: item.jumlah_pokok,
        pokok_sampel: item.pokok_sampel,
        buah_matang: item.buah_matang,
        akp: item.akp,
        jumlah_tandan: item.jumlah_tandan_panen,
        jumlah_produksi: item.jumlah_produksi,
        tenaga_kerja: item.tenaga_kerja,
        transportassi: item.jumlah_transportassi,
      });
    });

    navigation.navigate('UserPage');
  };

  const RemoveList = id => {
    const handleList = daftarblok.filter(item => item.id !== id);
    setDaftarblok(handleList);
  };

  return (
    <View>
      <View style={styles.container4}>
        <View style={styles.cardTopNav}>
          <TouchableOpacity
            style={styles.buttonTopNav}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../img/back.png')}
              style={{width: 35, height: 35}}
            />
            <Text style={styles.textTopNav}>Taksasi TBS Kelapa Sawit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardHandleForm}>
          <View style={styles.cardForm}>
            <ScrollView>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textButtonAdd}> + | Tambah BLOK</Text>
              </TouchableOpacity>
              {(() => {
                if (daftarblok.length === 0) {
                  return (
                    <View style={styles.cardList}>
                      <View style={styles.cardListTaksasi}>
                        <Text style={styles.texttanpadata}>
                          Belum ada data yang diinputkan
                        </Text>
                      </View>
                    </View>
                  );
                } else {
                  return daftarblok.map((item, index) => {
                    return (
                      <View style={styles.cardList} key={index}>
                        <View style={styles.cardListHandleTaksasi}>
                          <View style={styles.styleBlok}>
                            <Text style={styles.textStyleblok}></Text>
                            <Text style={styles.textStyleblok}>Blok</Text>
                            <Text style={styles.textStyleblok}>
                              {item.blok}
                            </Text>
                            <TouchableOpacity
                              onPress={() => RemoveList(item.id)}>
                              <Image
                                source={require('../img/delete.png')}
                                style={{width: 25, height: 25, top: 15}}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.styleDetailBlok}>
                            <Text style={styles.texthandleinfo}>Luas Area</Text>
                            <Text style={styles.texthandleinfo}>
                              Pokok Total
                            </Text>
                            <Text style={styles.texthandleinfo}>
                              Pokok Sampel
                            </Text>
                            <Text style={styles.texthandleinfo}>
                              Buah Matang
                            </Text>
                            <Text style={styles.texthandleinfo}>
                              Angka Kerapatan Panen
                            </Text>
                          </View>
                          <View style={styles.styleDetailBlok2}>
                            <Text style={styles.textDetailBlok}>
                              {item.luas_panen}
                            </Text>
                            <Text style={styles.textDetailBlok}>
                              {item.jumlah_pokok}
                            </Text>
                            <Text style={styles.textDetailBlok}>
                              {item.pokok_sampel}
                            </Text>
                            <Text style={styles.textDetailBlok}>
                              {item.buah_matang}
                            </Text>
                            <Text style={styles.textDetailBlok}>
                              1 : {item.akp}
                            </Text>
                          </View>
                          <View style={styles.styleDetailBlok2}>
                            <Text style={styles.textSatuan}>Ha</Text>
                            <Text style={styles.textSatuan}>Pokok</Text>
                            <Text style={styles.textSatuan}>Pokok</Text>
                            <Text style={styles.textSatuan}>Buah</Text>
                            <Text style={styles.textSatuan} />
                          </View>
                        </View>
                      </View>
                    );
                  });
                }
              })()}
              {/* </View> */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.modal}>
                  <View style={styles.modalView}>
                    <Text style={styles.textTitleModal}>
                      Formulir Taksasi TBS Kelapa Sawit
                    </Text>
                    <Text style={styles.textModal}>Blok</Text>
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      key={value}
                    />
                    <Text style={styles.textModal}>Luas Panen</Text>
                    <TextInput
                      keyboardType="number-pad"
                      placeholder="Masukan Luas Lahan yang akan di panen"
                      onChangeText={text => setHandleluas(text)}
                    />
                    <Text style={styles.textModal}>Jumlah Pokok Total</Text>
                    <TextInput
                      keyboardType="number-pad"
                      placeholder="Masukan Jumlah Pokok Total"
                      onChangeText={text => setHandlepokoktotal(text)}
                    />
                    <Text style={styles.textModal}>Jumlah Pokok Sampel</Text>
                    <TextInput
                      keyboardType="number-pad"
                      placeholder="Masukan Jumlah Pokok Sampel"
                      onChangeText={text => setHandlepokoksampel(text)}
                    />
                    <Text style={styles.textModal}>Jumlah Buah Matang</Text>
                    <TextInput
                      keyboardType="number-pad"
                      placeholder="Masukan Jumlah Buah Matang"
                      onChangeText={text => setHandlebuahmatang(text)}
                    />
                    <View style={styles.modalButton}>
                      <Pressable
                        style={styles.buttonModal}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textModal}>Batal</Text>
                      </Pressable>
                      <TouchableOpacity
                        style={styles.buttonModal}
                        onPress={() => {
                          {
                            HandleParameterBlok();
                          }
                          setModalVisible(!modalVisible);
                        }}>
                        <Text style={styles.textModal}>Oke</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.buttonFinish}
                onPress={() => {
                  {
                    HandleFinish();
                  }
                }}>
                <Text style={styles.textButtonFinish}>Selesai</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FormTaksasi;
