
import { render } from 'react-dom';
import React from 'react';
import SlideTimeRange from './slide-time-range.js';
require("./index.scss");

class App extends React.Component {
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
          ref={(c) => {this.SlideTimeRange = c}}
          startTime="07:10"
          endTime="8:20"
        />
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => {
            console.log(this.SlideTimeRange.getData());
          }}>获取</button>
          <button onClick={() => {
            this.SlideTimeRange.setData({startTime:"8:00",endTime:"9:56"})
          }}>设置</button>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
