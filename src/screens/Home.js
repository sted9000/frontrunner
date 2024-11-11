import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Text } from 'react-native-paper';
import useStore from '../store/useStore';
import UserMarket from '../components/UserMarket';

const HomeScreen = ({ navigation }) => {

const userMarkets = useStore(state => state.userMarkets);
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="FrontRunner" />
        <Avatar.Text 
          size={40} 
          label="EH"
          style={styles.avatar}
        />
      </Appbar.Header>
      <View style={styles.marketHeader}>
        <Text variant="titleLarge" style={styles.marketTitle}>My Markets</Text>
        <Button mode="contained" onPress={() => {navigation.navigate('SelectMarket')}}>Add Market</Button>
      </View>
      <View style={styles.marketList}>
        {userMarkets.map((userMarket) => (
            <UserMarket key={userMarket.id} userMarket={userMarket} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    marginRight: 16,
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default HomeScreen;
