import {
  Button,
  Snackbar,
  Pressable,
  ActivityIndicator,
} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {isBangladeshiPhoneNumber, validateEmail} from '../utils/utils';
import VehicleList from '../components/VehicleList';
import SubmitDialog from '../components/SubmitDialog';
import axios from 'axios';
import RNFS from 'react-native-fs';
import {spreedsheetUrl} from '../../env';
import Advertise from '../components/Advertise';
const InsuranceScreen = ({route, navigation}) => {
  let type = route.name;
  if (type === 'অন্যান্য') type = 'Others';
  const [submited, setSubmited] = useState(false);
  const [otherTypes, setOtherTypes] = useState([
    {
      id: 1,
      name: 'কার',
    },
    {
      id: 2,
      name: 'মাইক্রো',
    },
    {
      id: 3,
      name: 'জীপ',
    },
    {
      id: 4,
      name: 'বাস',
    },
    {
      id: 5,
      name: 'কাভার্ড ভ্যান',
    },
    {
      id: 6,
      name: 'পিক আপ',
    },
    {
      id: 7,
      name: 'ট্রাক',
    },
  ]);
  const [details, setDetails] = useState({
    name: '',
    address: '',
    phone: '+880',
    registrationPapaer: null,
    price: '',
    email: '',
    vehicle: type,
    selectedVehicle: otherTypes[0].name,
  });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setDetails({...details, registrationPapaer: res[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setMsg('File Selecting canceled');
      } else {
        setMsg('File selecting failed');
      }
    }
  };

  const onSubmitHandle = async () => {
    if (!isBangladeshiPhoneNumber(details.phone)) {
      return setMsg('Invalid Phone number');
    }
    if (details.email.length && !validateEmail(details.email)) {
      return setMsg('Invalid Email address');
    }
    setLoading(true);
    const formdata = new FormData();
    formdata.append('Name', details.name);
    formdata.append('Address', details.address);
    formdata.append('Phone', details.phone);
    formdata.append('Price', details.price);
    if (details.registrationPapaer !== null) {
      console.log(details.registrationPapaer);
      let imagedata = await RNFS.readFile(
        details.registrationPapaer.uri,
        'base64',
      );
      formdata.append('image', imagedata);
    }
    formdata.append(
      'Vehicle_type',
      type === 'Others' ? details.selectedVehicle : type,
    );
    formdata.append('Email', details.email);
    const url = spreedsheetUrl;

    axios
      .post(url, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setSubmited(true);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (type === 'Other') {
      retriveOtherVehicleTyeps();
    }
  }, [type]);

  const retriveOtherVehicleTyeps = () => {
    setOtherTypes();
  };

  const formItems = [
    {
      title: 'নাম',
      hint: 'পুর্ন নাম',
      type: 'text',
      onChange: e => {
        setDetails({...details, name: e});
      },
      value: 'name',
    },
    {
      title: 'ঠিকানা',
      hint: 'সম্পূর্ণ ঠিকানা',
      type: 'text',
      onChange: e => {
        setDetails({...details, address: e});
      },
      value: 'address',
    },
    {
      title: 'মোবাইল নঃ',
      hint: 'Phone Number',
      type: 'text',
      onChange: e => {
        setDetails({...details, phone: e});
      },
      value: 'phone',
    },
    {
      title: 'রেজিস্ট্রেশন পেপার',
      hint: 'ফাইল ম্যানেজার খুলুন',
      type: 'file',
      onChange: () => {
        handleFileSelection();
      },
      value: 'registrationPapaer',
    },
    {
      title: 'দাম',
      hint: 'দাম',
      type: 'text',
      value: 'price',
      onChange: e => {
        const cleanedNumber = e.replace(/[^0-9.]/g, '');
        setDetails({...details, price: cleanedNumber});
      },
    },
    {
      title: 'ইমেইল (প্রয়োজনীয় নয়)',
      hint: 'আপনার ইমেইল এড্রেস',
      type: 'text',
      value: 'email',
      onChange: e => setDetails({...details, email: e}),
    },
  ];

  const insuranceItems = [
    {
      name: 'FIRE INSURANCE',
      link: 'https://www.micl.com.bd/fire-insurance/',
    },
    {
      name: 'MARINE INSURANCE',
      link: 'https://www.micl.com.bd/marine-insurance/',
    },
    {
      name: 'ENGINEERING INSURANCE',
      link: 'https://www.micl.com.bd/engineering-insurance/',
    },
  ];

  useEffect(() => {
    if (msg.length) {
      setTimeout(() => setMsg(''), 3000);
    }
  }, [msg]);
  const [openVehicle, setOpenVehicle] = useState(false);
  const handleValueChange = value => {
    setSelectedValue(value);
  };
  return (
    <SafeAreaView>
      {loading && (
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#00000070',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="lightgreen" size={70} />
        </View>
      )}

      <SubmitDialog visible={submited} setVisible={setSubmited} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          {formItems.map((item, i) => (
            <View key={i} style={styles.item}>
              <Text
                style={{
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginBottom: 10,
                  color: 'black',
                }}>
                {item.title}
              </Text>
              {item.type == 'text' && (
                <TextInput
                  onChangeText={item.onChange}
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderBottomColor: '#bfcdd8',
                    borderBottomWidth: 1,
                    height: 50,
                    paddingLeft: 10,
                  }}
                  value={details[item.value]}
                  placeholder={item.hint}
                />
              )}
              {item.type == 'file' && (
                <>
                  <Pressable
                    onPress={item.onChange}
                    style={{
                      width: '100%',
                      height: 50,
                      justifyContent: 'center',
                      paddingLeft: 10,
                      backgroundColor: '#7e8ed9',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: 'white',
                      }}>
                      {item.hint}
                    </Text>
                  </Pressable>
                  {details.registrationPapaer !== null && (
                    <View
                      style={{
                        ...styles.item,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../assets/file.png')}
                        style={{
                          height: 20,
                          width: 20,
                        }}
                      />
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{
                          fontSize: 18,
                          color: '#5fd39b',
                          marginLeft: 5,
                        }}>
                        {details.registrationPapaer.name}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          ))}
          {type === 'Others' && (
            <View style={styles.item}>
              <Text
                style={{
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginBottom: 10,
                  color: 'black',
                }}>
                গাড়ির ধরন
              </Text>
              <Pressable
                onPress={() => setOpenVehicle(true)}
                style={{
                  width: '100%',
                  height: 50,
                  justifyContent: 'center',
                  paddingLeft: 10,
                  backgroundColor: '#7e8ed9',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'white',
                  }}>
                  {details.selectedVehicle}
                </Text>
              </Pressable>
              <VehicleList
                visible={openVehicle}
                list={otherTypes}
                setItem={item =>
                  setDetails({...details, selectedVehicle: item})
                }
                setVisible={setOpenVehicle}
              />

              {insuranceItems.map((item, key) => (
                <Pressable
                  key={key}
                  onPress={() => {
                    Linking.openURL(item.link).catch(err => {
                      console.log(err);
                    });
                  }}
                  style={{
                    height: 60,
                    width: '100%',
                    backgroundColor: '#7e8ed9',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginLeft: 15,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'normal',
                      marginLeft: 15,
                      opacity : 0.5
                    }}>
                    {item.link}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          <Advertise />
          <Pressable
            onPress={onSubmitHandle}
            style={{
              height: 50,
              width: '100%',
              backgroundColor: '#0cc000',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Submit
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {msg.length > 0 && (
        <Snackbar
          message={msg}
          action={
            <Button
              onPress={() => setMsg('')}
              variant="text"
              title="Dismiss"
              color="#BB86FC"
              compact
            />
          }
          style={{position: 'absolute', start: 16, end: 16, bottom: 16}}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  item: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default InsuranceScreen;
