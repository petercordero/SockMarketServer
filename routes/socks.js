var express = require('express');
var router = express.Router();

const Sock = require('../models/Sock');
const User = require('../models/User');
const isAuthenticated = require('../middleware/isAuthenticated')
const isSockOwner = require('../middleware/isSockOwner')

/* GET home page. */
router.get('/', (req, res, next) => {
  Sock.find()
  .then((allSocks) => {
    res.json(allSocks)
  })
  .catch((err) => {
    console.log(err)
    next(err)
  })

});

router.post('/new-sock', isAuthenticated, (req, res, next) => {
    const { owner, cost, image, story, size, material, colorPattern } = req.body
    Sock.create(
        { owner, 
            cost, 
            image, 
            story, 
            size, 
            material, 
            colorPattern 
        })
        .then((newSock) => {
            res.json(newSock)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

router.get('/sock-detail/:sockId', (req, res, next) => {
    const { sockId } = req.params

    Sock.findById(sockId)
    .then((foundSock) => {
        res.json(foundSock)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.post('/sock-update/:sockId', isAuthenticated, isSockOwner, (req, res, next) => {
    const { sockId } = req.params

    const { cost, image, story, size, material, colorPattern } = req.body
    Sock.findByIdAndUpdate(
        sockId,
        {
            cost,
            image, 
            story, 
            size, 
            material, 
            colorPattern 
        },
        { new: true}
    )
    .then((updatedSock) => {
        res.json(updatedSock)
    })
})

router.post('/delete-sock/:sockId', isAuthenticated, isSockOwner, (req, res, next) => {
    const { sockId } = req.params
    Sock.findByIdAndDelete(sockId)
    .then((deletedSock) => {
        res.json(deletedSock)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})
module.exports = router;
