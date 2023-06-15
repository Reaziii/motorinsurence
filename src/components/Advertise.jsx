import React from 'react';
import {Image, View} from 'react-native';
import advertise from '../assets/ad/advertise';

const Advertise = ({style}) => {
  if (!style) style = {};
  const randomNumber = Math.floor(Math.random() * advertise.length);
  return (
    <View
      style={{
        width: '80%',
        height: 80,
        backgroundColor: 'white',
        ...style,
      }}>
      <Image
        style={{
          maxHeight: '100%',
          width: '100%',
        }}
        source={advertise[randomNumber]}
      />
    </View>
  );
};

export default Advertise;
