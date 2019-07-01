var base64 = require("node-base64-image");
var request = require('request');

let option = {
    string: true
}

let imageGetter = {
    getImage: function(url, callback) {
        if (!url) callback(null)
        else
            base64.encode(url, option, (err, image) => {
                if (err) console.log(err);
                else
                    callback(image)
            })
    }
}

module.exports = imageGetter.getImage