import PropTypes from 'prop-types';
import { Drawer, Box, Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { items } from './config.jsx';
import { SideNavItem } from './side-nav-item.jsx';
import LogoImage from '../../assets/Images/drpmLogo.png';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const handleLogoClick = () => {
    navigate('/');
    onClose();
  };

  return (
    <Drawer
      anchor={lgUp ? 'left' : 'left'}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      variant={lgUp ? 'permanent' : 'temporary'}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: 3 }}>
          <Box
            component="div"
            onClick={handleLogoClick}
            sx={{ display: 'inline-flex', height: 100, width: 200 }}
          >
            <img src={LogoImage} alt="Logo" width="100%" height="100%" />
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'neutral.700' }} />

        <Box component="nav" sx={{ flexGrow: 1, px: 2, py: 3, mt: 5 }}>
          <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'neutral.700' }} />

        <Box sx={{ px: 2, py: 3 }}>
          <Typography color="neutral.500" variant="body2">
            © Copyright Srihtvak Clinic. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
