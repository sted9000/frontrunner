import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Text, Card, Button } from 'react-native-paper';
import useStore from '../store/useStore';

const ConfirmMarket = ({ navigation }) => {
  const selectedMarketId = useStore(state => state.selectedMarketId);
  const selectedSourceIds = useStore(state => state.selectedSourceId);
  const markets = useStore(state => state.markets);
  const sources = useStore(state => state.sources);

  const selectedMarket = markets.find(market => market.id === selectedMarketId);
  const selectedSources = sources.filter(source => selectedSourceIds.includes(source.id));

  const handleConfirm = () => {
    
    useStore.setState(state => ({
      userMarkets: [...state.userMarkets, { id: state.userMarkets.length + 1, sources: selectedSources, events: [], market: selectedMarket }],
      selectedMarketId: null,
      selectedSourceId: []
    }));
    
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Confirm Market" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{selectedMarket?.name}</Text>
            <Text variant="bodyMedium" style={styles.description}>
              {selectedMarket?.description}
            </Text>
            <Text variant="bodyMedium" style={styles.resolution}>
              {selectedMarket?.resolutionDescription}
            </Text>
          </Card.Content>
        </Card>

        <Text variant="titleMedium" style={styles.sourcesTitle}>Selected Sources</Text>
        {selectedSources.map(source => (
          <Card key={source.id} style={styles.sourceCard}>
            <Card.Content>
              <Text variant="titleMedium">{source.name}</Text>
              <Text variant="bodyMedium">{source.twitterHandle}</Text>
              {source.description && (
                <Text variant="bodyMedium" style={styles.description}>
                  {source.description}
                </Text>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          mode="contained"
          onPress={handleConfirm}
          style={styles.confirmButton}
        >
          Confirm
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
    marginBottom: 80,
  },
  card: {
    marginBottom: 24,
  },
  description: {
    marginTop: 8,
    color: 'gray',
  },
  resolution: {
    marginTop: 16,
    fontStyle: 'italic',
  },
  sourcesTitle: {
    marginBottom: 16,
  },
  sourceCard: {
    marginBottom: 12,
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
  confirmButton: {
    width: '100%',
    marginBottom: 16,
  },
});

export default ConfirmMarket;
