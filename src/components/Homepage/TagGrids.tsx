import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../Typography/Typography';

const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(4),
        },
        images: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexWrap: 'wrap',
        },
        imageWrapper: {
            position: 'relative',
            display: 'block',
            padding: 0,
            borderRadius: 0,
            height: '40vh',
            [theme.breakpoints.down('sm')]: {
                width: '100% !important',
                height: 100,
            },
            '&:hover': {
                zIndex: 1,
            },
            '&:hover $imageBackdrop': {
                opacity: 0.15,
            },
            '&:hover $imageMarked': {
                opacity: 0,
            },
            '&:hover $imageTitle': {
                border: '4px solid currentColor',
            },
        },
        imageButton: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.common.white,
        },
        imageSrc: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
        },
        imageBackdrop: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            background: theme.palette.common.black,
            opacity: 0.5,
            transition: theme.transitions.create('opacity'),
        },
        imageTitle: {
            position: 'relative',
            padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
        },
        imageMarked: {
            height: 3,
            width: 18,
            background: theme.palette.common.white,
            position: 'absolute',
            bottom: -2,
            left: 'calc(50% - 9px)',
            transition: theme.transitions.create('opacity'),
        },
    })
);

function ProductCategories() {
    const classes = useStyles();

    const images = [
        {
            url: 'https://comp30002.blob.core.windows.net/image/cs.jpg',
            title: 'Computer Science',
            width: '40%',
        },
        {
            url: 'https://comp30002.blob.core.windows.net/image/science.png',
            title: 'Science',
            width: '20%',
        },
        {
            url:
                'https://comp30002.blob.core.windows.net/image/Architecture.jpg',
            title: 'Architecture',
            width: '40%',
        },
        {
            url: 'https://comp30002.blob.core.windows.net/image/arts.jpg',
            title: 'Arts',
            width: '38%',
        },
        {
            url: 'https://comp30002.blob.core.windows.net/image/fine.jpg',
            title: 'Fine Arts',
            width: '38%',
        },
        {
            url: 'https://comp30002.blob.core.windows.net/image/law.jpg',
            title: 'Law',
            width: '24%',
        },
        {
            url: 'https://comp30002.blob.core.windows.net/image/commence.jpg',
            title: 'Business',
            width: '40%',
        },
        {
            url: 'https://comp30002.blob.core.windows.net/image/education.jpg',
            title: 'Education',
            width: '20%',
        },
        {
            url: 'https://comp30002.blob.core.windows.net/image/health.jpg',
            title: 'Health',
            width: '40%',
        },
    ];

    return (
        <Container className={classes.root} component="section">
            <Typography
                variant="h4"
                marked="center"
                align="center"
                component="h2"
            >
                Discover E-Portfolios by Tags
            </Typography>
            <div className={classes.images}>
                {images.map((image) => (
                    <ButtonBase
                        key={image.title}
                        className={classes.imageWrapper}
                        style={{
                            width: image.width,
                        }}
                    >
                        <div
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <div className={classes.imageBackdrop} />
                        <div className={classes.imageButton}>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {image.title}
                                <div className={classes.imageMarked} />
                            </Typography>
                        </div>
                    </ButtonBase>
                ))}
            </div>
        </Container>
    );
}

export default ProductCategories;
