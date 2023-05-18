import {
  Dialog,
  DialogContent,
  Provider,
  Text,
} from '@react-native-material/core';
import React from 'react';
import {Dimensions, Image, View} from 'react-native';

const SubmitDialog = ({visible, setVisible}) => {
  return (
    <Dialog onDismiss={() => setVisible(false)} visible={visible}>
      <DialogContent>
        <View
          style={{
            height: 400,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: 100,
              width: 100,
            }}
            source={require('../assets/pngegg.png')}
          />

          <Text
            style={{
              fontSize: 18,
              marginTop: 40,
              textAlign : 'center'
            }}>
            আপনার আনুরোধ টি গ্রহণ করা হয়েছে। আমাদের একজন agent আপনার সাথে ১২
            থেকে ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।
          </Text>
        </View>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitDialog;
