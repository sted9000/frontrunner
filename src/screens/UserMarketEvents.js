import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const UserMarketEvents = ({ route }) => {
  const navigation = useNavigation();
  const { userMarket } = route.params;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`${userMarket.market.name} Events`} />
      </Appbar.Header>

      <View style={styles.content}>
        {userMarket.events.map(event => (
          <Card key={event.id} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{event.name}</Text>
              <Text variant="bodyMedium">{event.description}</Text>
              <Text variant="bodyMedium" style={styles.date}>{event.date}</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => {}}>
                View Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  date: {
    fontStyle: 'italic',
    color: 'gray',
    paddingTop: 4,
  },
});

export default UserMarketEvents;
