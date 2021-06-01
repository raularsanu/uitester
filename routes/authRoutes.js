const { User } = require("../index");

module.exports = app => {

    app.post('/auth/register',async (req,res) => {
        const { type, name, email, password } = req.body;

        await User.findOne({email:email}, (err,docs) => {

            if(docs){
                res.send({error:'Email already in use'});
            } else {
                if(type === 'TESTER') {
                    const newUser = new User({
                        type,
                        name,
                        email,
                        password
                    });
                    newUser.save();

                    req.session = {
                        type,
                        name,
                        id:newUser.id
                    };
                } else if(type === 'DEVELOPER'){
                    const newUser = new User({
                        type,
                        name,
                        email,
                        password,
                        tests:1
                    });
                    newUser.save();

                    req.session = {
                        type,
                        name,
                        id:newUser.id,
                        tests:newUser.tests
                    };
                };

                res.send({});
            };

        });       
    });

    app.post('/auth/login',async (req,res) => {

        const { email, password } = req.body;

        await User.findOne({ email, password }, (err,docs) => {
              if(err){
                res.send({});
                return  console.log(err);
              }

              if(docs){
                const { id, type, name } = docs;
                    
                if(type === 'TESTER'){
                    req.session = {
                        name,
                        type,
                        id
                    };
                } else if(type === 'DEVELOPER') {
                    req.session = {
                        name,
                        type,
                        id,
                        tests: docs.tests
                    };
                };
                res.send({});
              } else {
                  res.send({error:'Incorrect email or password'});
              };
        });
    });

    app.get('/auth/logout', (req,res) => {
        req.session = null;

        res.send(req.session);
    })

    app.get('/currentuser', (req,res) => { 
        if(req.session.id){
            res.send(req.session);
        }
        else {
            res.send({});
        }
    })

}