import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { ValidatedControl } from './ValidatedControl';

// @ts-expect-error issue with react-bootstrap+drei
export const ButtonBase = styled(Button)`
    font-size: 24px;

    svg {
        margin-bottom: 5px;
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
    grid-template-columns: repeat(2, auto);
    column-gap: 16px;
    row-gap: 12px;

    > *:nth-child(2n) {
        text-align: center;
    }

    > *:nth-child(2n + 1) {
        display: flex;
        align-items: center;
    }
`;

export const NaturalWidthControl = styled(ValidatedControl)`
    flex: unset !important;
    width: 100px !important;
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore problem with boostrap + drei
export const InputGroupText = styled(InputGroup.Text)`
    font-family: monospace;
`;
