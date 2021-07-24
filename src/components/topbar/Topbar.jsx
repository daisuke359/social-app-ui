import React, { useContext, useState } from 'react'
import "../topbar/topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

export default function Topbar() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [search, setSearch] = useState("");

    const handleLogout = () => {
        localStorage.setItem("user", null);
        window.location.reload();
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(search);
        window.location.href = "/profile/" + search;
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Social App</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <form className="searchbar">
                    <Search className="searchIcon"/>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for friends" className="searchInput" type="text" />
                    <button onClick={handleClick} type="">Send</button>
                </form>
            </div>
            <div className="topbarRight">
                <span className="topbarLink">Home</span>
                <span onClick={handleLogout} className="topbarLink">Logout</span>
                <div className="topbarIcon">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>
                

            </div>

        </div>
    )
}
