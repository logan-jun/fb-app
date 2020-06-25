const fs = require('fs');
const schedule = require('node-schedule');
const moment = require('moment');
const randomstring = require("randomstring");
let count = 0;
let data = '';
function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomTaskCurState = () => {
  const n = getRandomInt(0, 5);
  if (n == 0) {
    return 'Error';
  }
  else if (n == 1) {
    return 'Init';
  }
  else if (n == 2) {
    return 'Start';
  }
  else if (n == 3) {
    return 'End';
  }
  else if (n == 4) {
    return 'Error';
  }
  return 'Error';
}

const getRandomLevel = () => {
  const n = getRandomInt(0, 3);
  if (n == 0) {
    return 'error';
  }
  else if (n == 1) {
    return 'info';
  }
  else if (n == 2) {
    return 'warning';
  }
  return 'error';
}

const getRandomMemoryState = () => {
  const total = getRandomInt(1000, 2000);
  const used = getRandomInt(0, total);
  return {
    total,
    available: total - used,
    percent: Math.round((used / total) * 100),
    used,
    free: total - used,
    active: used,
    inactive: total - used,
    wired: getRandomInt(0, total)
  };
}


const j = schedule.scheduleJob('*/5 * * * * *', function(){
  count++;
  const date = new Date();
  const dFormat = "YYYY-MM-DD HH:mm:ss:SSS";
  const dateTime = moment(date).format(dFormat);
  const task = randomstring.generate(1);
  let logdata = {
      timestamp: dateTime,
      invokeId: getRandomInt(0, 1000),
      traceId: getRandomInt(0, 1000),
      inParameters: [{ name: 'inparam' },{ value: randomstring.generate(5) }],
      podName: 'p' + getRandomInt(0, 10),
      productId: getRandomInt(0, 1000),
      processId: getRandomInt(0, 1000),
      projectId: getRandomInt(0, 1000),
      wfId: getRandomInt(0, 1000),
      taskId: task + getRandomInt(0, 100),
      taskTypeId: task,
      modelId: randomstring.generate(5) + '' + getRandomInt(0, 5),
      cpu: getRandomInt(0, 100),
      memory: getRandomMemoryState(),
      procCount: getRandomInt(0, 100),
      inferCallTime: moment(date - getRandomInt(50000, 100000)).format(dFormat),
      inferRespTime: moment(date - getRandomInt(10000, 20000)).format(dFormat),
      prodTopic: randomstring.generate(5),
      consTopic: randomstring.generate(5),
      groupId: randomstring.generate(1) + getRandomInt(0, 5),
      taskCurState: getRandomTaskCurState(),
      msg: randomstring.generate(10),
      level: getRandomLevel()
  };
  console.log('every five seconds -> ' + dateTime);
  console.log(logdata);
  data += JSON.stringify(logdata) + '\n';
  if (count == 12) {
    fs.writeFileSync(logdata.podName + '_' + moment(date).format('YYYY-MM-DD HH:mm:ss') +'.log', data);
    data = '';
    count = 0;
  }
});
