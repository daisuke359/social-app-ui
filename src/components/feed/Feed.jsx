import {useContext, useEffect, useState} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import "./feed.css";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import FlipMove from "react-flip-move";

export default function Feed({username}) {

    const [posts,setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username 
            ? await axios.get("https://social-app-mern-stack.herokuapp.com/api/posts/profile/" + username)
            : await axios.get("https://social-app-mern-stack.herokuapp.com/api/posts/timeline/" + user._id);
            setPosts(res.data.sort((p1,p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        }

        fetchPosts();
        
    }, [posts]);

    return (
        <div className="feed">
           <div className="feedWrapper">
               {(!username || username === user.username) && <Share/>}
               <FlipMove>
               {posts.map(p => (
                    <Post key={p._id} post={p}/>
               ))}
               </FlipMove>
           </div>
        </div>
    )
}
