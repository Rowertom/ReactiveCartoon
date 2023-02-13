import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatar({authorSrc}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="img" src={authorSrc} />
    </Stack>
  );
}