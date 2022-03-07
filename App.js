import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Avatar, Layout } from '@ui-kitten/components';




const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Avatar style={styles.avatar} size='giant' source={require('./assets/dili.png')}/>
    <Text category='h1'>Reba is missing you</Text>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 8,
  },
  avatar: {
    margin: 8,width:300, height:300
  },
});

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);
