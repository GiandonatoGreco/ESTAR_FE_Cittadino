import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts = [
    {
      type: 'phone',
      value: '01123456',
    },
    {
      type: 'mail',
      value: 'mail1@mail.com',
    },
    {
      type: 'mail',
      value: 'mail2@mail.com',
    },
  ];

  constructor() {}
}
