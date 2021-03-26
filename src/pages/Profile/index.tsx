import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Button, View } from 'react-native';
import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

const Profile: React.FC = () => {
    const { navigate } = useNavigation();
    const {signOut} = useAuth()

    const navigateToDashboard = useCallback(() => {
        navigate('Dashboard');
    }, [navigate]);
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button title="signl" onPress={signOut}>
                dsds
            </Button>
        </View>
    );
};

export default Profile;
