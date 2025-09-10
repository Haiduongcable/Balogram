import api from './api';
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// const addPost = async(postData, token) => {
//     const createResult = await api({
//         method: 'POST',
//         url: '/posts/create',
//         data: postData,
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return createResult;
// }

const getListPost_newfeed = async(token) => {
    const url = '/posts/list';
    const listPost = await api({
        method: 'GET',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return listPost;
}

const addPost = async(data) => {
    const token = data.token;
    const described = data.described;
    const images = data.images;
    const videos = data.videos;
    const postInfo = await api({
        method: 'POST',
        url: '/posts/create',
        data: {
            "described": described,
            "images": images,
            "videos": videos

        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return postInfo;

}

const editPost = async(data) => {
    const token = data.token;
    const described = data.described;
    const images = data.images;
    const videos = data.videos;
    const postId = data.postId;
    const editInfo = await api({
        method: 'POST',
        url: `/posts/edit/${postId}`,
        data:{
            "described": described,
            "images": images,
            "videos": videos
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return editInfo;
}

const deletePost = async(data)=> {
    const token = data.token;
    const postId = data.postId;
    const deleteInfo = await api({
        method: "GET",
        url: `/posts/delete/${postId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return deleteInfo;
}

const actionLikePost = async(data)=>{
    const token = data.token;
    const postId = data.postId;
    const likeInfo = await api({
        method: "POST",
        url: `/postLike/action/${postId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return likeInfo;
}

// Share post functionality
const sharePost = async(data) => {
    const token = data.token;
    const postId = data.postId;
    const friendIds = data.friendIds; // Array of friend IDs to share with
    const message = data.message || ''; // Optional message when sharing
    
    const shareInfo = await api({
        method: 'POST',
        url: '/posts/share',
        data: {
            "postId": postId,
            "friendIds": friendIds,
            "message": message
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return shareInfo;
}

const getSharedPosts = async(data) => {
    const token = data.token;
    const userId = data.userId; // Get shared posts for specific user
    
    const sharedPosts = await api({
        method: 'GET',
        url: `/posts/shared/${userId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return sharedPosts;
}

const getFriendsList = async(token) => {
    const friendsList = await api({
        method: 'GET',
        url: '/friends/list',
        headers: { Authorization: `Bearer ${token}` }
    });
    return friendsList;
}

export {
    addPost, 
    getListPost_newfeed, 
    editPost, 
    deletePost, 
    actionLikePost,
    sharePost,
    getSharedPosts,
    getFriendsList
};