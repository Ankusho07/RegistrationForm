var express = require('express');
const app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, ('public/'))));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


var session = require('express-session');

const MongoStore = require('connect-mongo');   
app.use(session({
   secret: 'keyboard cat',
   store: new MongoStore({ mongoUrl: "mongodb://localhost/akdb" })
}

));


var db = require('./conn');
const User = require('./usermodel');


//multer middelwr

var users2 = require('./data2.js');

var multer = require('multer');
app.use(express.static(path.join(__dirname, '/products/')));
var storage = multer.diskStorage({     

   destination: (req, file, cb) => {

      cb(null, path.join(__dirname, '/products/'));
   },


   filename: (req, file, cb) => {  //filename is used to determine what the file should be named inside the folder.
      cb(null, file.originalname);
   }



})

var upload = multer({ storage: storage });

app.get('/', (req, res) => {
   if (typeof req.session.user != 'undefined') {

      if (req.session.user.isadmin) {

         res.render('admin.ejs', { user: req.session.user });
      } else {

         res.render('home.ejs', { user: req.session.user });  
      }



   } else {

      res.redirect('/login')
   }




})

//adding products

app.get('/add', (req, res) => {


   if (typeof req.session.user != 'undefined') {
      if (req.session.user.isadmin) {

         res.render('add.ejs', { user: req.session.user });
      } else {

         res.render('home.ejs', { user: req.session.user });
      }


   } else {

      res.render('home.ejs');
   }



})

// adding product
app.post('/add', upload.single('image'), (req, res) => {


   users2.push(req.body);
   //console.log(req);
   req.body.image = req.file.filename;  
   console.log(product);

   res.render('add.ejs');

})


//viewing products

app.get('/view', (req, res) => {
   if (typeof req.session.user != 'undefined') {
      if (req.session.user.isadmin) {

         res.render('view.ejs', { user: req.session.user });
      } else {

         res.render('home.ejs', { user: req.session.user });
      }


   } else {

      res.render('home.ejs');
   }




})



 //login
app.get('/login', (req, res) => {

   res.render('login.ejs');


})

//register
app.get('/register', (req, res) => {

   res.render('register.ejs');


})
//contact
app.get('/contact', (req, res) => {

   if (typeof req.session.user != 'undefined') {
      res.render('contact.ejs');

   } else {
      res.redirect('/login')

   }






})

//logout
app.get('/log', (req, res) => {

   req.session.destroy();

   res.redirect('/login')


})

//users-details

app.get('/users', (req, res) => {
   db.collection('users').find({}).toArray((err, users) => {

     

      res.render('users.ejs', { users: users })

   })


})


app.post('/login', (req, res) => {

   var emailu = req.body.email;




   db.collection('users').find({ email: emailu }).toArray((err, users) => {
      if (err) {
         throw err;


      } else if (users.length == 0) {
         res.send('invalid login');
      } else {
         req.session.user = users[0] 
         req.session.save;
         
         res.redirect('/');
      }



   });




})

app.post('/register', (req, res) => {

   var user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.pass,


   });

   user.save((err) => {
      if (err) throw err;
   }
   );

   res.redirect('/register')
   console.log(user)

})
app.listen(3000);