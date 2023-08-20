import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const SideNavItem = ({
  active = false,
  disabled,
  external,
  icon,
  path,
  title,
  onClick,
}) => {
  const linkProps = path
    ? external
      ? { component: 'a', href: path, target: '_blank' }
      : { component: RouterLink, to: path }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.04)' },
          ...(active && { backgroundColor: 'rgba(255, 255, 255, 0.04)' }),
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: active ? 'primary.main' : 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: active ? 'common.white' : disabled ? 'neutral.500' : 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            '&:hover': active && { color: 'primary.main' },
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
