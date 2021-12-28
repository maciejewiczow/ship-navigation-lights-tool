import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, ...rest }) => (
    <Button
        active={checked}
        variant="outline-primary"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
    >
        {checked ? <AiOutlineCheck /> : <AiOutlineClose />}
    </Button>
);
