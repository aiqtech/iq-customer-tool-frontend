import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import { createCoupon } from 'app/core/sagas/entities';
import { closeModal } from 'app/modal/actions';

function* couponCreateFormSubmit(action) {
  const brandTask = yield fork(createCoupon, {
    data: action.payload.values
  });
  // Wait for request to finish
  const couponAction = yield take(['COUPONS_CREATE_SUCCESS', 'COUPONS_CREATE_FAILURE']);

  // Reject the form
  if(couponAction.type === 'COUPONS_CREATE_FAILURE') {
    action.payload.reject();
    return;
  }

  action.payload.resolve();
  // Need to go somewhere now...
  if(action.payload.isModal === true) {
    yield put(closeModal());
  }
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchCouponCreateFormSubmit() {
  yield takeEvery('COUPON_CREATE_FORM_SUBMIT', couponCreateFormSubmit);
};


export default function* root() {
  yield fork(watchCouponCreateFormSubmit);
};