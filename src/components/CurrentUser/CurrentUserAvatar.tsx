import React, { FC } from "react";
import { useSelector } from "react-redux";
import UserAvatar from "../UserAvatar/UserAvatar";
import { getCurrentUser } from "./store/currentUserSelectors";

const CurrentUserAvatar: FC = () => {
    const currentUser = useSelector(getCurrentUser);

    if (!currentUser) {
        return null;
    }

    return (
        <UserAvatar{...currentUser} />
    );
};

export default CurrentUserAvatar;
