const mongoose = require('mongoose'); 

var blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required: true,
    },
    numViews:{
        type: Number,
        default: 0,
    },
    isLiked:{
        type: Boolean,
        default: false,
    },
    isDisliked:{
        type: Boolean,
        default: false,
    },
    likes: [
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       },
    ],
    likes: [
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       },
    ],
    images: {
        type: String,
        default: "https://media.istockphoto.com/id/922745190/photo/blogging-blog-concepts-ideas-with-worktable.jpg?s=2048x2048&w=is&k=20&c=QNKuhWRD7f0P5hybe28_AHo_Wh6W93McWY157Vmmh4Q=",
    },
    author: {
        type: String,
        default: "User",
    },
},  {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
  } 
);

module.exports = mongoose.model('Blog', blogSchema);