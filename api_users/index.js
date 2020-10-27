const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser');
const usersController = require('../api_users/controllers/usersController')

// Create express instance
const app = express()



// Require API routes
// const users = require('./routes/users')
//const test = require('./routes/test')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.raw())
// app.use(express.urlencoded());
// app.use(express.json());      // if needed

// Import API Routes
//app.use(users)
//app.use(test)

app.get('/api', (req, res) => {
  res.send('Hello World!')
})
//
//
app.get('/api/auth/login', async function a(req, res)  {
  // console.log(req);
  console.log(req.body);
  // // res.send('get:/api/auth/login')

  //router.post('/api/users/login', usersController.login)

  res.send({data:'ok get:/api/auth/login'})
  // res.send('Hello login get!')
})

// // Login
// router.post('/api/users/login', usersController.login)

//
// app.post('/api/auth/login', async function a(req, res)  {
//   //console.log(req);
//   console.log(req.body);
//   res.send({data:'ok post:/api/auth/login'})
// })

app.post('/api/auth/login', usersController.login)
app.post('/api/auth/register', usersController.register)
app.get('/api/auth/user', usersController.user)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  // const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
