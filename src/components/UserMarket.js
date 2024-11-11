import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const UserMarket = ({ userMarket }) => {
  
  const navigation = useNavigation();
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{userMarket.market.name}</Text>
        <Text variant="bodyMedium">{userMarket.market.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" onPress={() => {
            navigation.navigate('UserMarketEvents', { userMarket });
        }}>Events</Button>
        <Button mode="text" onPress={() => {
          navigation.navigate('UserMarketDetails', { userMarket });
        }}>Details</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 2,
  },
});

export default UserMarket;
