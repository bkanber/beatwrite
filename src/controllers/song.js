
const Song = require('../models/song');


const signUpload = require('./helpers/signUpload')

module.exports.createAPI = function(req, res){

    console.log('req.user was', req.user)

    create(req.body.title, req.body.link, false, req.user, function (song){
        res.send(song)
    })
}

function create(title, link, isPrivate, user, cb) {
    var songName = title
    var songIsPrivate = isPrivate
    var songLink = link;

    // if there is an authenticated user, the song is owned by them, if not, then its not.

    let song = {
        title: songName,
        isPrivate: songIsPrivate,
        link: songLink,
        hasOwner: false
    }

    if(user){
        song.hasOwner = true;
        song.UserId = user.id
    }
    console.log('the song winded up being ', song)

    Song.create(song).then(song =>{
        cb ({ success: true, song: song})
    }).catch(err =>{
        cb ({ success: false, err: err })
    })

};

module.exports.uploadAPI = async function(req, res) {
    console.log('getting hur')
    try {
        console.log('the req was', req)
        const uploaded = await upload(req.query.file_type);
        console.log('uploaded was', uploaded)
        if (uploaded.success) {

            console.log('trying to return true boi')

            return res.json({
                success: true,
                signed_request: uploaded.signed_request,
                url: uploaded.url,
                key: uploaded.key,
            });
        }
        return res.status(500).send({ success: false, error: uploaded.error });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};


async function upload(file_type) {
    try {
        console.log('the filetype we got was', file_type)
        //upload the answer
        const upload = await signUpload(file_type)

        if(!upload.success){
            return ({
                success: false,
                error: upload.error,
            });
        }


        return ({
            success: true,
            signed_request: upload.signed_request,
            url: upload.url,
        });

    } catch (error) {
        return ({
            success: false,
            error: error.message,
        });
    }
}




module.exports.getAPI = function(req, res){
    console.log('attempting')
    Song.findById(req.params.id)
    .then(song =>{
        if(song){

            if(!song.dataValues.hasOwner) return res.send({ success: true, song: song })

            if(req.user === undefined) return res.send({ success: false, error: 'you do not have access to this song.' });


            if(song.dataValues.UserId === req.user.id){
                return res.send({ success: true, song: song })
            } else {
                return res.send({ success: false, error: 'you do not have access to this song.' })
            }

        }
        res.send({ success: false, error: 'Song does not exist'})


    }).catch(err =>{
        console.log('the error was', err)
        res.status(500).send({success: false, error: 'Could not find the song' })
    })
}

module.exports.editLyrics = function(songId, userId, lyrics, cb){

    Song.findById(songId).then(song => {
        // if the song doesnt have an owner, then anyone can edit it we can skip all the other checks to make
        // sure the user trying to edit it is the one who owns it.
        if(song.dataValues.hasOwner){

            if(userId === song.dataValues.UserId){
                song.update({
                    lyrics: lyrics
                }).then(updated => {
                    return cb({success: true, lyrics: lyrics})
                })
            }
        } else {
            song.update({
                lyrics: lyrics
            }).then(updated => {
                return cb({success: true, lyrics: lyrics})
            })
        }


    }).catch(err =>{
        return cb({ success: false })
    })
}


module.exports.editTitle = function(songId, userId, title, cb){


    Song.findById(songId).then(song => {

        // if the song doesnt have an owner, then anyone can edit it we can skip all the other checks to make
        // sure the user trying to edit it is the one who owns it.

        if(song.dataValues.hasOwner){
            if(userId === song.dataValues.UserId){
                song.update({
                    title: title
                }).then(updated => {
                    return cb({success: true, title: title})
                })
            }
        } else {
            song.update({
                title: title
            }).then(updated => {
                return cb({success: true, title: title})
            })
        }


    }).catch(err =>{
        return cb({ success: false })
    })
}


module.exports.editLink = function(songId, userId, link, cb){


    Song.findById(songId).then(song => {

        // if the song doesnt have an owner, then anyone can edit it we can skip all the other checks to make
        // sure the user trying to edit it is the one who owns it.

        if(song.dataValues.hasOwner){
            if(userId === song.dataValues.UserId){
                song.update({
                    link: link
                }).then(updated => {
                    return cb({success: true, link: link})
                })
            }
        } else {
            song.update({
                link: link
            }).then(updated => {
                return cb({success: true, link: link})
            })
        }


    }).catch(err =>{
        cb({ success: false })
    })
}

