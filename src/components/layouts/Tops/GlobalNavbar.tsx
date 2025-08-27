import React, { useState, useEffect } from "react";
import {
    MenuOutlined,
    NotificationsActive,
} from "@mui/icons-material";
import {
    Drawer,
    Grid,
    Box,
    Stack,
    IconButton,
} from "@mui/material";

import GlobalSidebar from "./GlobalSidebar";
import FullLogoLight from "../../../../public/logo.svg";
import { Link } from "react-router-dom";

const GlobalNavbar: React.FC = () => {
    const [drawer, setDrawer] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, []);


    const toggleDrawer = (open: boolean) => {
        setDrawer(open);
    };

    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2 }}
            sx={{
                background: "rgba(255, 255, 255, 0.14)",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                height: "70px",
                display: "flex",
                margin: "auto",
                paddingTop: "0px",
                justifyContent: "left",
                alignItems: "left",
                fontSize: "20px",
                fontWeight: "bold",
                position: "sticky",
                top: "0",
                zIndex: "1000",
            }}
        >
            <Grid size={{ xs: 12, sm: 2 }} sx={{
                flexBasis: "18.3%", maxWidth: "18.3%", display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Box
                    sx={{
                        "@media (max-width: 800px)": {
                            marginLeft: "20px",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Link to="/">
                        <img
                            src={FullLogoLight}
                            alt="Logo"
                            style={{ height: "auto", width: "40px" }}
                        />
                    </Link>
                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 10 }} sx={{ flexBasis: "81.7%", maxWidth: "81.7%" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ height: "100%" }}
                    spacing={2}
                    pr={3}
                >
                    <Box
                        sx={{
                            height: "fit-content",
                            color: "black",
                            "@media screen and (max-width: 1050px)": {
                                display: "none",
                            },
                        }}
                    >
                        <a href="/dashboard" style={{ color: "black" }}>
                            <span style={{ fontSize: "15px" }}>Dashboard</span>
                        </a>
                    </Box>
                    <Box
                        sx={{
                            height: "fit-content",
                            color: "black",
                            "@media screen and (max-width: 1050px)": {
                                display: "none",
                            },
                        }}
                    >
                        <a href="/favorites" style={{ color: "black" }}>
                            <span style={{ fontSize: "15px" }}>Favorites</span>
                        </a>
                    </Box>
                    <Box
                        sx={{
                            display: "none",
                            "@media screen and (max-width: 1050px)": {
                                display: "block",
                                cursor: "pointer",
                            },
                        }}
                    >
                        <IconButton onClick={() => toggleDrawer(true)}>
                            <MenuOutlined fontSize="medium" />
                        </IconButton>
                    </Box>

                    <Drawer
                        anchor={"left"}
                        open={drawer}
                        onClose={() => setDrawer(false)}
                        sx={{
                            ".MuiDrawer-paper": {
                                background: "#cde2e7",
                            },
                        }}
                    >
                        <GlobalSidebar anchor="left" toggleDrawer={toggleDrawer} />
                    </Drawer>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default GlobalNavbar;