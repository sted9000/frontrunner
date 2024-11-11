import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Button, Chip } from 'react-native-paper';
import useStore from '../store/useStore';

const EditSources = ({ navigation, route }) => {
  const { userMarket } = route.params;
  console.log(userMarket);
  const [selectedSources, setSelectedSources] = useState(userMarket.sources);

  const handleSave = () => {
    console.log('saving');
    console.log(userMarket);
    console.log(userMarket.id);
    useStore.setState(state => ({
      userMarkets: state.userMarkets.map(market => 
        market.id === userMarket.id 
          ? { ...market, sources: selectedSources }
          : market
      )
    }));
    // get the userMarket from the store
    const updatedUserMarket  = useStore.getState().userMarkets.find(market => market.id === userMarket.id);
    // navigate to the UserMarketDetails screen with the userMarket from the store
    navigation.navigate('UserMarketDetails', { userMarket: updatedUserMarket });
  };

  const toggleSource = (source) => {
    if (selectedSources.find(s => s.id === source.id)) {
      setSelectedSources(selectedSources.filter(s => s.id !== source.id));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Sources" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <View style={styles.sourceContainer}>
          {userMarket.sources.map(source => (
            <Chip
              key={source.id}
              selected={selectedSources.some(s => s.id === source.id)}
              onPress={() => toggleSource(source)}
              style={styles.chip}
              mode="outlined"
            >
              {source.name}
            </Chip>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
        >
          Save Changes
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
  sourceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 8,
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
  saveButton: {
    width: '100%',
    marginBottom: 16,
  }
});

export default EditSources;
