import React, { useContext, useState, useEffect } from 'react'
import "../topbar/topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

export default function Topbar() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [users, setUsers] = useState([]);
    const [suggestedUsers, setSuggesteUsers] = useState([]);

    const handleLogout = () => {
        localStorage.setItem("user", null);
        window.location.reload();
    }


    const handleChange = (e) => {
        if(e.target.value) {
            const suggestedUsersList = users.filter(u => u.username.includes(e.target.value));
            setSuggesteUsers(suggestedUsersList);
        } else {
            setSuggesteUsers([]);
        }
        
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersList = await axios.get("https://social-app-mern-stack.herokuapp.com/api/users/allUsers/");
                const filteredUsers = usersList.data.filter(u => u._id !== user._id);
                setUsers(filteredUsers);
            }catch(err) {
                console.log(err);
            }
        };
        getUsers();
    },[user])

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Social App</span>
                </Link>
            </div>
            <form className="topbarCenter">
                <form onSubmit={e => e.preventDefault()} className="searchbar">
                    <Search className="searchIcon"/>
                    <input onChange={handleChange} placeholder="Search for friends" className="searchInput" type="text" />
                </form>
            </form>
            {suggestedUsers && 
                <div className="suggestedUsersContainer">
                    {
                    suggestedUsers.map((u, index) => (
                    <Link key={index} to={`/profile/${u.username}`} style={{textDecoration:"none", color:"black"}}>
                    <div className="suggestedUserContainer">
                        <img src={u.profilePicture ? PF + u.profilePicture : PF+"person/noAvatar.png"} alt="" />
                        <h4 className="suggestedUserName">{u.username}</h4>
                    </div>
                    </Link>
                    ))
                    }
                </div>
            }
            <div className="topbarRight">
                <Link to="/" style={{textDecoration:"none", color:"white"}}>
                    <span className="topbarLink">Home</span>
                </Link>
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
