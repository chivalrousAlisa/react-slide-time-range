
## Installation

```
$ npm install --save react-slide-time-range
$ yarn add react-slide-time-range
```

> RC.5 `useLazyContainer has been removed. The lazy container is opt-in`

## Features

- 可点击选择起始时间，也可拖动选择起始时间
- 时间区间可配置
- 可设置时间

## Usage

```javascript
  import React, { Component } from 'react';
  import { SlideTimeRange } from 'slide-time-range.js';

  class App extends Component {
    render(){
      return (
        <div>
          <SlideTimeRange
            startTime="07:10"
            endTime="8:20"
          />
        </div>
      );
    }
  }
```

## API-props

| Props                | Type                   | Default   | Description                                                                                         |
|----------------------|------------------------|-----------|-----------------------------------------------------------------------------------------------------|
| startTime            | string                 | ""       |  7:00     |
| endTime          |  string                | ""        | 结束时间9:00 |
| timeOptions        |  array                | 7:00-12:00       | |

## API-function
 
- getData()
- setData({startTime:"8:00",endTime:"9:56"})
