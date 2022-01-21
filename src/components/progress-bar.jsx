import React from 'react';

function ProgressBar(props) {
    return (
        <div className="progress" style={{ height: 10 + 'px' }}>
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={props.complete} aria-valuemin="0" aria-valuemax="100" style={{ width: props.complete + '%' }}></div>
        </div>
    );
}

export default ProgressBar;