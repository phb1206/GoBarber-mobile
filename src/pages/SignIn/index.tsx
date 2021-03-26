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

import { useAuth } from '../../hooks/auth';
import { useKeyboardListener } from '../../hooks/keyboardListener';
import getValidationErrors from '../../utils/getValidationErrors';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    SignUpButton,
    SignUpButtonText,
} from './styles';
import logoImg from '../../assets/logo.png';

interface SignInDTO {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const { signIn } = useAuth();
    const { isKeyboardUp } = useKeyboardListener();

    const handleSubmit = useCallback(
        async (data: SignInDTO) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('Insert valid e-mail')
                        .email('Insert valid e-mail'),
                    password: Yup.string().required('Insert password'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                signIn(data);
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    // return;
                }

                Alert.alert(
                    'Authentication error',
                    'A login error has ocurred, please check credentials',
                );
            }
        },
        [signIn],
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
                            <Title>Login with e-mail</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Input
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
                        <Button onPress={formRef.current?.submitForm}>
                            Login
                        </Button>

                        <ForgotPassword>
                            <ForgotPasswordText>
                                Forgot password
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            {!isKeyboardUp() && (
                <SignUpButton onPress={() => navigation.navigate('SignUp')}>
                    <Icon name="log-in" size={20} color="#ff9000" />
                    <SignUpButtonText>Sign Up</SignUpButtonText>
                </SignUpButton>
            )}
        </>
    );
};

export default SignIn;
