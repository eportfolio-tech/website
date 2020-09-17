import React, {useEffect, useRef} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
// import {render} from 'react-dom';

import {Button} from '@material-ui/core';
// import {createClassExpression} from 'typescript';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';
import {useState} from 'react';

import Dante from 'Dante2';

export default () => {
    return (
        <div>
            <Dante />
        </div>
    );
};
