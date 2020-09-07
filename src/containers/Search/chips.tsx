import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() =>
    createStyles({
        chip: {
            fontWeight: 'bold',
            borderRadius: 40,
            height: '100%',
        },
        icon: {
            width: '1.2em',
            height: '1.2em',
        },
    })
);

interface IChips {
    setChips: any;
}

interface TagType {
    id: number;
    name: string;
    icon?: null | string;
    deleted: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedOn?: string;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export function Chips({ setChips }: IChips) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<TagType[]>([]);
    const loading = open && options.length === 0;

    /*
    const getIcon = (type: string | null) => {
        switch (type) {
            case 'person':
                return <FaceIcon className={classes.icon} />;

            default:
                return (
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                        #
                    </Typography>
                );
        }
    };
    
    const getColor = (type: string) => {
        switch (type) {
            case 'person':
                return 'secondary';

            default:
                return 'primary';
        }
	};*/

    const fetchChips = async (active: boolean) => {
        const response = await fetch('https://api.eportfolio.tech/tags/');
        await sleep(500); // For demo purposes.
        const tags = await response.json();

        if (active) {
            setOptions(tags);
        }
    };

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        fetchChips(active);

        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <Autocomplete
            multiple
            id='size-small-filled-multi'
            size='small'
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            options={options}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            renderTags={(value: any, getTagProps: any) =>
                value.map((option: TagType, index: number) => (
                    <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        color='primary'
                        variant='default'
                        icon={
                            <Typography
                                variant='h6'
                                style={{ fontWeight: 'bold' }}
                            >
                                #
                            </Typography>
                        }
                        className={classes.chip}
                    />
                ))
            }
            onChange={(event: any, value: TagType[]) => setChips(value)}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color='inherit'
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                        variant='outlined'
                        size='medium'
                    />
                );
            }}
        />
    );
}
