import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const UserMarket = ({ market }) => {
  const navigation = useNavigation();
  return (
    <Card style={[styles.card, {marginBottom: -70,marginLeft: 50, width: '150%'}]}>
      <Card.Content>
        <Text variant="titleMedium">{market.name}</Text>
        <Text variant="bodyMedium">{market.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" onPress={() => {
            navigation.navigate('UserMarketEvents', { market });
        }}>Events</Button>
        <Button mode="text" onPress={() => {
          navigation.navigate('UserMarketDetails', { market });
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
