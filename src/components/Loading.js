import React from 'react';
import classNames from 'classnames';
import wheel from '../images/loading.png';

const Loading = ({ isReady }) => {
    return (
        <div className={classNames('box-loading', { hide: isReady })}>
            <h2>Data loading...</h2>
            <div className="loading-animation">
                <img src={wheel} alt="loading" />
            </div>
        </div>
    );
}

export default Loading;