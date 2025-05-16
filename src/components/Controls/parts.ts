import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

// @ts-expect-error issue with react-bootstrap+drei
export const ButtonBase = styled(Button)`
    font-size: 24px;
    padding: 2px 8px;

    svg {
        margin-bottom: 2px;
    }
`;

export const DayButton = styled(ButtonBase)`
    &.active,
    &:hover {
        background-color: #ffd000;
        border-color: #ffd000;
        color: #505050;
    }
    border-color: #af8c00;
    color: #af8c00;
`;

export const NightButton = styled(ButtonBase)`
    &.active,
    &:hover {
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
