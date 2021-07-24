import React from 'react';
import "./online.css";
import {Link} from "react-router-dom";

export default function Online({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    return (
        <Link to={`/profile/${user.username}`} className="rightbarProfileImgContainer">
        <li className="rightbarFriend">
                <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            <span className="rightbarUsername">{user.username}</span>
        </li>
        </Link>
    )
}
