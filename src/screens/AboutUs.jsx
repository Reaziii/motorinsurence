import {Dialog, Text, Provider} from '@react-native-material/core';
import React, {useState} from 'react';
import {View, Dia} from 'react-native';

const AboutUs = () => {
  const [visible, setVisible] = useState(true);
  return (
    <View
    style={{
      padding : 20,
    }}
    >
      <Text
      style={{
        textAlign : 'center',
        fontWeight : 'bold',
        
      }}
      >
        এটি বাংলাদেশের একটি শীর্ষস্থানীয় প্রথম প্রজন্মের নন-লাইফ ইন্স্যুরেন্স
        কোম্পানি। মেঘনা ইন্স্যুরেন্স কোম্পানি লিমিটেড ১৮ ই মার্চ, ১৯৯৬ সালে
        যাত্রা শুরু করেছিল । মেঘনা ইন্স্যুরেন্স কোম্পানি বাংলাদেশে সব শ্রেণীর
        নন-লাইফ ইন্স্যুরেন্স করে থাকে ।
      </Text>
    </View>
  );
};

export default AboutUs;
