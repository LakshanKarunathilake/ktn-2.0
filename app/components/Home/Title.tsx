import React from 'react';
import Typography from '@material-ui/core/Typography';

export interface TitleProps {
  children: React.ReactNode;
}
export default function Title(props: TitleProps) {
  const { children } = props;
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}
