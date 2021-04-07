const mongoose = require('mongoose');
const passport = require('passport');
const Account = mongoose.model('Account');



module.exports.authenticate = (req, res, next) => {
    passport.authenticate("local", (err, account, info) => {
        if(err)
            return res.status(400).json(err);
        else if (account){
            return res.status(200).json({ account: account, token: account.generateJwt(req) });
        }
        else {
            return res.status(500).json({message: "Utilisateur pas trouvé", info: info});
        }
    })(req, res);
}


module.exports.addAccount = (req, res, next) => {

    
    const account = new Account();
    account.icon = req.body.icon;
    account.username = req.body.username;
    account.password = req.body.password;
    
    account.save((err, doc) => {
        if(!err){
            res.send(doc)
        } else {
            if(err.code === 11000) {
                return res.status(403).json({message: "Le pseudo est déjà utilisé"});
            }
            else {
                return next(err);
            }
        }
    })
}

