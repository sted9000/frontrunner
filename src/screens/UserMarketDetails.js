import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Text, Button } from 'react-native-paper';
import useStore from '../store/useStore';

const UserMarketDetails = ({ route, navigation }) => {
  const { userMarket } = route.params;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const onTextLayout = (e) => {
    // Check if the text is truncated by comparing
    // number of lines rendered vs. lines available
    const { lines } = e.nativeEvent;
    setIsTruncated(lines.length >= 3);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='Market Details' />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {userMarket.market.name}
        </Text>
        <Text variant="bodyMedium" style={styles.label}>Description</Text>
        <Text variant="bodyLarge" style={styles.description}>
          {userMarket.market.description}
        </Text>

        <Text variant="bodyMedium" style={styles.label}>Market Cap</Text>
        <Text variant="bodyLarge" style={styles.description} testID="MarketCap">
          ${(userMarket.market.marketCap / 100).toLocaleString()}
        </Text>
        

        <Text variant="bodyMedium" style={styles.label}>Date Posted</Text>
        <Text variant="bodyLarge" style={styles.description}>
          {userMarket.market.date}
        </Text>

        <Text variant="bodyMedium" style={styles.label}>Resolution Description</Text>
        <Text variant="bodyLarge" numberOfLines={isExpanded ? undefined : 3} onTextLayout={onTextLayout} ellipsizeMode="tail">
          {userMarket.market.resolutionDescription}
        </Text>
        {isTruncated && <Button
          onPress={() => setIsExpanded(!isExpanded)}
          mode="text"
          style={styles.readMoreButton}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </Button>}

        <View style={[styles.labelRow, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
          <Text variant="bodyMedium" style={styles.label}>Your Sources</Text>
          <Button mode="text" onPress={() => navigation.navigate('EditSources', { userMarket })}>Edit</Button>
        </View>
        <View style={styles.sourceContainer}>
          {userMarket.sources.map(source => (
            <View key={source.id} style={styles.sourceChip}>
              <Text variant="bodyLarge" style={styles.sourceText}>
                {source.name}
              </Text>
            </View>
          ))}
        </View>
        <Button
          mode="contained"
          buttonColor="#dc3545"
          style={{ marginTop: 24, marginBottom: 16 }}
          onPress={() => {
            useStore.setState(state => ({
              userMarkets: state.userMarkets.filter(market => market.id !== userMarket.id)
            }));
            navigation.navigate('Home');
          }}
        >
          Delete Market
        </Button>
      </ScrollView>

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
  title: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 24,
  },
  readMoreButton: {
    marginBottom: 12,
  },
  sourceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sourceChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#1DA1F2',
  },
  sourceText: {
    fontSize: 14,
    color: 'white',
  },
});

export default UserMarketDetails;
