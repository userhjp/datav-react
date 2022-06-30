import { IPageType } from '@/datav/react/interface';
import { waitTime } from '@/datav/shared';

const SnapshotKey = 'DataV-Snapshot';
const PreviewKey = 'Datav-Preview';

export const getSnapshot = async (id: string) => {
  await waitTime(500);
  try {
    const json = JSON.parse(localStorage.getItem(`${SnapshotKey}-${id}`));
    return json;
  } catch (error) {
    localStorage.removeItem(`${SnapshotKey}-${id}`);
  }
  return null;
};

export const setSnapshot = (id: string, data: IPageType) => {
  localStorage.setItem(`${SnapshotKey}-${id}`, JSON.stringify(data));
};

export const getPreviewKey = () => {
  try {
    return JSON.parse(sessionStorage.getItem(PreviewKey));
  } catch (error) {
    sessionStorage.removeItem(PreviewKey);
  }
  return null;
};

export const setPreviewKey = (data: IPageType) => {
  sessionStorage.setItem(PreviewKey, JSON.stringify(data));
};
