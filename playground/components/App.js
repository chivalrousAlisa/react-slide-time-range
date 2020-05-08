import React, { Component } from 'react';

import SlideTimeRange from './../../src/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: 'portrait',
      data: null, // 页面所有数据
      loading: true
    };
  }

  render() {
    return (
      <div>
      <SlideTimeRange
        startTime="07:10"
        endTime="8:20"
      />
      </div>
    )
  }
}

export default App;
