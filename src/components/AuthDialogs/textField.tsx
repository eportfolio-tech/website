import React from 'react';
import {TextField} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {IRootState} from '../../index';

interface ITextField {
    label: string;
    required?: boolean;
    setState: any;
    type?: string;
}

/***
 * Login field.
 */
export default ({label, required, setState, type}: ITextField) => {
    const alert = useSelector<IRootState, any>((state) => state.alert);

    return (
        <TextField
            variant="filled"
            margin="normal"
            required={required}
            fullWidth
            id={label}
            label={label}
            autoComplete={label}
            type={type}
            onChange={(e) => {
                setState(e.target.value);
            }}
            error={alert.type === 'error'}
        />
    );
};
