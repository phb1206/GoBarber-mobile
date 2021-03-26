import React from 'react';

import { AuthProvider } from './auth';
import { KeyboardListenerProvider } from './keyboardListener';

const AppProvider: React.FC = ({ children }) => (
    <AuthProvider>
        <KeyboardListenerProvider>{children}</KeyboardListenerProvider>
    </AuthProvider>
);

export default AppProvider;
