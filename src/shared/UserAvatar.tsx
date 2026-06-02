// External
import { useRef, type JSX, useEffect } from 'react';
import multiavatar from '@multiavatar/multiavatar/esm';


// MUI
import { Avatar } from '@mui/material';

export const UserAvatar = (props: {
  width: number;
  height?: number;
  username: string;
}): JSX.Element => {
  const { width, height, username } = props;

  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgCode = multiavatar(username);

    if (avatarRef.current) {
      avatarRef.current.innerHTML = svgCode;
    }
  }, [username]);

  return (
    <>
      {username ? (
        <div
          style={{
            width,
            height,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          ref={avatarRef}
        />
      ) : (
        <Avatar
          sx={{
            width: width + 2,
            p: 0.5,
            flexShrink: 0,
            backgroundColor: '#00000040',
            height: (height || width) + 2,
          }}
          src="/ape.png"
        />
      )}
    </>
  );
};

export default UserAvatar;
