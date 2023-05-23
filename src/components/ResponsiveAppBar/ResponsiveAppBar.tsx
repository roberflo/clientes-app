import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { Route, Routes, NavLink, Outlet } from "react-router-dom";
import Home from "../../pages/home/Home";
import { Invoice } from "../../pages/Invoice/Invoice";
import { Customer } from "../../pages/customer/Customer";
import { Settings } from "../../pages/settings/Settings";
import "./ResponsiveAppBar.scss";
import Page404 from "../../pages/Page404/Page404";
import CreateInvoice from "../../pages/CreateInvoice/CreateInvoice";
import PrintInvoice from "../PrintInvoice/PrintInvoice";
import InvoiceViewPrint from "../../pages/Invoice/InvoiceViewPrint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Login from "../../pages/login/Login";
import SignInSide from "../../pages/login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

class User {
  mail: string;
  admin: boolean;

  constructor(mail: string, admin: boolean) {
    this.mail = mail;
    this.admin = true;
  }
}

const emptyUser: User = new User("", false);

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState<User>(emptyUser);
  const [loginText, setLoginText] = React.useState("Iniciar Sesion");
  const login = () => {
    let loginUser: User = new User("robertoflores2790@gmail.com", true);
    setUser(loginUser);
    setLoginText("Cerrar Sesion");
  };
  const logout = () => {
    setUser(emptyUser);
    setLoginText("Iniciar Sesion");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {user.mail !== "" ? (
        <>
          <List>
            <NavLink
              to="/home"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                    }
                  : { textDecoration: "none" }
              }
            >
              <ListItem key="Inicio" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <List>
            <NavLink
              to="/invoices"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                    }
                  : { textDecoration: "none" }
              }
            >
              <ListItem key="Facturas" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <RequestQuoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Documento Tributario" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/customers"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                    }
                  : { textDecoration: "none" }
              }
            >
              <ListItem key="Clientes" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clientes" />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <List>
            <NavLink
              to="/settings"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                    }
                  : { textDecoration: "none" }
              }
            >
              <ListItem key="Configuracion">
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Configuracion" />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
          <Divider />
        </>
      ) : (
        <Divider />
      )}

      <List>
        <NavLink
          to="/login"
          style={({ isActive }) =>
            isActive
              ? {
                  textDecoration: "none",
                }
              : { textDecoration: "none" }
          }
        >
          <ListItem key="Login">
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={loginText} onClick={logout} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar color="primary">
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img src="./saturn.svg" width="50" height="50" />
          <h3>Mundo Paquete</h3>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 1, width: { lg: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />

        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route index element={<Login login={login} />} />

          <Route path="/login" element={<SignInSide login={login} />} />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute user={user}>
                <Invoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute user={user}>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute user={user}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CreateInvoice"
            element={
              <ProtectedRoute user={user}>
                <CreateInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoiceView/:id"
            element={
              <ProtectedRoute user={user}>
                <InvoiceViewPrint />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Box>
    </Box>
  );
}
