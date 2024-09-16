import request from '@/utils/request';

export async function queryAdvancedTest() {
  return request('/api/test/testone');
}
