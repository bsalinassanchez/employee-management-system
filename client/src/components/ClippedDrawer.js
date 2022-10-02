import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import EmployeeList from "../pages/EmployeeList";
import EmployeeApplication from "../pages/EmployeeApplication";
import Axios from "axios";
import { useState } from "react";
const drawerWidth = 240;

export default function ClippedDrawer() {
	const [employeeList, setEmployeeList] = useState([]);
	const getEmployees = () => {
		Axios.get("http://localhost:3001/employees").then((response) => {
			setEmployeeList(response.data);
			console.log(response.data);
		});
	};
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Employee Management System
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{["Dashboard"].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton component={Link} to="/">
									<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						<ListItem key="Employee List" disablePadding>
							<ListItemButton component={Link} to="/employee-list" onClick={getEmployees}>
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Employee List" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Add Employee" disablePadding>
							<ListItemButton component={Link} to="/employee-application">
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Add Employee" />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/employee-list" element={<EmployeeList employeeList={employeeList} />} />
					<Route path="/employee-application" element={<EmployeeApplication />} />
					<Route path="*" element={<h1>404 not found</h1>} />
				</Routes>
			</Box>
		</Box>
	);
}
