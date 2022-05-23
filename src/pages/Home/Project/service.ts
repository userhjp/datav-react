import { request } from '@/services';
import { message } from 'antd';

/** 列表 */
export function queryProjectList(params?: { [key: string]: any }) {
  return request('/visual/project/list', {
    method: 'POST',
    params,
  });
}

/** 删除 */
export async function delProject(ids: string[]) {
  try {
    const res = await request('/visual/project/delete', {
      method: 'POST',
      params: { ids },
    });
    if (res.code === 0) {
      message.success({
        content: '删除成功',
        className: 'dv-message-class',
      });
    }
  } catch (error) {
    message.error({
      content: '服务器繁忙，请稍后再试',
      className: 'dv-message-class',
    });
  }
}

/** 新增/编辑 */
export function editProject(params: any) {
  return request('/visual/project/edit', {
    method: 'POST',
    params,
  });
}

export function getProjectDetail(params: any) {
  return request('/visual/project/detail', {
    method: 'POST',
    params,
  });
}
