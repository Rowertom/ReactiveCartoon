import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatar() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="img" src="https://pic.rutubelist.ru/user/e0/ab/e0abe02dffe09ae33fe59f5a563cc1ba.jpg" />
    </Stack>
  );
}