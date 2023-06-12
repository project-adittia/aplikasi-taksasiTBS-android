/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import DatePicker from 'react-native-date-picker';
import styles from '../style/style';
import axios from 'axios';

const ResultPage = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [datahasil, setDatahasil] = useState([]);

  const getDataresult = async () => {
    await axios
      .get('http://localhost:8080/api/result')
      .then(response => {
        const arrResult = response.data[0];
        setDatahasil(arrResult);
        console.log(arrResult);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataresult();
  }, [date]);


  const [dataPerdate, setDaraperdate] = useState([]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.8,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 1,
    decimalPlaces: 0, // optional, defaults to 2dp

    style: {
      borderRadius: 16,
      marginVertical: 8,
    },
  };

  const arrGrafik = dataPerdate.map((item, index) => {
    let handlegraph = {
      labels: ['Taksasi Manual', 'ANN', 'Real'],
      datasets: [
        {
          data: [item.taksasi_manual, item.jumlah_produksi, item.produksi_real],
        },
      ],
    };

    return (
      <View key={index} style={styles.cardResult}>
        <Text style={styles.titletext1}> Grafik Blok {item.nama_blok}</Text>
        <View style={{alignItems: 'center'}}>
          <BarChart
            style={chartConfig.style}
            data={handlegraph}
            width={Dimensions.get('window').width - 110}
            height={220}
            yAxisLabel="Kg "
            yLabelsOffset={10}
            chartConfig={chartConfig}
            fromZero={true}
          />
        </View>
        <View>
          <Text style={{marginLeft: 10}}> Keterangan : </Text>
        </View>
        <View style={styles.tableTaksasi}>
          <View style={styles.Table}>
            <Text style={styles.textTable1}> Hasil Taksasi </Text>
            <Text style={styles.textTable1}> Jumlah Tandan </Text>
            <Text style={styles.textTable1}> Tenaga Kerja </Text>
            <Text style={styles.textTable1}> Transportasi </Text>
          </View>
          <View style={styles.Table}>
            <Text style={styles.textTable2}> {item.jumlah_produksi} </Text>
            <Text style={styles.textTable2}> {item.jumlah_tandan} </Text>
            <Text style={styles.textTable2}> {item.tenaga_kerja} </Text>
            <Text style={styles.textTable2}> {item.transportassi} </Text>
          </View>
          <View style={styles.Table}>
            <Text> Kg </Text>
            <Text> Tandan </Text>
            <Text> HOK </Text>
            <Text> Mobil/Truck </Text>
          </View>
        </View>
      </View>
    );
  });

  const HandleEmpty = () => {
    return (
      <View>
        <Text> Belum ada data </Text>
      </View>
    );
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
            <Text style={styles.textTopNav}>
              Hasil Taksasi TBS Kelapa Sawit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardHandleForm}>
          <View style={styles.cardGrafikTitle}>
            <Text style={styles.titleresult}>
              Grafik Hasil Taksasi TBS Kelapa Sawit
            </Text>
            <View style={styles.styleDatePicker}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>Tanggal</Text>
              </TouchableOpacity>
              <Text>{moment(date).format('DD MMMM YYYY')}</Text>
              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={dates => {
                  setOpen(false);
                  setDate(dates);

                  const arrhandleFilter = [];

                  datahasil.forEach((item, index) => {
                    if (item.tanggal === moment(dates).format('YYYY-MM-DD')) {
                      arrhandleFilter.push(item);
                    } else {
                      console.log(' ');
                    }
                  });

                  setDaraperdate(arrhandleFilter);
                }}
                onCancel={() => setOpen(false)}
              />
            </View>
          </View>
          <View style={styles.cardGrafik}>
            <ScrollView style={styles.scrollview}>
              {dataPerdate.length > 0 ? arrGrafik : <HandleEmpty />}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ResultPage;
