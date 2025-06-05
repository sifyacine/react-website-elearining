/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../assets/pedaconnect_logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FiX } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
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
import { useTheme } from "../App"; // Import the useTheme hook

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); // Use the theme context
  
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About us",
      icon: <InfoIcon />,
    },
    {
      text: "Our Services",
      icon: <SchoolIcon />,
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
        <a href="#about" className="nav-link">About Us</a>
        <a href="#programs" className="nav-link">Our Services</a>
        
        {/* Dark Mode Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle dark mode"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
        </button>
        
        <button className="primary-button">Register Now!</button>
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
        PaperProps={{
          className: isDarkMode ? 'dark-drawer' : 'light-drawer'
        }}
      >
        <Box
          sx={{ 
            width: 280,
            backgroundColor: isDarkMode ? 'var(--bg-primary)' : '#ffffff',
            color: isDarkMode ? 'var(--text-primary)' : '#333333',
            height: '100%'
          }}
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
          <Divider sx={{ 
            borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb' 
          }} />
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  className="drawer-menu-item"
                  sx={{
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(57, 120, 155, 0.1)' : 'rgba(57, 120, 155, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon 
                    className="drawer-menu-icon"
                    sx={{ color: isDarkMode ? 'var(--accent-primary)' : '#39789b' }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    className="drawer-menu-text"
                    sx={{ 
                      color: isDarkMode ? 'var(--text-primary)' : '#333333',
                      '& .MuiListItemText-primary': {
                        color: isDarkMode ? 'var(--text-primary)' : '#333333'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          {/* Dark Mode Toggle in Mobile Menu */}
          <ListItem disablePadding>
            <ListItemButton 
              onClick={toggleTheme}
              className="drawer-menu-item"
              sx={{
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(57, 120, 155, 0.1)' : 'rgba(57, 120, 155, 0.1)'
                }
              }}
            >
              <ListItemIcon 
                className="drawer-menu-icon"
                sx={{ color: isDarkMode ? 'var(--accent-primary)' : '#39789b' }}
              >
                {isDarkMode ? <BsSun /> : <BsMoon />}
              </ListItemIcon>
              <ListItemText 
                primary={isDarkMode ? "Light Mode" : "Dark Mode"}
                className="drawer-menu-text"
                sx={{ 
                  color: isDarkMode ? 'var(--text-primary)' : '#333333',
                  '& .MuiListItemText-primary': {
                    color: isDarkMode ? 'var(--text-primary)' : '#333333'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
          
          <Divider sx={{ 
            borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb' 
          }} />
          <div className="drawer-footer">
            <button className="primary-button mobile-cta">Apply Now</button>
          </div>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;