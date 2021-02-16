import React, { useCallback, useRef } from 'react';
import {
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useKeyboardListener } from '../../hooks/keyboardListener';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { Container, Title, SignInButton, SignInButtonText } from './styles';
import logoImg from '../../assets/logo.png';

interface SignUpDTO {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const { isKeyboardUp } = useKeyboardListener();

    const handleSubmit = useCallback(
        async (data: SignUpDTO) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Name required'),
                    email: Yup.string()
                        .required('E-mail required')
                        .email('Insert valid e-mail'),
                    password: Yup.string()
                        .required('Password required')
                        .min(6, 'Password must be at least 6 characters'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/users', data);

                Alert.alert(
                    'Sign up complete',
                    'You can now login with your credentials',
                );

                navigation.goBack();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }

                Alert.alert(
                    'Sign up error',
                    'Please check your inputs and try again',
                );
            }
        },
        [navigation],
    );

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Create an account</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Input
                                name="name"
                                placeholder="Name"
                                icon="user"
                                autoCapitalize="words"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                name="email"
                                placeholder="E-mail"
                                icon="mail"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                placeholder="Password"
                                icon="lock"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() =>
                                    formRef.current?.submitForm()
                                }
                            />
                        </Form>
                        <Button onPress={() => formRef.current?.submitForm()}>
                            Sign Up
                        </Button>
                    </Container>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            {!isKeyboardUp() && (
                <SignInButton onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="#f4ede8" />
                    <SignInButtonText>Back to login</SignInButtonText>
                </SignInButton>
            )}
        </>
    );
};

export default SignUp;
