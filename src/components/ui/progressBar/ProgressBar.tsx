import { FC } from 'react';
import classNames from 'classnames';

import './ProgressBar.css';

interface ProgressBarProps {
  className?: string;
  leftPercentValue: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ className, leftPercentValue = 0 }) => {
    const leftChunkPercent = leftPercentValue < 0 ? 0 : leftPercentValue > 100 ? 100 : leftPercentValue
    return (
        <div 
            className={classNames('progress-bar-container', className)}
            data-left-chunk-percent={leftChunkPercent} 
                style={{ '--left-chunk-percent': `${leftChunkPercent}%` } as React.CSSProperties}
        >
            <span className="progress-bar-chunk progress-bar-chunk-left"/>
            <span className="progress-bar-chunk progress-bar-chunk-right"/>
        </div>
    );
};

export default ProgressBar;