import {createContext, useState,useEffect } from 'react';


export const CommentsContext = createContext();

export const SelectedCommentProvider = ({ children }) => {


    const [postId, setPostId] = useState(8);
    const [currentCommentText, setcurrentCommentText] = useState("");
    const [backendComments, setBackendComments] = useState([]);
    const [currentPost, setCurrentPost] = useState({});

    useEffect(() => {
        console.log(currentPost);
    
      }, [currentPost]);
      console.log('backendComments:', backendComments);
      console.log('Type of backendComments:', typeof backendComments);

  useEffect(() => {
    setBackendComments([]);

  }, []);
    


    return (
        <CommentsContext.Provider value={{ postId, setPostId, currentCommentText, setcurrentCommentText, backendComments, setBackendComments }}>
            {children}
        </CommentsContext.Provider>
    );
};
