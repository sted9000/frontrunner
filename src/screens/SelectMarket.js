import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Text, Card, Button } from 'react-native-paper';
import useStore from '../store/useStore';

const SelectMarket = ({ navigation }) => {
  const markets = useStore(state => state.markets);
  const [selectedMarketId, setSelectedMarketId] = useState(null);
  console.log('selectedMarketId', selectedMarketId);

  const handleContinue = () => {
    if (selectedMarketId) {
      console.log('selectedMarketId', selectedMarketId);
      const selectedMarket = markets.find(m => m.id === selectedMarketId);
    //   Here you would update the store with the selected market
      useStore.setState({ selectedMarketId: selectedMarket.id });
      navigation.navigate('AddSources');
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Select Market" />
      </Appbar.Header>


      <ScrollView style={styles.content}>

        {markets.map(market => (
          <Card
            key={market.id}
            style={[
              styles.card,
              selectedMarketId === market.id && styles.selectedCard
            ]}
            onPress={() => setSelectedMarketId(market.id)}
          >
            <Card.Content>
              <Text variant="titleMedium">{market.name}</Text>
              <Text variant="bodyMedium">{market.description}</Text>
              <Text variant="bodyMedium" style={styles.marketCap}>
                Market Cap: ${(market.marketCap / 100).toLocaleString()}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={!selectedMarketId }
          style={styles.continueButton}
        >
          Continue
        </Button>
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
    marginBottom: 80, // Space for bottom bar
  },
  card: {
    marginBottom: 12,
  },
  selectedCard: {
    backgroundColor: 'lightgray'
  },
  marketCap: {
    marginTop: 8,
    color: 'gray',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  continueButton: {
    width: '100%',
    marginBottom: 16
  },
});

export default SelectMarket;
