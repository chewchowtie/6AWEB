import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  getEmployees() {
    return [
    {
    id: 101,
    firstname: 'Pipowe',
    lastname: 'Laplana',
    email: 'pipowe@gmail.com',
  },
  {
    id: 102,
    firstname: 'Justin',
    lastname: 'Miranda',
    email: 'justin@gmail.com',
  },
  {
    id: 103,
    firstname: 'Jainell',
    lastname: 'Delos Reyes',
    email: 'jainell@gmail.com',
  },
  {
    id: 104,
    firstname: 'Meg',
    lastname: 'Esguerra',
    email: 'meg@gmail.com',
  },
  ];
}
}
