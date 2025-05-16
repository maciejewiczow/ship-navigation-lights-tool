import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, ...rest }) => (
    // @ts-expect-error https://github.com/pmndrs/drei/issues/704
    <Button
        active={checked}
        variant="outline-primary"
        {...rest}
    >
        {checked ? <AiOutlineCheck /> : <AiOutlineClose />}
    </Button>
);
