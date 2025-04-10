import {FC} from 'react';
import classNames from 'classnames';

import './ProgressBar.css';

interface ProgressBarProps {
    className?: string;
    leftPercentValue: number;
}

const ProgressBar: FC<ProgressBarProps> = ({className, leftPercentValue = 0}) => {
    const leftChunkPercent = leftPercentValue < 0 ? 0 : leftPercentValue > 100 ? 100 : leftPercentValue
    return (
        <div className="main-progress-bar">
            <div
                className={classNames('progress-bar-container', className)}
                data-left-chunk-percent={leftChunkPercent}
                style={{'--left-chunk-percent': `${leftChunkPercent}%`, width: '100%', margin: '5px 0'} as React.CSSProperties}
            >
                <span className="progress-bar-chunk progress-bar-chunk-left"/>
                <span className="progress-bar-chunk progress-bar-chunk-right"/>
            </div>
        </div>
    );
};

export default ProgressBar;