var Twitter = require("twitter");
var imageGetter = require("../imageGetter")

var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

client.tweet = function(tweet, images) {
    imageGetter(images[0], (front_image) => {
        imageGetter(images[1], (back_image) => {
            client.post('media/upload', {media_data: front_image}, (err, mediaF, res) => {
                if (err) console.log(err);
                else
                    client.post('media/upload', {media_data: back_image}, (err, mediaB, res) => {
                        if (err) console.log(err);
                        else
                            var status = {
                                status: tweet,
                                media_ids: (mediaB.media_id_string) ? 
                                    `${mediaF.media_id_string},${mediaB.media_id_string}`:
                                    `${mediaB.media_id_string}`
                            }
                            console.log("STAUTS = "+ JSON.stringify(status));

                            client.post('statuses/update', status, (err, tweet, res) => {
                                if (err) console.log(err);
                                else 
                                    console.log("tweet send!");
                            });

                    })
            })
        })
    })
    
}

client.test = function(tweet, images) {
    imageGetter(images[0], (front_image) => {
        client.post('media/upload', {media_data: front_image}, (err, media, res) => {
            console.log(err, media, res);
        })        
    })
}

module.exports = client;