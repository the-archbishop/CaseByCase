//how we search favorites
//collection of save cases and array of who saved it
//put person's id in an array and put the case 
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const favCase = require('../../models/Favorites');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route    Post api/favorites/
//@desc     Create a favorite
//@access   Public
router.post('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        console.log(user)
        const newFav = new favCase({
            Case_Number: req.params.id,
            Date_Of_Incident: req.body.Date_Of_Incident,
            Description: req.body.Description,
            Link: req.body.Link,
            Users: [{
                name: user.name,
                user: user.id
            }]
        });

        const fav = await newFav.save();
        res.json(fav);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//@route   GET api/favorites
//@desc    GET ALL FAVS
router.get('/', async (req, res) => {
    try {
        const favs = await favPosts.find().sort({
            Date_Added: -1
        });
        res.json(favs);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;