import { Avatar } from "antd";
import React, { CSSProperties, FC, useMemo } from "react";

interface UserAvatarProps {
    userId: string;
    name: string;
    surname: string;
}

const UserAvatar: FC<UserAvatarProps> = ({userId, name, surname}) => {
    const style = useMemo<CSSProperties>(() => {
        const background = `${userId.slice(0, 6)}`;
        const color = (background.match(/.{2}/g) as string[])
            .map((n) => parseInt(n, 16))
            .reduce((s, n) => s + n, 0) > 256 * 3 / 2 ? 'black' : 'white';

        return {
            color,
            background: `#${background}`,
        };
    }, [userId]);

    return (
        <Avatar
            style={style}
            alt={`${surname} ${name}`}
        >
            {surname.charAt(0)}
            {name.charAt(0)}
        </Avatar>
    );
};

export default UserAvatar;
