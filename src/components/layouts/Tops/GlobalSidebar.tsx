import { Grid, Box, Stack, Typography, ListItemIcon, Badge } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface GlobalSidebarProps {
    anchor?: "left" | "right" | "top" | "bottom";
    toggleDrawer: (open: boolean) => void;
}

function GlobalSidebar({ anchor, toggleDrawer }: GlobalSidebarProps) {

    const navigate = useNavigate();
    const location = useLocation();
    const favorites = useAppSelector(state => state.favorites.items);
 
    const navigationItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { path: '/favorites', label: 'Favorites', icon: <FavoriteIcon /> },
    ];
    return (
        <>
            <Box sx={{ width: 250 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" color="primary">
                        Crypto Analytics
                    </Typography>
                </Box>
                <List>
                    {navigationItems.map(item => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    toggleDrawer(false);
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                                {item.path === '/favorites' && favorites.length > 0 && (
                                    <Badge badgeContent={favorites.length} color="primary" />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
}

export default GlobalSidebar;