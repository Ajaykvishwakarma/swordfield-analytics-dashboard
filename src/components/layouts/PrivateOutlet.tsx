import React, { Suspense } from "react";
import type { FC, ReactNode } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";

import GlobalNavbar from "./Tops/GlobalNavbar";
import GlobalFooter from "./Bottoms/GlobalFooter";



interface PrivateOutlet {
    children: ReactNode;
}

const PrivateOutlet: FC<PrivateOutlet> = ({ children }: any) => {



    return (
        <React.Fragment>
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
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    }
                >
                    {children}
                </Suspense>
            </main>
            <GlobalFooter />
        </React.Fragment>
    );
};

export default PrivateOutlet;
