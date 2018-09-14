import React, { Component } from 'react';
import './App.css';

import { searchers, clicks, bookings } from './Icons';

import Navigation from './Navigation';
import Errors from './Errors';
import DescriptionCard from './DescriptionCard';

class App extends Component {
  state = { response: null, selectedMetric: null };

  componentDidMount() {
    fetch('http://127.0.0.1:5000/api')
      .then(res => res.json())
      .then(response => {
        this.setState({ response });
      });
  }

  onButtonClick = selectedMetric => {
    if (selectedMetric !== this.state.selectedMetric) {
      this.setState({ selectedMetric });
    }
  };

  render() {
    const { response, selectedMetric } = this.state;

    const mobileTraffic =
      response &&
      selectedMetric &&
      response.data[0].mobile_pessimizer.toFixed();

    const desktopTraffic =
      response && selectedMetric && response.data[0].web_pessimizer.toFixed();

    return (
      <div className="App">
        <h1 className="App-title">Main metrics</h1>
        <Navigation
          data={response}
          onButtonClick={this.onButtonClick}
          selectedMetric={selectedMetric}
        />
        <Errors selectedMetric={selectedMetric} data={response} />
        <div className="description">
          <DescriptionCard
            title="Searches"
            icon={searchers}
            selectedMetric={selectedMetric}
            data={response}
          >
            <div className="descrTitle">Mobile traffic: {mobileTraffic}%</div>
            <div className="descrTitle">Web traffic: {desktopTraffic}%</div>
            <div className="descrText">
              You get {desktopTraffic}% traffic on desktop and {mobileTraffic}%
              traffic on mobile devices
            </div>
            <div className="links">
              Help: <a href="#">Searches</a>, <a href="#">Pessimisation</a>
            </div>
          </DescriptionCard>
          <DescriptionCard
            icon={clicks}
            title="Clicks"
            selectedMetric={selectedMetric}
            data={response}
          >
            <div className="descrTitle">
              CTR:{' '}
              {response &&
                selectedMetric &&
                response.data[0][`ctr_${selectedMetric}`].toFixed(2)}
              %
            </div>
            <div className="descrText">
              Conversion from searches to clicks on all devices
            </div>
            <div className="links">
              Help: <a href="#">CTR</a>, <a href="#">Clicks</a>
            </div>
          </DescriptionCard>

          <DescriptionCard
            icon={bookings}
            title="Bookings"
            selectedMetric={selectedMetric}
            data={response}
            skipArrow
          >
            <div className="descrTitle">
              STR:{' '}
              {response &&
              selectedMetric &&
              response.data[0][`str_${selectedMetric}`]
                ? `${response.data[0][`str_${selectedMetric}`].toFixed(2)}%`
                : 'no data'}
            </div>

            <div className="descrText">
              Conversion from clicks to bookings on all devices
            </div>
            <div className="links">
              Help: <a href="#">STR</a>, <a href="#">Bookings</a>,{' '}
              <a href="#">Avg. Check</a>
            </div>
          </DescriptionCard>
        </div>
      </div>
    );
  }
}

export default App;
