import React, { Fragment } from 'react';
import './Errors.css';

const CATEGORIES = ['Errors', 'Zeroes', 'Timeout'];

const Errors = ({ data, selectedMetric }) => (
  <div className="errorsWrapper">
    {data &&
      CATEGORIES.map(
        item =>
          data.data[0][`${item.toLowerCase()}_${selectedMetric}`] && (
            <div key={item}>
              <div className="errorCategory">
                {item}:{' '}
                {data.data[0][
                  `${item.toLowerCase()}_${selectedMetric}`
                ].toFixed(2)}
                %
              </div>
              <div className="Average">Average 0,11%</div>
            </div>
          ),
      )}
    {selectedMetric &&
      data[`errors_${selectedMetric}`] &&
      !!data[`errors_${selectedMetric}`].length && (
        <Fragment>
          <div className="progressBar">
            {data[`errors_${selectedMetric}`].map((item, index) => {
              const sum = data[`errors_${selectedMetric}`]
                .map(item => item.count)
                .reduce((a, b) => a + b, 0);
              return (
                <div
                  key={index}
                  className={`progressBarItem ${
                    item.code ? `error50${index}` : 'other'
                  }`}
                  style={{ width: `${(item.count / sum) * 100}%` }}
                />
              );
            })}
          </div>
          <div className="errorLegend">
            {data[`errors_${selectedMetric}`].map((item, index) => (
              <div
                key={index}
                className={`errorLegendItem ${
                  item.code ? `error50${index}Legend` : 'otherLegend'
                }`}
              >
                {item.code ? `Error ${item.code}` : 'Other'}: {item.count}
              </div>
            ))}
          </div>
        </Fragment>
      )}
  </div>
);

export default Errors;
