import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UserActions from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation';

export function* login(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.login, params)
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(UserActions.requestSuccess(data))
      yield put(NavigationActions.navigate({ routeName: 'App' }))
      const { userId } = data
      const res = yield call(api.getUserInfo, { userId })
      const { code: infoCode = 0, msg: infoMsg = "", data: info } = res.data
      if (!infoCode) {
        yield put(UserActions.requestSuccess(info))
      } else {
        // TODO toast
        yield put(UserActions.requestFailure())
      }
    } else {
      // TODO toast
      yield put(NavigationActions.navigate({ routeName: 'Auth' }))
      yield put(UserActions.requestFailure())
    }
  } catch (error) {
    console.log('==========login===error=======================');
    console.log(error);
    console.log('==========login===error=======================');
  }
}

export function* getUserInfo(api, { data: params }) {
  try {
    // make the call to the api
    const response = yield call(api.getUserInfo, params)
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(UserActions.requestSuccess(data))
    } else {
      // TODO toast
      yield put(UserActions.requestFailure())
    }
  } catch (error) {
    console.log('==========getUserInfo===error=======================');
    console.log(error);
    console.log('==========getUserInfo===error=======================');
  }
}

export function* logout(api, action) {
  try {
    // make the call to the api
    const response = yield call(api.logout)
    console.log('============response========================');
    console.log(response);
    console.log('============response========================');
    const { code = 0, msg = "", data } = response.data
    if (!code) {
      yield put(UserActions.requestSuccess({status: 0}))
      yield put(NavigationActions.navigate({ routeName: 'Auth' }))
    } else {
      // TODO toast
      yield put(UserActions.requestFailure())
      yield put(NavigationActions.navigate({ routeName: 'App' }))
    }
  } catch (error) {
    console.log('==========logout===error=======================');
    console.log(error);
    console.log('==========logout===error=======================');
  }
}
