import { Button, Stack, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { IHighRiskRecord, StdResponse } from "../../types";
import axiosInstance from "../../services/axiosInstance";
import AppTable from "../AppTable";
import { HighRiskTableColumns } from "../../constants/tables";
import toast from "react-hot-toast";
import routes from "../../constants/routes";

interface LandingPageProps {}

const LandingPage = ({}: LandingPageProps) => {
  const [oruFile, setOruFile] = useState<File | string>("");
  const [data, setData] = useState<IHighRiskRecord[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) setOruFile(file);
  };

  const handleFetchHighRiskRecords = async () => {
    if (!oruFile) return;

    const formData = new FormData();
    formData.append("oruFile", oruFile);

    try {
      const response = await axiosInstance.post<StdResponse<IHighRiskRecord[]>>(
        routes.hl7,
        formData
      );
      const highRiskRecords = response.data.data?.map((record, idx) => ({
        id: idx,
        ...record,
      }));
      setData(highRiskRecords);
      setOruFile("");
      toast.success("Success");
    } catch (error) {
      toast.error("Failed to get high risk records");
    }
  };

  return (
    <Stack gap={2}>
      <Typography variant="h3">Hello, welcome to Everlab</Typography>
      <Typography variant="body1" fontSize={24} color={"whitesmoke"}>
        In order to get high risk records, Please upload Pathology report file
        that arrives in{" "}
        <Typography component={"span"} fontWeight={700} fontSize={24}>
          HL7/ORU format
        </Typography>
      </Typography>
      <Button
        variant="contained"
        component="label"
        sx={{
          width: 300,
          mx: "auto",
        }}
      >
        {oruFile ? "1 File Selected" : "Upload File"}
        <input type="file" hidden accept="text/plain" onChange={handleChange} />
      </Button>
      <Button
        variant="contained"
        color="error"
        disabled={!oruFile}
        onClick={handleFetchHighRiskRecords}
        sx={{
          width: 300,
          mx: "auto",
          ":disabled": {
            color: "grey",
            cursor: "not-allowed",
          },
        }}
      >
        Get High Risk Records
      </Button>
      <AppTable rows={data} columns={HighRiskTableColumns} />
    </Stack>
  );
};

export default LandingPage;
