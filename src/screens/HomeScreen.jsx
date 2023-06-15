import {Pressable} from '@react-native-material/core';
import {useIsFocused} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import Advertise from '../components/Advertise';

const HomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [menuItems, setMenuItems] = useState([
    {
      title: 'মোটর সাইকেল',
      logo: require('../assets/motorcycle.png'),
      onPress: e => {
        e.preventDefault();
        navigation.navigate('মোটর সাইকেল');
      },
    },
    {
      title: 'গাড়ী',
      logo: require('../assets/car.png'),
      onPress: e => {
        e.preventDefault();
        navigation.navigate('গাড়ী');
      },
    },
    {
      title: 'অন্যান্য',
      logo: require('../assets/application.png'),
      onPress: e => {
        e.preventDefault();
        navigation.navigate('অন্যান্য');
      },
    },
    {
      title: 'আমাদের সম্পর্কে',
      logo: require('../assets/info.png'),
      onPress: e => {
        e.preventDefault();
        console.log('pressed');
        navigation.navigate('আমাদের সম্পর্কে');
      },
    },
  ]);

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            height: 60,
            width: '100%',
          }}>
          <Image
            style={{
              height: 60,
              resizeMode: 'contain',
              position: 'absolute',
              margin: 0,
              backgroundColor: 'green',
              alignContent: 'flex-start',
            }}
            source={require('../assets/hello.png')}
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
          }}>
          এই এপ্সটি শুধুমাত্র তথ্য সংগ্রহের জন্য, তথ্য পাওয়ার পর আমরা আপনার সাথে
          যোগাযোগ করব ইনশাল্লাহ।
        </Text>
        <Image
          style={{
            width: '60%',
            resizeMode: 'contain',
            height: 140,
            marginTop: 10,
            marginBottom : 40,
          }}
          source={require('../assets/banner1.jpg')}
        />
        {menuItems.map((item, key) => (
          <Pressable
            style={{
              backgroundColor: '#a5bce2',
              marginBottom: 20,
              width: '70%',
              height: 70,
            }}
            key={key}
            onPress={item.onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}>
              <Image
                source={item.logo}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginLeft: 30,
                }}>
                {item.title}
              </Text>
            </View>
          </Pressable>
        ))}

        <Advertise
          style={{
            position: 'absolute',
            bottom: 30,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
