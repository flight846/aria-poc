export interface Case {
  id: number;
  casename: string;
  court: string;
  charges: Array<string>;
  judge: string;
  date: string;
  sentence: Array<string>;
  concurrentOrSerial: string;
  numOfCharges: number;
}
