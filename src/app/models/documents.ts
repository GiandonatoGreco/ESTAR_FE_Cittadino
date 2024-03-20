import { BaseResponseI } from './common';

export interface DocumentI {
  id: string;
  title: string;
  description?: string;
  format: string;
  size: number;
  created: number;
  url: string;
}

export interface DocumentsGetI extends BaseResponseI {
  data: {
    received: DocumentI[];
    sent: DocumentI[];
  };
}
