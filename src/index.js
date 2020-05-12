import React from 'react';
import { AMOPTIONS, getPrecentValByTime, getPrecentValByClient, getDisplayTimeByPrecent, getClientValByPrecent } from "./utils"
require('./../scss/main.scss');
class SlideTimeRange extends React.Component {

  // static propTypes = {
  //   endTime: PropTypes.string,
  //   startTime: PropTypes.string,
  //   dataOptions: PropTypes.arrayOf(PropTypes.object),
  // };

  constructor(props) {
    super(props);
    this.state = {
      startTime:props.startTime,
      endTime:props.endTime,
      startPoint:0,
      endPoint:0
    };
    this.dataOptions = this.props.timeOptions;
    // startPoint,endPoint 百分比值的数值
    if(this.props.startTime){
      this.state.startPoint = getPrecentValByTime(this.dataOptions,this.props.startTime);
    }
    if(this.props.endTime){
      this.state.endPoint = getPrecentValByTime(this.dataOptions,this.props.endTime);
    }
    this.containerWidth = window.innerWidth;
    this.extralW = 40;
  }

  touchstart(event) {
    const targetTouches = event.targetTouches;
    if (targetTouches.length >= 1){
      const targetDom = targetTouches[0];
      if (targetDom){
        const clientX = targetDom.clientX;
        // console.log("开始拖动clientX", clientX);
      }
    }
  }

  touchmove(slideType, event) {
    const newState = {...{}, ...this.state};   
    const minW = this.extralW;
    const maxW = this.containerWidth - minW;
    const targetTouches = event.targetTouches;
    if (targetTouches.length >= 1) {
      const targetDom = targetTouches[0];
      if (targetDom) {
        let needSet = false;
        const clientX = targetDom.clientX;
        // console.log("拖动中clientX", clientX);
        if (slideType === "ssp"){
          // 拖动的是开始时间时，往右拖不能大于 结束时间的client
          // 允许拖动的 clientX 的范围:minW-maxW
          // 拖动的是结束时间，往左拖不能小于 开始时间的client
          const endClientNum = getClientValByPrecent(newState.endPoint, this.extralW);
          if (clientX >= minW && clientX <= maxW && clientX <= endClientNum) {
            // console.log("有效的拖动");
            needSet = true;
            newState.startPoint = getPrecentValByClient(clientX, this.extralW);
            newState.startTime = getDisplayTimeByPrecent(newState.startPoint, this.dataOptions);
            newState.endTime = getDisplayTimeByPrecent(newState.endPoint, this.dataOptions);
          }
        } else {
          // 允许拖动的 clientX 的范围:minW-maxW
          // 拖动的是结束时间，往左拖不能小于 开始时间的client
          const startClientNum = getClientValByPrecent(newState.startPoint, this.extralW);
          if (clientX >= minW && clientX <= maxW && clientX >= startClientNum) {
            // console.log("有效的拖动");
            needSet = true;
            newState.endPoint = getPrecentValByClient(clientX, this.extralW);
            newState.startTime = getDisplayTimeByPrecent(newState.startPoint, this.dataOptions);
            newState.endTime = getDisplayTimeByPrecent(newState.endPoint, this.dataOptions);
          }
        }
        // bugfixed,两个点都在最右边的时候，因为是结束点在上面，导致不能往左拖动了，以及两点相等的时候，只能往右拖，不能往左拖动
        if (needSet) {
          this.setState(newState);
        }
      }
    }
  }

  touchend(event) {
    const targetDom = event.targetTouches;
    // console.log("拖动结束");
  }

  touchcancel(event) {
    const targetTouches = event.targetTouches;
    // console.log("拖动取消targetDom");
    if (targetTouches.length >= 1) {
      const targetDom = targetTouches[0];
      if (targetDom) {
        // console.log("拖动取消targetDom", targetDom);
        const clientX = targetDom.clientX;
        // console.log("拖动取消clientX", clientX);
      }
    }
  }
  
  onTimeSliderClick(event) {
    // console.log("event.clientX", event.clientX);
    const newState = {...{}, ...this.state};   
    const { startPoint, endPoint} = newState;
    const precentPointVal = getPrecentValByClient(event.clientX, this.extralW); // 点击位置的点，对应的百分比值
    const numStartPointer = getClientValByPrecent(startPoint, this.extralW);// 橙色条的起点clientX
    const numEndPointer = getClientValByPrecent(endPoint, this.extralW);
    // 判断 点击点 是在橙色浮层条的左边 还是 右边
    if (event.clientX < numStartPointer) {
      // 在左边，移动startPoint--
      newState.startPoint = precentPointVal;
    } else if (event.clientX > numEndPointer) {
      // 在右边，移动endPoint++
      newState.endPoint = precentPointVal;
    } else if (event.clientX > numStartPointer && event.clientX < numEndPointer) {
      // 在橙色浮层条里边，进一步判断，点击点是靠左一点还是靠右一些（相对于橙色条的）
      // const middleClientPointer = (maxW - minW)/2; // 相对于灰色条的
      const middleClientPointer = (numEndPointer - numStartPointer) / 2 + numStartPointer;
      if (event.clientX < middleClientPointer){
        // 左边
        newState.startPoint = precentPointVal;
      } else {
        newState.endPoint = precentPointVal;
      }
    }
    //将最终的百分比形式的 point 转为展示的时间值
    newState.startTime = getDisplayTimeByPrecent(newState.startPoint, this.dataOptions);
    newState.endTime = getDisplayTimeByPrecent(newState.endPoint, this.dataOptions);
    this.setState(newState);
  }

  render() {
    const stateVo = this.state;
    const sWidth = (this.containerWidth - this.extralW * 2) / (this.dataOptions.length - 1);
    return (
    <div className="houjiegd-drag-time-filed" style={{ paddingLeft: `${this.extralW}px`, paddingRight: `${this.extralW}px` }}>
      <div className="top-box"><span style={{ paddingRight: "5px", color: "rgba(0,0,0,.6)", fontSize: "14px" }}>已选：</span><span>{`${stateVo.startTime || ""} - ${stateVo.endTime || ""}`}</span></div>
      <div className="middle-box nav-customer-scroll-box" onClick={this.onTimeSliderClick.bind(this)}>
        <span className="nav-customer-scroll"></span>
        <span className="nav-customer-scroll-bar" style={{ left: `${stateVo.startPoint}%`, width: `${stateVo.endPoint - stateVo.startPoint}%` }}></span>
        <a className="slider-handle slider-handle-start"
        style={{ left: `${stateVo.startPoint}%` }}
        onTouchStart={this.touchstart.bind(this)}
        onTouchMove={this.touchmove.bind(this, "ssp")}
        onTouchEnd={this.touchend.bind(this)}
        onTouchCancel={this.touchcancel.bind(this)}
        ></a>
        <a className="slider-handle slider-handle-end"
        onTouchStart={this.touchstart.bind(this)}
        onTouchMove={this.touchmove.bind(this, "sep")}
        onTouchEnd={this.touchend.bind(this)}
        onTouchCancel={this.touchcancel.bind(this)}
        style={{ left: `${stateVo.endPoint}%` }}></a>
      </div>
      <div className="bottom-box">
        <div className="scale-box">
          {
            this.dataOptions.map((item, index) => {
              return (
                <span className="scale-item" style={{ left: `${sWidth * index}px` }} key={index}>
                </span>
              )
            })
          }
        </div>
        <div className="timeval-box">
          {
            this.dataOptions.map((item, index) => {
              return (
                <span className="time-item" style={{ left: `${sWidth * index}px` }} key={index}>
                  {item.text}
                </span>
              )
            })
          }
        </div>
      </div>
    </div>
    );
  }
}

SlideTimeRange.defaultProps = {
  timeOptions:AMOPTIONS
};

export default SlideTimeRange;
