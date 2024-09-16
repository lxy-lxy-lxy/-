import { queryAdvancedTest } from './service';

const Model = {
  namespace: 'testAdvanced',
  state: {
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },
  effects: {
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedTest);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },
  reducers: {
    show(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
