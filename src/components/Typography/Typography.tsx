import React from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {capitalize} from '@material-ui/core/utils';
import MuiTypography from '@material-ui/core/Typography';

const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        markedH2Center: {
            height: 4,
            width: 73,
            display: 'block',
            margin: `${theme.spacing(1)}px auto 0`,
            backgroundColor: theme.palette.secondary.main,
        },
        markedH3Center: {
            height: 4,
            width: 55,
            display: 'block',
            margin: `${theme.spacing(1)}px auto 0`,
            backgroundColor: theme.palette.secondary.main,
        },
        markedH4Center: {
            height: 4,
            width: 55,
            display: 'block',
            margin: `${theme.spacing(1)}px auto 0`,
            backgroundColor: theme.palette.secondary.main,
        },
        markedH6Left: {
            height: 2,
            width: 28,
            display: 'block',
            marginTop: theme.spacing(0.5),
            background: 'currentColor',
        },
    })
);

interface ITypography {
    children?: any;
    marked?: string;
    variant:
        | 'inherit'
        | 'button'
        | 'overline'
        | 'caption'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'srOnly';
    align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
    color?:
        | 'inherit'
        | 'initial'
        | 'primary'
        | 'secondary'
        | 'textPrimary'
        | 'textSecondary'
        | 'error';
    component?: any;
    className?: any;
    gutterBottom?: boolean;
}

function Typography(props: ITypography) {
    const {
        children,
        marked,
        variant,
        align,
        color,
        component,
        className,
        gutterBottom,
    } = props;

    const classes = useStyles();

    return (
        <MuiTypography
            variant={variant}
            align={align}
            color={color}
            component={component}
            className={className}
            gutterBottom={gutterBottom}
        >
            {children}
            {marked ? (
                <span
                    className={
                        classes[
                            `marked${capitalize(variant) + capitalize(marked)}`
                        ]
                    }
                />
            ) : null}
        </MuiTypography>
    );
}

export default Typography;
