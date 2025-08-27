import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledLink = styled(Link)(({ theme }) => ({
  background: "transparent",
  border: `2px solid ${theme.palette.primary.main}`, 
  borderRadius: "6px", 
  color: theme.palette.primary.main,
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 700,
  marginTop: "30px",
  padding: "10px 40px",
  textDecoration: "none",
  textTransform: "uppercase",
  transition: "all .2s",
  "&:hover": {
    background: theme.palette.primary.light, 
    color: theme.palette.secondary.main,
  },
}));

const PageNotFound: React.FC = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Stack
        sx={{
          height: "100%",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
        direction="column"
      >
        <img
          src="../../../../public/not_found.svg" 
          alt="page not found"
          width={400}
          style={{ height: "auto" }}
        />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "16px",  
            fontWeight: 600,  
            color: "var(--text-color-1, #333)",  
          }}
        >
          Page Not Found
        </Typography>
        <StyledLink to="/">Return Home</StyledLink>
      </Stack>
    </Box>
  );
};

export default PageNotFound;