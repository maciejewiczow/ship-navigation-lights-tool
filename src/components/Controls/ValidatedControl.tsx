import React, { useEffect, useState } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';

interface ValidatedControlProps extends Omit<FormControlProps, 'isValid'> {
    validate?: (val: FormControlProps['value']) => boolean;
}

export const ValidatedControl: React.FC<ValidatedControlProps> = ({
    value: propsValue,
    onChange,
    validate,
    ...props
}) => {
    const [value, setValue] = useState<FormControlProps['value']>(propsValue);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setValue(propsValue);
    }, [propsValue]);

    return (
        <Form.Control
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore same error with bootstrap + drei
            {...props}
            value={value}
            isInvalid={!isValid}
            onChange={e => {
                setValue(e.target.value);
                if (validate) {
                    const valid = validate(e.target.value);
                    setIsValid(valid);
                    if (valid) {
                        onChange?.(e);
                    }
                } else {
                    onChange?.(e);
                }
            }}
        />
    );
};
