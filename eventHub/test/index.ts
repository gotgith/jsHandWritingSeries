import EventHub from '../src/index';

type testCase = (message: string) => void

const test1: testCase = message => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true, 'eventHub是一个对象');
  console.log(message);
};


const test2: testCase = message => {
  const eventHub = new EventHub();
  let called = false;
  eventHub.on('xxx', (p) => {
    called = true;
    console.assert(p === '我是参数，哈哈');

  });
  eventHub.emit('xxx', '我是参数，哈哈');
  console.assert(called);
  console.log(message);
};


const test3: testCase = message => {
  let called = false;
  const fn1 = () => {
    called = true;
  };
  const eventHub = new EventHub();
  eventHub.on('yyy', fn1);
  eventHub.off('yyy', fn1);
  eventHub.emit('yyy');
  console.assert(called === false);
  console.log(message);
};

test1('EventHub 可以创建对象');
test2('.on 以后 .emit 会触发 .on函数');
test3('.off 有用');





