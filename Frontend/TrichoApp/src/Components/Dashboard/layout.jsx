import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { SideNav } from './side-nav.jsx';
import { TopNav } from './top-nav.jsx';

// Define the width of the side navigation panel
const SIDE_NAV_WIDTH = 50;

// Styled component for the root container of the layout
const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

// Styled component for the container that holds the main content
const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
  padding: '20px',
  background: '#f5f5f5',
});

export const Layout = (props) => {
  const { children } = props;
  const [openNav, setOpenNav] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top navigation bar */}
      <TopNav onNavOpen={() => setOpenNav(true)} />

      {/* Side navigation panel */}
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />

      {/* Main content */}
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </div>
  );
};
