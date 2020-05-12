# React-SlideTimeRange

> 

## Demo

[A demo is worth a thousand words]()

## Installation

```
$ npm install --save react-slide-time-range
$ yarn add react-slide-time-range
```

> RC.5 `useLazyContainer has been removed. The lazy container is opt-in`

## Features

- Easy to set up for real, you can make it work in less than 10sec!
- Super easy to customize
- RTL support
- Swipe to close 👌
- Can display a react component inside the toast!
- Has ```onOpen``` and ```onClose``` hooks. Both can access the props passed to the react component rendered inside the toast
- Can remove a toast programmatically
- Define behavior per toast
- Pause toast when the window loses focus 👁
- Fancy progress bar to display the remaining time
- Possibility to update a toast
- You can control the progress bar a la `nprogress` 😲
- Starting v5 the `ToastContainer` is optional if you want to 😎

## Usage

```javascript
  import React, { Component } from 'react';
  import SlideTimeRange from 'react-slide-time-range';
  import 'react-slide-time-range/dist/ReactSlideTimeRange.css';
  // minified version is also included
  // import 'react-slide-time-range/dist/ReactSlideTimeRange.min.css';

  class App extends Component {
    notify = () => toast("Wow so easy !");

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

## API

### ToastContainer

| Props                | Type                   | Default   | Description                                                                                         |
|----------------------|------------------------|-----------|-----------------------------------------------------------------------------------------------------|
| startTime            | string                 | ""       |  7:00     |
| endTime          |  string                | ""        | 结束时间9:00 |
| timeOptions        |  array                | 7:00-12:00       | |



## License

Licensed under MIT
