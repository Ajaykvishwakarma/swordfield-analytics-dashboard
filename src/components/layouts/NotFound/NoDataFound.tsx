import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function NoDataFound(props: any) {

  return (
    <>
      <Box style={{ width: "100%" }}>
          <>
            <Box
              sx={{
                justifyContent: "center",
              }}
            >
              <Typography textAlign="center">
                {props.title?.length === 0
                  ? "No Data Found at this moment"
                  : props.title}
              </Typography>
            </Box>
          </>
      </Box>
    </>
  );
}

export default NoDataFound;
