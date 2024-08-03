import { IconButton } from '@mui/material';

interface SLIconProps {
  props: any;
  children: any;
}

export const SLIconButton = (props: any) => {
  const sxButton = { border: 1, borderRadius: '25%' };

  return (
    <IconButton sx={sxButton} {...props}>
      {props.children}
    </IconButton>
  );
};
