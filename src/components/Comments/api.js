import { useContext } from "react";
import ApiCalls from "../ApiCalls";

// const [commentURI, setCommentURI] = useContext('http://localhost:3001/comments');


export const getComments = async (contentId) => {

  const response = await ApiCalls.get(`http://localhost:8080/content/${contentId}/comments`);
  const data = response.data;
  // return data
  console.log("data");
  console.log(data?._embedded?.commentList);
  return data?._embedded?.commentList;
};

export const createComment = async (text, parentId = null) => {
  const response = await ApiCalls.post('http://localhost:8080/content/105/comments', { text, parentId });
  const data = response.data;
  console.log("data create");
  // console.log(data._embedded.commentList);
  return data?._embedded?.commentList;

};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};