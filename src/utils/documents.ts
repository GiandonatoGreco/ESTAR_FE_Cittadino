import { DocumentI } from 'models/documents';
import { timestampToDate } from './dates';
import dayjs from 'dayjs';

export const formatSize = (doc: DocumentI) => {
  const { size } = doc;
  if (size > 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)}MB`;
  if (size > 1024) return `${Math.round(size / 1024)}kB`;
  return `${size}B`;
};

export const formatDate = (doc: DocumentI) => {
  return timestampToDate(doc.created);
};

export const getExpiration = (doc: DocumentI) => {
  // hours missing to expiration
  const expiresInHours = 48 - (dayjs().unix() - doc.created) / 3600;
  if (expiresInHours > 24) return 'tomorrow';
  return 'today';
};
