import {Dialog, Pressable, Provider} from '@react-native-material/core';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';

const VehicleList = ({visible, setVisible, list, setItem}) => {
  return (
    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '60%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            width: '100%',
            padding: 20,
          }}>
          {list.map((item, key) => (
            <Pressable
              key={key}
              onPress={() => {
                setItem(item.name);
                setVisible(false);
              }}
              style={{
                width: '100%',
                justifyContent: 'center',
                height: 50,
                marginBottom : 10,
                // backgroundColor: 'red',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  width: '100%',
                  textAlign: 'center',
                  fontWeight : "bold",
                }}
                key={key}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Dialog>
  );
};

export default VehicleList;
