import { IPageType } from '@/datav/react/interface';
import { waitTime } from '@/datav/shared';
import axios from 'axios';

const SnapshotKey = 'DataV-Snapshot';
const PreviewKey = 'Datav-Preview';

export const getSnapshot = async () => {
  await waitTime(500);
  try {
    const json = JSON.parse(localStorage.getItem(SnapshotKey));
    if (json) {
      return json;
    } else {
      const json2 = await axios.get('/json/demo.json');
      return json2.data;
    }
  } catch (error) {
    localStorage.removeItem(SnapshotKey);
  }
  return null;
};

export const setSnapshot = (data: IPageType) => {
  localStorage.setItem(SnapshotKey, JSON.stringify(data));
};

export const getPreviewKey = () => {
  try {
    return JSON.parse(localStorage.getItem(PreviewKey));
  } catch (error) {
    localStorage.removeItem(PreviewKey);
  }
  return null;
};

export const setPreviewKey = (data: IPageType) => {
  localStorage.setItem(PreviewKey, JSON.stringify(data));
};
