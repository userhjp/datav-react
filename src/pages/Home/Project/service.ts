import { request } from '@/services';
import { message } from 'antd';
import axios from 'axios';

/** 列表 */
export async function queryProjectList(params?: { [key: string]: any }) {
  // const example1 = await axios.get('/json/example1.json');
  // const example2 = await axios.get('/json/example2.json');
  // const example3 = await axios.get('/json/example3.json');
  // return [
  //   {
  //     id: 'example1',
  //     name: '运行管理主题屏',
  //     options: example1.data,
  //     cover: example1.data.page.cutCover,
  //     createtime: '2022-06-30 23:51:23',
  //   },
  //   {
  //     id: 'example3',
  //     name: '运行管理主题屏-深色',
  //     options: example3.data,
  //     cover: example3.data.page.cutCover,
  //     createtime: '2022-07-04 31:31:46',
  //   },
  //   {
  //     id: 'example2',
  //     name: '气量管理主题屏',
  //     options: example2.data,
  //     cover: example2.data.page.cutCover,
  //     createtime: '2022-07-01 02:47:23',
  //   },
  // ];
  const res = await request('/datav/getList', {
    method: 'POST',
    params,
  });
  return res.data.list || [];
}

/** 删除 */
export async function delProject(ids: string[]) {
  return request('/datav/delete', {
    method: 'POST',
    params: { ids: ids.join() },
  });
}

/** 新增/编辑 */
export function publishState(params: any) {
  return request('/datav/publishState', {
    method: 'POST',
    params,
  });
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
