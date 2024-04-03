import { Request, Response } from "express";
import hl7Service from "../services/hl7.service";

export const getHighRiskRecords = async (req: Request, res: Response) => {
  try {
    const oruFile = req.file;
    if (!oruFile) throw new Error("File not found");

    const filteredOBXRecords = hl7Service.filterOBXRecords(
      oruFile.buffer.toString()
    );
    const highRiskRecords = await hl7Service.getHighRiskRecords(
      filteredOBXRecords
    );

    res.status(200).json({
      message: "Success",
      data: highRiskRecords,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
