import express from 'express';
import mongoose from 'mongoose';

import PostMessage from "../models/postMessage.js"

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) -1 ) * LIMIT // get the start index for each page
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex); // sort to get latest
        
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id); // sort to get latest
        
        res.status(200).json(post)
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}


export const getPostsBySearch = async (req, res) => {
    const { searchQeury, tags } = req.query
    try {
        const title = new RegExp(searchQeury, 'i')
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });
        res.status(200).json({data: posts})
    } catch(error) {
        console.log(error)
        res.status(404).json({message: error})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch(error) {
        res.status(409).json({message: error})

    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No posts with this id")
    
    try {
        const updatedPost =  await PostMessage.findByIdAndUpdate(id, req.body , {new: true});
        res.status(200).json(updatedPost)
    } catch(error) {
        res.status(400).json({message: error.message})

    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No posts with this id")
    
    try {
        await PostMessage.findByIdAndRemove(_id);
        res.status(200).json({message: "Post deleted successfully"})
    } catch(error) {
        res.status(400).json({message: error.message})

    }
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    // if(!req.userId) return res.status(401).json({message: 'Unothorized'})

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No posts with this id")
    
    try {
        const post = await PostMessage.findById(_id);

        const index = post.likes.findIndex((id) => id === String(req.userId))

        if(index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
        res.status(200).json(updatedPost)
    } catch(error) {
        res.status(400).json({message: error.message})

    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const post = await PostMessage.findById(id);
    
        post.comments.push(comment);
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    
        res.status(200).json(updatedPost)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

export default router;
