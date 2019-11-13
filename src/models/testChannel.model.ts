import { buffers } from 'redux-saga';
export default {
  namespace: 'test',
  state: {},
  effects: {
    watchRequest: [function * ({ take  }) {
      while (true) {
        yield take('test/haha');
        console.log('haha taken');
      }
    }, { type: 'watcher' }],
    watchRequest2: [function * (cmd) {
      const { put, take, actionChannel, fork } = cmd;
      const chan = yield actionChannel('test/haha', buffers.sliding(10));
      for (let i = 0; i <= 2; i += 1) {
        yield fork(requestHandler, cmd, chan, i);
      }
      // yield take('whatever');
    }, { type: 'watcher' }],
  },
}

function * requestHandler(cmd, chan, i) {
  const { put, take, actionChannel, fork, call } = cmd;

  while (true) {
    yield take(chan);
    yield call(delay, 2000);
    console.log(`handled by handler of number ${i}`);
  }
}

function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
