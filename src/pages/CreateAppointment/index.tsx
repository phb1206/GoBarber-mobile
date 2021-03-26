import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
    BackButton,
    Container,
    Header,
    HeaderTitle,
    ProviderAvatar,
    ProviderContainer,
    ProvidersList,
    ProvidersListContainer,
    ProviderName,
    UserAvatar,
} from './styles';

interface RouteParms {
    providerId: string;
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const routeParms = useRoute().params as RouteParms;
    const { navigate } = useNavigation();

    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(
        routeParms.providerId,
    );

    useEffect(() => {
        api.get('/providers').then(res => {
            setProviders(res.data);
        });
    }, []);

    const navigateToDashboard = useCallback(() => {
        navigate('Dashboard');
    }, [navigate]);

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId);
    }, []);

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateToDashboard}>
                    <Icon name="chevron-left" size={36} color="#999591" />
                </BackButton>
                <HeaderTitle>Barbers</HeaderTitle>
                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>
            <ProvidersListContainer>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={provider => provider.id}
                    renderItem={({ item: provider }) => (
                        <ProviderContainer
                            onPress={() => handleSelectProvider(provider.id)}
                            selected={provider.id === selectedProvider}
                        >
                            <ProviderAvatar
                                source={{ uri: provider.avatar_url }}
                            />
                            <ProviderName
                                selected={provider.id === selectedProvider}
                            >
                                {provider.name}
                            </ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProvidersListContainer>
        </Container>
    );
};

export default CreateAppointment;
