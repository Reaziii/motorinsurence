import {Pressable} from '@react-native-material/core';
import {useIsFocused} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';

const HomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  console.log(isFocused);
  const [menuItems, setMenuItems] = useState([
    {
      title: 'আমাদের সম্পর্কে',
      logo: require('../assets/info.png'),
      onPress: e => {
        e.preventDefault();
        console.log('pressed');
        navigation.navigate('আমাদের সম্পর্কে');
      },
    },

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
  ]);

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
