import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const ButtonBase = styled(Button)`
    font-size: 24px;
    padding: 2px 8px;

    svg {
        margin-bottom: 2px;
    }
`;

// Produces an internal TS error - union too complex to represent
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const DayButton = styled(ButtonBase)`
    &.active, &:hover {
        background-color: #FFD000;
        border-color: #FFD000;
        color: #505050;
    }
    border-color: #AF8C00;
    color: #AF8C00;
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const NightButton = styled(ButtonBase)`
    &.active, &:hover {
        background-color: #260072;
        border-color: #260072;
    }
    border-color: #260072;
    color: #260072;
`;

export const FormContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 8px;
`;
