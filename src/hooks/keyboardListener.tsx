import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    useEffect,
} from 'react';
import { Keyboard } from 'react-native';

interface KeyboardListenerContextData {
    isKeyboardUp(): boolean;
}

const KeyboardListenerContext = createContext<KeyboardListenerContextData>(
    {} as KeyboardListenerContextData,
);

export const KeyboardListenerProvider: React.FC = ({ children }) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const isKeyboardUp = useCallback(() => isKeyboardVisible, [
        isKeyboardVisible,
    ]);

    return (
        <KeyboardListenerContext.Provider value={{ isKeyboardUp }}>
            {children}
        </KeyboardListenerContext.Provider>
    );
};

export function useKeyboardListener(): KeyboardListenerContextData {
    const context = useContext(KeyboardListenerContext);

    if (!context)
        throw new Error(
            'useKeyboardListener must be used within a KeyboardListenerProvider',
        );

    return context;
}
