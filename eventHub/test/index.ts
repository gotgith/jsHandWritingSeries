import EventHub from '../src/index';


const test1 = (message) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true, 'eventHub是一个对象');
  console.log(message);
};


const test2 = (message) => {
  const eventHub = new EventHub();
  let called = false;
  eventHub.on('xxx', (p) => {
    called = true;
    console.assert(p === '我是参数，哈哈');

  });
  eventHub.emit('xxx', '我是参数，哈哈');
  setTimeout(() => {
    console.assert(called === true);
    console.log(message);
  }, 1000);
};


const test3 = (message) => {
  let called = false;
  const fn1 = () => {
    called = true;
  };
  const eventHub = new EventHub();
  eventHub.on('yyy', fn1);
  eventHub.off('yyy', fn1);
  eventHub.emit('yyy');
  setTimeout(() => {
    console.assert(called === false);
    console.log(message);
  }, 1000);
};

test1('EventHub 可以创建对象');
test2('.on 以后 .emit 会触发 .on函数');
test3('.off 有用');





