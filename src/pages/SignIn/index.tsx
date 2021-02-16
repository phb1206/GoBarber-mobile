import React from 'react';
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import KeyboardListener from '../../hooks/keyboardListener';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    SignUpButton,
    SignUpButtonText,
} from './styles';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <Container>
                    <Image source={logoImg} />
                    <View>
                        <Title>Login with e-mail</Title>
                    </View>

                    <Input name="email" placeholder="E-mail" icon="mail" />
                    <Input name="password" placeholder="Password" icon="lock" />
                    <Button>Login</Button>

                    <ForgotPassword>
                        <ForgotPasswordText>Forgot password</ForgotPasswordText>
                    </ForgotPassword>
                </Container>
            </KeyboardAvoidingView>

            {!KeyboardListener() && (
                <SignUpButton onPress={() => navigation.navigate('SignUp')}>
                    <Icon name="log-in" size={20} color="#ff9000" />
                    <SignUpButtonText>Sign Up</SignUpButtonText>
                </SignUpButton>
            )}
        </>
    );
};

export default SignIn;
