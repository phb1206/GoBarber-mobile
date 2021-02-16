import styled, { css } from 'styled-components/native';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 75%;
    height: 60px;
    border-radius: 10px;
    border-width: 2px;
    border-color: #232129;
    background-color: #232129;

    padding: 0 16px;
    flex-direction: row;
    align-items: center;

    margin-bottom: 8px;

    ${props =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}

    ${props =>
        props.isFocused &&
        css`
            border-color: #ff9000;
        `}
`;

export const TextInput = styled.TextInput`
    flex: 1;
    margin-left: 8px;

    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: #fff;
`;
