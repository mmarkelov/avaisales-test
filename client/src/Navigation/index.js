import React from 'react';
import './Navigation.css';

const NAV = [
  { name: 'Last hour', value: 'last_hour' },
  { name: 'Today', value: 'today' },
  { name: 'Yesterday', value: 'yesterday' },
  { name: 'Last 3 days', value: 'last_3days' },
];

export default class Navigation extends React.Component {
  onClickWrapper = value => () => {
    this.props.onButtonClick(value);
  };

  checkAbility = value => {
    return this.props.data && !Object.keys(this.props.data).includes(`errors_${value}`)
  };

  render() {
    return (
      <nav>
        {NAV.map(item => (
          <button
            key={item.value}
            className={
              this.props.selectedMetric === item.value
                ? 'navButton isActive'
                : 'navButton'
            }
            onClick={this.onClickWrapper(item.value)}
            disabled={this.checkAbility(item.value)}
          >
            {item.name}
          </button>
        ))}
      </nav>
    );
  }
}
