import React from 'react';
import { Stack, CircularProgress } from "@mui/material";


const CircularLoading: React.FC = () => {
    return (
        <Stack>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: "#589B87"
                }}
                thickness={3}
                size={100}
            />
        </Stack>
    )
}

export default CircularLoading