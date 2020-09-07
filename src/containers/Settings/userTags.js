import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react';
import { userService } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';
import Button from '@material-ui/core/Button';

export default () => {
    const dispatch = useDispatch();
    const [userTags, setUserTags] = useState([]);

    const getTagHandler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.username;

            const tags = await userService.getUserTags(username);
            setUserTags(tags);
            dispatch(alertActions.success('get tags succeed'));
        } catch (error) {
            dispatch(alertActions.error('get tags failed'));
        }
    };

    return (
        <div>
            <ChipInput defaultValue={userTags} />
            <Button variant='contained' color='primary' onClick={getTagHandler}>
                Get your tags
            </Button>
        </div>
    );
};
