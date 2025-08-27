import React from "react";
import { Grid, Stack, Typography, Box, Divider } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import { styled } from "@mui/material/styles";

const FooterPolicyLink = styled("a")(({ theme }) => ({
  color: "#000",
  fontSize: "12px",
  fontWeight: 500,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.dark, 
  },
}));

const FooterSocialIcon = styled("a")(({ theme }) => ({
  background: "#00000014",
  borderRadius: "5px",
  height: "35px",
  width: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.text.primary, 
  textDecoration: "none",
  "&:hover": {
    background: theme.palette.primary.light, 
  },
}));

const GlobalFooter: React.FC = () => {
  return (
    <Grid
      container
      sx={{ padding: "10px", width: "100%", margin: "auto"}}
    >
      <Grid size={{ xs: 12, sm: 12 }}>
        <Divider flexItem />
        <Grid
          container
          mt={2}
          sx={{
            "@media (max-width: 900px)": { flexDirection: "column-reverse" },
          }}
        >
          <Grid size={{ xs: 12, sm: 12, md: 8 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                height: "100%",
                "@media (max-width: 900px)": { justifyContent: "center" },
              }}
            >
              {[
                { label: "Terms", href: "/terms" },
                { label: "Privacy", href: "/privacy-policy" },
                { label: "Disclosures", href: "/disclosures" },
                { label: "Accessibility", href: "/accessibility" },
                { label: "CA Notice at Collection", href: "/ca-notice" },
                { label: "Cookie Settings", href: "/cookie-settings" },
              ].map((link) => (
                <FooterPolicyLink key={link.label} href={link.href}>
                  {link.label}
                </FooterPolicyLink>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={3}
              sx={{
                "@media (max-width: 900px)": {
                  justifyContent: "center",
                  marginBottom: "20px",
                },
              }}
            >
              {[
                "https://x.com",
              ].map((url, index) => (
                <FooterSocialIcon key={index} href={url}>
                  <XIcon />
                </FooterSocialIcon>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GlobalFooter;
