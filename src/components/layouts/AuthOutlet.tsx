import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import GlobalNavbar from "./Tops/GlobalNavbar";
import GlobalFooter from "./Bottoms/GlobalFooter";
import { ErrorBoundary } from "../common/ErrorBoundary";

const AuthOutlet: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <GlobalNavbar />
        <main>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  height: "100vh",
                  width: "100vw",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--paper-color, #fff)",
                }}
              >
                <CircularProgress sx={{ color: theme => theme.palette.primary.main }} />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </main>
        <GlobalFooter />
      </ErrorBoundary>
    </>
  );
};

export default AuthOutlet;