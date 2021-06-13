import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from '../online/Online';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {Add, Remove} from "@material-ui/icons";

export default function Rightbar({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] =useState(currentUser.followings.includes(user?._id));
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    }, [user]);
    
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("https://social-app-mern-stack.herokuapp.com/api/users/friends/" + user?._id);
                setFriends(friendList.data);
            } catch(err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersList = await axios.get("https://social-app-mern-stack.herokuapp.com/api/users/allUsers/");
                const filteredUsers = usersList.data.filter(u => u._id !== currentUser._id);
                setUsers(filteredUsers);
            }catch(err) {
                console.log(err);
            }
        };
        getUsers();
    },[currentUser])

    const handleClick = async () => {
        try {
            if(followed) {
                await axios.put("https://social-app-mern-stack.herokuapp.com/api/users/"+user._id + "/unfollow", {userId:currentUser._id});
                dispatch({type:"UNFOLLOW", payload:user._id});
            }else {
                await axios.put("https://social-app-mern-stack.herokuapp.com/api/users/"+user._id + "/follow", {userId:currentUser._id});
                dispatch({type:"FOLLOW", payload:user._id});
            }
        } catch(err) {
            console.log(err);
        }
        setFollowed(!followed);
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
                    <span className="birthdayText"><b>Yui Kobayashi</b> and <b>3 other friends</b> have a birthday today</span>
                </div>
                <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Users</h4>
                <ul className="rightbarFriendList">
                    {users.map(u=> (
                        <Online key={u._id} user={u} />
                    ))}
                    
                </ul>
            </>
        )
    };

    const ProfileRightbar = () => {
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove/> : <Add/>}
                </button>
            )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City: </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From: </span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship: </span>
                        <span className="rightbarInfoValue">{user.relationship===1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {friends && friends.map((friend, index) => (
                        <Link key={index} to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture ? PF + friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                        
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
            
        </div>
    )
}
