import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';

export const AccountPopover = ({ anchorEl, onClose, open, navigate }) => {
  const handleSignOut = useCallback(() => {
    onClose?.();
    navigate('/login');
  }, [onClose, navigate]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box sx={{ py: 1.5, px: 2 }}>
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body1">Dr Pradeep</Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{ p: '8px', '& > *': { borderRadius: 1 } }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
};

