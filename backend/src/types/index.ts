export interface IDiagnostic {
  name: string;
  diagnostic_groups: string;
  diagnostic_metrics: string;
}
export interface IDiagnosticGroup {
  name: string;
  diagnostics: string;
  diagnostic_metrics: string;
}
export interface IDiagnosticMetric {
  name: string;
  units: string;
  gender: string;

  min_age: string;
  max_age: string;

  diagnostic: string;
  diagnostic_groups: string;

  oru_sonic_codes: string;
  oru_sonic_units: string;

  standard_lower: string;
  standard_higher: string;

  everlab_lower: string;
  everlab_higher: string;
}

export interface ICondition {
  name: string;
  diagnostic_metrics: string;
}

export interface IOBXRecord {
  name: string;
  value: string;
  unit: string;
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
