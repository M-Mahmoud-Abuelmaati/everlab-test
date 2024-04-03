export interface StdResponse<T = any> {
  message: string;
  data: T;
}

export interface IHighRiskRecord {
  name: string;
  value: string;
  unit: string;

  diagnostic?: string;
  diagnosticGroup?: string;

  possibleConditions?: string;

  standardLower: string | number;
  standardHigher: string | number;
}
