import React from 'react';
import {TextField} from '@material-ui/core';

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
            style={{background: 'white', borderRadius: 4}}
        />
    );
};
