import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Text, Card, Button } from 'react-native-paper';
import useStore from '../store/useStore';

const AddSources = ({ navigation }) => {
  const sources = useStore(state => state.sources);
  const [selectedSourceIds, setSelectedSourceIds] = useState([]);

  const handleSourceSelect = (sourceId) => {
    setSelectedSourceIds(prev => {
      if (prev.includes(sourceId)) {
        return prev.filter(id => id !== sourceId);
      } else {
        return [...prev, sourceId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedSourceIds.length > 0) {
      useStore.setState({ selectedSourceId: selectedSourceIds });
      navigation.navigate('ConfirmMarket');
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Select Sources" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {sources.map(source => (
          <Card
            key={source.id}
            style={[
              styles.card,
              selectedSourceIds.includes(source.id) && styles.selectedCard
            ]}
            onPress={() => handleSourceSelect(source.id)}
          >
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
          onPress={handleContinue}
          disabled={selectedSourceIds.length === 0}
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
  description: {
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

export default AddSources;
