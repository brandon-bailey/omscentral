import MaterialButton, { ButtonProps } from '@material-ui/core/Button';
import clsx from 'clsx';
import React from 'react';

import { useStyles } from './Button.styles';

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  variant = 'contained',
  color = 'primary',
  size,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MaterialButton
      type={type}
      variant={variant}
      color={color}
      size={size}
      className={clsx(
        className,
        type === 'submit' && classes.submit,
        size === 'large' && classes.large,
      )}
      {...rest}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
