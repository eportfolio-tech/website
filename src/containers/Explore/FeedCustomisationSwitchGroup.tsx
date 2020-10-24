import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

export default function SwitchesGroup(props: {config: any; changeConfig: any}) {
    // const [props.config, props.changeConfig] = React.useState({
    //     zoom: true,
    // });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeConfig({
            ...props.config,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Animation</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.config.zoom}
                            onChange={handleChange}
                            name="zoom"
                        />
                    }
                    label="Zoom in on click"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.config.layout}
                            onChange={handleChange}
                            name="layout"
                        />
                    }
                    label="Swiping Mode"
                />
                {/*<FormControlLabel*/}
                {/*    control={<Switch checked={props.config.antoine} onChange={handleChange} name="antoine" />}*/}
                {/*label="Antoine Llorca"*/}
                {/*    />*/}
            </FormGroup>
            <FormHelperText>Change animation of feed</FormHelperText>
        </FormControl>
    );
}
