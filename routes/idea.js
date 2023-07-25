const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const IDEA = mongoose.model("IDEA")


// Route
router.get("/briefs",(req, res) => {
    let hash = req.query.hash
    console.log(req.query.hash);
    IDEA.findOne({hash:hash})     
        .then(ideas =>{console.log(ideas)
            ; res.json(ideas)})
        .catch(err => console.log(err))
})

router.get("/allIdeas",(req, res) => {
    IDEA.find()     
        .sort("-createdAt")
        .then(ideas => res.json(ideas))
        .catch(err => console.log(err))
})

router.post("/addIdea", (req, res) => {
    const { hash,brief } = req.body;
    console.log(req.body)
    if (!hash ) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    
    const idea = new IDEA({
        hash,
        briefs:[
            {
                brief: brief,
                timestamp: new Date(),
              },
        ]
    })
    idea.save().then((result) => {
        return res.json({ idea: result })
    }).catch(err => console.log(err))
})

router.put("/addBrief", (req, res) => {
    const { hash,brief } = req.body;
    const briefObj =   {
        brief: brief,
        timestamp: new Date(),
      }
      IDEA.findOneAndUpdate(
        { hash: hash },
        { $push: { briefs: briefObj } },
        { returnOriginal: false },
      ).then((result) => {
        return res.json({ idea: result })
    }).catch(err => console.log(err))
   
})

router.delete("/deleteIdea",(req, res) => {
    console.log(req.body.eid);
    // IDEA.findOne({ _id: req.body.eid })
    //     .then((idea) => {
    //         if (!idea) {
    //             return res.status(422).json({ error: err })
    //         }
    //         idea.remove()
    //                 .then(result => {
    //                     return res.json({ message: "Successfully deleted" })
    //                 }).catch((err) => {
    //                     console.log(err)
    //                 })

            
    //     })
    IDEA.findByIdAndDelete({_id:req.body.eid})
    .then((result) => {
        return res.json({ idea: result })
    }).catch(err => console.log(err))
})

// router.get("/myposts", requireLogin, (req, res) => {
//     POST.find({ postedBy: req.user._id })
//         .populate("postedBy", "_id name")
//         .populate("comments.postedBy", "_id name")
//         .sort("-createdAt")
//         .then(myposts => {
//             res.json(myposts)
//         })
// })

// router.put("/like", requireLogin, (req, res) => {
//     POST.findByIdAndUpdate(req.body.postId, {
//         $push: { likes: req.user._id }
//     }, {
//         new: true
//     }).populate("postedBy", "_id name Photo")
//         .exec((err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })
// })

// router.put("/unlike", requireLogin, (req, res) => {
//     POST.findByIdAndUpdate(req.body.postId, {
//         $pull: { likes: req.user._id }
//     }, {
//         new: true
//     }).populate("postedBy", "_id name Photo")
//         .exec((err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })
// })

// router.put("/comment", requireLogin, (req, res) => {
//     const comment = {
//         comment: req.body.text,
//         postedBy: req.user._id
//     }
//     POST.findByIdAndUpdate(req.body.postId, {
//         $push: { comments: comment }
//     }, {
//         new: true
//     })
//         .populate("comments.postedBy", "_id name")
//         .populate("postedBy", "_id name Photo")
//         .exec((err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })
// })

// Api to delete post
// router.delete("/deletePost/:postId", requireLogin, (req, res) => {
//     POST.findOne({ _id: req.params.postId })
//         .populate("postedBy", "_id")
//         .exec((err, post) => {
//             if (err || !post) {
//                 return res.status(422).json({ error: err })
//             }

//             if (post.postedBy._id.toString() == req.user._id.toString()) {

//                 post.remove()
//                     .then(result => {
//                         return res.json({ message: "Successfully deleted" })
//                     }).catch((err) => {
//                         console.log(err)
//                     })
//             }
//         })
// })


module.exports = router