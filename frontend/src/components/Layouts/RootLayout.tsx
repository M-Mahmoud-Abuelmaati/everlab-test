import { Box, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import Navbar from "../Navbar";

interface RootLayoutProps extends PropsWithChildren {}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <Stack height={"100vh"} width={"100vw"}>
      <Navbar />
      <Box py={4} height={"100%"} bgcolor={"secondary.main"}>
        <Box width={"75%"} mx={"auto"}>
          {children}
        </Box>
      </Box>
    </Stack>
  );
};

export default RootLayout;
