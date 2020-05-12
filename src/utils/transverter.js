import { nowDateStr } from "./constant";
export function printDate(value, paramVo) {
  if(!paramVo){paramVo = {}};
  const { hasTime=false, onlyHM=false } = paramVo;
  const date = new Date(value);
  const month = date.getMonth() + 1 < 10? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10? "0" + date.getDate() : date.getDate();
  const hour = date.getHours()<10? "0" + (date.getHours()) : date.getHours();
  const minute = date.getMinutes()<10? "0" + (date.getMinutes()) : date.getMinutes();
  const second = date.getSeconds()<10? "0" + (date.getSeconds()) : date.getSeconds();
  let newDate = date.getFullYear() + '-' + month + '-' + day;
  if(hasTime){
    newDate += " " + hour + ":" + minute + ":" + second;
  }
  if(onlyHM){
    newDate = hour + ":" + minute;
  }
  if (newDate == "NaN-NaN-NaN") {
      newDate = ""
  }
  return newDate;
}

function getTimeRange(timeOptions){
  // 获取临界点的两个时间毫秒数
  const dateStr = nowDateStr.replace(/-/g, "/");
  const startTimeStr = `${dateStr} ${timeOptions[0].text}`;
  const endTimeStr = `${dateStr} ${timeOptions[timeOptions.length - 1].text}`;

  const minTime = new Date(startTimeStr).getTime();
  const endTime = new Date(endTimeStr).getTime();
  return {
    minTime,
    endTime
  }
}

// 根据时间的毫秒数或者时间（09:30）获取起始点位的百分比值
export function getPrecentValByTime(timeOptions, targetTime) {
  if(!targetTime){
    return 0;
  }
  const timeRange = getTimeRange(timeOptions);
  const minStartTime = timeRange.minTime;
  const maxEndTime = timeRange.endTime;
  const timeStepRate = 100 / (maxEndTime - minStartTime);
  if(typeof targetTime === "string"){
    const dateStr = nowDateStr.replace(/-/g, "/");
    const targetTimeStr = `${dateStr} ${targetTime}`;
    targetTime = new Date(targetTimeStr).getTime();
  }
  let precentVal = (targetTime - minStartTime) * timeStepRate;
  if (precentVal < 0){
    precentVal = 0;
  }
  if (precentVal > 100){
    precentVal = 100;
  }
  return precentVal
}

// 根据百分比值获取点位的clientX值
export function getClientValByPrecent(precent, extralW) {
  // 计算起始点的百分比对应的 数值targetClientX， 20对应0%，345(maxW)对应100%，求对应百分之startPointer的 数值
  const minW = Number(extralW);
  const maxW = window.innerWidth - minW;
  const pointerRate = (maxW - minW) / 100;
  const clientNumVal = pointerRate * precent + minW; // 橙色条的起点clientX
  return clientNumVal;
}

// 根据百分比值获取点位的展示时间
export function getDisplayTimeByPrecent(precent, timeOptions) {
  //0,对应minStartTime，100对应maxEndTime
  const timeRange = getTimeRange(timeOptions);
  const minStartTime = timeRange.minTime;
  const maxEndTime = timeRange.endTime;
  // 单位百分比值的时间毫秒数
  const timeRate = (maxEndTime - minStartTime) / 100;
  const finallyTime = timeRate * precent + minStartTime; 
  
  const disTimeStr = printDate(finallyTime, { onlyHM:true });
  return disTimeStr;
}

// 根据clientX获取点位的百分比值
export function getPrecentValByClient(targetClientX, extralW) {
  // 计算起始点的百分比对应的 数值targetClientX， 20对应0%，345(maxW)对应100%，求对应百分之startPointer的 数值
  const minW = Number(extralW);
  const maxW = window.innerWidth - minW;
  const precentPoRate = 100 / (maxW - minW);
  const precentPointVal = (targetClientX - minW) * precentPoRate;
  return precentPointVal;
}
