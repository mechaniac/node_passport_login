const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const app = express()

require('./config/passport')(passport)  //passing passport to passport.js (its a function)

//DataBase config
const connectionString = require('./config/keys').MongoURI

//Connect DB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongoDB connected...'))
    .catch((err) => console.log(err))

//Middleware
//ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')   //depends on prev line: expressLayouts
//BodyParser
app.use(express.urlencoded({ extended: false }))    //access req.body
//Express Session
app.use(session({   //needed for flash() messages
    secret: 'aSecret',
    resave: true,
    saveUninitialized: true
}))
//Passport middleware
app.use(passport.initialize())
app.use(passport.session())
//Connect flash
app.use(flash())

//Global Variables (to set different colors for messages)
app.use((req, res, next)=>{ //user defined middleware
    res.locals.success_msg = req.flash('success_msg')   //res.locals holds my variables in session => can redirect
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})


//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const port = process.env.PORT || 5000

app.listen(port, console.log(`server running on port ${port}`))