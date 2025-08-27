import React, { useEffect } from "react";
import { CheckCircleOutline, WarningOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "./toastSlice";
import type { RootState } from "../../store/store";

const StyledToast = styled(motion.div)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2.5), // 20px
  right: theme.spacing(2.5), // 20px
  borderLeft: `4px solid ${theme.palette.common.white}`,
  borderColor: theme.palette.success.main,  
  padding: theme.spacing(2), // 16px
  width: theme.spacing(35), // 280px
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  gap: theme.spacing(1.25), // 10px
  backgroundColor: "var(--paper-color, #fff)",  
  boxShadow: theme.shadows[3],  
  zIndex: 9999,
}));

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const toastState = useSelector((state: RootState) => state.toast.toastState);
  const message = useSelector((state: RootState) => state.toast.message);
  const messageType = useSelector((state: RootState) => state.toast.type);

  useEffect(() => {
    if (toastState) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 5000);
      return () => clearTimeout(timer);  
    }
  }, [toastState, dispatch]);

  return (
    <AnimatePresence>
      {toastState && (
        <StyledToast
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: 0 }}
          sx={{
            borderColor:
              messageType === "success"
                ? theme => theme.palette.success.main  
                : theme => theme.palette.error.main, 
          }}
        >
          {messageType === "success" ? (
            <CheckCircleOutline sx={{ color: theme => theme.palette.success.main }} />
          ) : (
            <WarningOutlined sx={{ color: theme => theme.palette.error.main }} />
          )}
          <Typography
            variant="body1"
            sx={{
              color: "var(--text-color-1, #333)",
            }}
          >
            {message}
          </Typography>
        </StyledToast>
      )}
    </AnimatePresence>
  );
};

export default Toast;