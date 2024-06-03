import { useContext } from "react";
import ApiCalls from "../ApiCalls";
import { tableBodyClasses } from "@mui/material";
import axios from "axios";

// const [commentURI, setCommentURI] = useContext('http://localhost:3001/comments');


// export const getComments = async (contentId) => {

//   const response = await ApiCalls.get(`http://localhost:8080/content/${contentId}/comments`);
//   const data = response.data;
//   // return data
//   console.log("data");
//   console.log(data?._embedded?.commentList);
//   return data?._embedded?.commentList;
// };

export const createComment = async (contentID, text, commenter) => {
  const url = `http://localhost:8080/content/${contentID}/comments`;
  const formData = new FormData();
  formData.append('text', text);
  formData.append('commenter', commenter);

  try  {
    const response = await ApiCalls.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("data create");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }

};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};