import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

interface Props {
    isOpen: boolean;
}
function Loading(props: Props) {
    const { isOpen } = props;
    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default Loading;
