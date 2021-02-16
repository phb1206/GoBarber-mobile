import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 80%;
    height: 60px;
    border-radius: 10px;
    background-color: #ff9000;
    margin-top: 8px;

    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #312e38;
`;
