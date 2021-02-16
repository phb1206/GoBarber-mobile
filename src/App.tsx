import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

// import { Container } from './styles';

const App: React.FC = () => (
    <NavigationContainer>
        <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="#312e38"
        />
        <Routes />
    </NavigationContainer>
);

export default App;
