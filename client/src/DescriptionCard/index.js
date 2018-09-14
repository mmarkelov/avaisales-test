import React from 'react';

import Arrow from '../Arrow';

import './DescriptionCard.css';

const DescriptionCard = ({
  title,
  icon,
  data,
  selectedMetric,
  children,
  skipArrow,
}) => {
  const currentValue =
    data &&
    selectedMetric &&
    data.data[0][`${title.toLowerCase()}_current_${selectedMetric}`];

  const prevValue =
    data &&
    selectedMetric &&
    data.data[0][`${title.toLowerCase()}_previous_${selectedMetric}`];

  return data && selectedMetric ? (
    <div className="card">
      <div className="container">
        <div className="shapes">
          <div
            className={`${
              currentValue > prevValue ? 'iconWrapper' : 'iconWrapper isRed'
            }`}
          >
            {icon}
          </div>
          {!skipArrow && <Arrow />}
        </div>
        <div className="text">
          <div className="title">
            {title}
            <span
              className={`${
                currentValue > prevValue ? 'percent' : 'percent minus'
              }`}
            >{`${currentValue > prevValue ? '+' : '-'}${Math.abs(
              100 - (currentValue / prevValue) * 100,
            ).toFixed()}%`}</span>
          </div>
          <div className="count">
            {currentValue}
            <span className="time">Current</span>
          </div>
          <div className="count previous">
            {prevValue}
            <span className="time">Previous</span>
          </div>
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  ) : null;
};

export default DescriptionCard;
