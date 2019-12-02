export class Employee {
  [x: string]: any;
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  directReports?: Array<number>;
  compensation: number;
}
