const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

var accountSchema = new mongoose.Schema({

    icon: {
        type: String,
        required: "L'icone ne peut être vide"
    },

    username: {
        type: String,
        required: "Le pseudo ne peut être vide",
        unique: true
    },

    password: {
        type: String,
        required: "Le mot de passe ne peut être vide",
    },

    // match_history: [{
    //     type: String
    // }],

    saltSecret: {
        type: String
    }
});

accountSchema.pre("save", function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

accountSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

accountSchema.methods.generateJwt = function(req) {
    return jwt.sign({ _id: this._id, pseudo: req.body.pseudo },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP,
        }
    );
};


mongoose.model('Account', accountSchema);