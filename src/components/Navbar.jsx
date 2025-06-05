/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../../assets/pedaconnect_logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FiX } from "react-icons/fi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Programs",
      icon: <SchoolIcon />,
    },
    {
      text: "Admissions",
      icon: <PeopleIcon />,
    },
    {
      text: "Events",
      icon: <EventIcon />,
    },
    {
      text: "Contact",
      icon: <ContactMailIcon />,
    },
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <img src={Logo} alt="PedaConnect Logo" className="nav-logo" />
        <span className="nav-brand-text">PedaConnect</span>
      </div>
      
      <div className="navbar-links-container">
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#programs" className="nav-link">Programs</a>
        <a href="#admissions" className="nav-link">Admissions</a>
        <a href="#events" className="nav-link">Events</a>
        <a href="#contact" className="nav-link">Contact</a>
        <button className="primary-button">Apply Now</button>
      </div>
      
      <div className="navbar-menu-container">
        <HiOutlineBars3 
          onClick={() => setOpenMenu(true)} 
          className="mobile-menu-icon"
        />
      </div>
      
      <Drawer 
        open={openMenu} 
        onClose={() => setOpenMenu(false)} 
        anchor="right"
        className="mobile-drawer"
      >
        <Box
          sx={{ width: 280 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
          className="drawer-content"
        >
          <div className="drawer-header">
            <img src={Logo} alt="PedaConnect Logo" className="drawer-logo" />
            <span className="drawer-brand-text">PedaConnect</span>
            <FiX 
              className="close-drawer-icon" 
              onClick={() => setOpenMenu(false)}
            />
          </div>
          <Divider />
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton className="drawer-menu-item">
                  <ListItemIcon className="drawer-menu-icon">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    className="drawer-menu-text"
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <div className="drawer-footer">
            <button className="primary-button mobile-cta">Apply Now</button>
          </div>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;