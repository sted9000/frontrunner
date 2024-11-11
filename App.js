import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/Home';
import UserMarketDetails from './src/screens/UserMarketDetails';
import UserMarketEvents from './src/screens/UserMarketEvents';
import EditSources from './src/screens/EditSources';
import SelectMarket from './src/screens/SelectMarket';
import AddSources from './src/screens/AddSources';
import ConfirmMarket from './src/screens/ConfirmMarket';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
          />
          <Stack.Screen 
            name="UserMarketDetails" 
            component={UserMarketDetails}
          />
          <Stack.Screen 
            name="UserMarketEvents" 
            component={UserMarketEvents}
          />
          <Stack.Screen 
            name="EditSources" 
            component={EditSources}
          />
          <Stack.Screen 
            name="SelectMarket" 
            component={SelectMarket}
          />
          <Stack.Screen 
            name="AddSources" 
            component={AddSources}
          />
          <Stack.Screen 
            name="ConfirmMarket" 
            component={ConfirmMarket}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;