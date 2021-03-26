import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import AppProvider from './hooks';

// import { Container } from './styles';

const App: React.FC = () => (
    <NavigationContainer>
        <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
        />
        <AppProvider>
            <Routes />
        </AppProvider>
    </NavigationContainer>
);

export default App;
