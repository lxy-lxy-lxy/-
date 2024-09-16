import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/testsecond', {
    method: 'POST',
    data: params,
  });
}
