import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-family: 'RobotoSlab-Medium';
    color: #f4ede8;

    margin: 64px 0 24px;
`;

export const SignInButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: #312e38;
    border-color: #232129;
    border-top-width: 1px;
    padding: 16px 0 ${16 + getBottomSpace() / 10}px;
`;

export const SignInButtonText = styled.Text`
    font-family: 'RobotoSlab-Regular';
    font-size: 16px;
    color: #f4ede8;
    margin-left: 8px;
`;
