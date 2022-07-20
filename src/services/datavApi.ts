import { request } from '@/services';

/** 项目列表 */
export async function queryProjectList({
  pagesize,
  pagenum,
  keyword,
  sotrtype,
}: {
  pagesize: number;
  pagenum: number;
  keyword: string;
  sotrtype: number;
}) {
  const res = await request('/datav/getList', {
    method: 'POST',
    params: { pagesize, pagenum, keyword, sotrtype },
  });
  return res.data.list || [];
}

/** 删除项目 */
export async function delProject(ids: string[]) {
  return request('/datav/delete', {
    method: 'POST',
    params: { ids: ids.join() },
  });
}

/** 发布/取消发布 */
export function publishState({ id, publish }) {
  return request('/datav/publishState', {
    method: 'POST',
    params: { id, publish },
  });
}

/** 复制项目 */
export function copyProject(id: string) {
  return request('/datav/copyProject', {
    method: 'POST',
    params: {
      id,
    },
  });
}

/** 重命名项目名称 */
export function editProject(params: any) {
  return request('/datav/edit', {
    method: 'POST',
    params,
  });
}

/** 获取项目详情 */
export function getProjectDetail(id: string) {
  return request('/datav/getDetail', {
    method: 'POST',
    params: { id },
  });
}

/** 保存项目配置 */
export function saveConfig(id: string, config: object) {
  return request('/datav/saveConfig', {
    method: 'POST',
    data: { id, config },
  });
}

// 快照---------------------------

/** 获取快照列表 */
export function getSnapshotList(pid: string) {
  return request('/datav/getSnapshotList', {
    method: 'POST',
    params: { pid },
  });
}

/** 添加快照 */
export function addSnapshot(pid: string, config: object) {
  return request('/datav/addSnapshot', {
    method: 'POST',
    data: { pid, config },
  });
}

/** 删除快照 */
export function removeSnapshot(id: string) {
  return request('/datav/deleteSnapshot', {
    method: 'POST',
    params: { id },
  });
}

/** 获取快照详情 */
export function loadSnapshotDetail(id: string) {
  return request('/datav/getSnapshot', {
    method: 'POST',
    params: { id },
  });
}

/** 上传图片列表 */
export function getFileList(params: { pagesize: number; pagenum: number }) {
  return request('/datav/getFileList', {
    method: 'POST',
    params: {
      pagesize: params.pagesize,
      pagenum: params.pagenum,
    },
  });
}

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
