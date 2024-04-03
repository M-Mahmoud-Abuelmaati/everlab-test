import { Hl7Parser } from "@manhydra/hl7-parser";
import {
  ICondition,
  IDiagnostic,
  IDiagnosticGroup,
  IDiagnosticMetric,
  IHighRiskRecord,
  IOBXRecord,
} from "../types";

import csv from "csvtojson";

import path from "path";

const hl7Parser = new Hl7Parser();

const filterOBXRecords = (hl7: string): IOBXRecord[] => {
  return hl7Parser
    .getHl7Model(hl7)
    .children.filter((seg) => seg?.name === "OBX")
    .map((seg) => ({
      name: seg.children?.[3]?.children?.[1].value?.replace(":", ""),
      value: seg.children?.[5]?.value,
      unit: seg.children?.[6]?.value?.split("^")?.[0],
    }));
};

const getHighRiskRecords = async (
  obxRecords: IOBXRecord[]
): Promise<IHighRiskRecord[]> => {
  const diagnosticMetricsPath = path.join(
    __dirname,
    "../../files/diagnostic_metrics.csv"
  );
  const diagnosticGroupsPath = path.join(
    __dirname,
    "../../files/diagnostic_groups.csv"
  );
  const diagnosticsPath = path.join(__dirname, "../../files/diagnostics.csv");
  const conditionsPath = path.join(__dirname, "../../files/conditions.csv");

  const diagnosticMetrics = (await csv().fromFile(
    diagnosticMetricsPath
  )) as IDiagnosticMetric[];
  const conditions = (await csv().fromFile(conditionsPath)) as ICondition[];

  const diagnostics = (await csv().fromFile(diagnosticsPath)) as IDiagnostic[];
  const diagnosticGroups = (await csv().fromFile(
    diagnosticGroupsPath
  )) as IDiagnosticGroup[];

  return obxRecords.reduce((acc, curr) => {
    const metric = diagnosticMetrics.find(
      (metric) =>
        metric.oru_sonic_codes.includes(curr.name) &&
        metric.oru_sonic_units === curr.unit
    );
    if (!metric) return acc;

    const standardLower = Number(metric?.standard_lower);
    const standardHigher = Number(metric?.standard_higher);
    const obxValue = Number(curr.value);

    if (obxValue < standardLower || obxValue > standardHigher) {
      const possibleConditions = conditions.filter(
        (condition) => condition.diagnostic_metrics === metric.name
      );
      const diagnosticGroup = diagnosticGroups.find(
        (diagnosticGroup) => diagnosticGroup.diagnostic_metrics === metric.name
      );
      const diagnostic = diagnostics.find(
        (diagnostic) => diagnostic.diagnostic_metrics === metric.name
      );

      acc.push({
        name: curr.name,

        diagnostic: diagnostic?.name,
        diagnosticGroup: diagnosticGroup?.name,

        value: curr.value,

        standardLower,
        standardHigher,

        unit: curr.unit,

        possibleConditions: possibleConditions
          .map((condition) => condition.name)
          .join(", "),
      });
    }
    return acc;
  }, [] as IHighRiskRecord[]);
};

export default {
  filterOBXRecords,
  getHighRiskRecords,
};
