const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const AuthController = require('./controllers/AuthController')
const AuthMiddleware = require('./middlewares/AuthMiddleware')
const MapController = require('./controllers/MapController')
const UserController = require('./controllers/UserController')
const upload = multer(multerConfig)
const routes = express.Router()



//AUTENTICAR
routes.post('/auth', AuthController.login)
routes.post('/register', UserController.store)
routes.use(AuthMiddleware)

//USUARIO
routes.get('/users', UserController.list)
routes.get('/users/:id', UserController.show)
routes.put('/users', UserController.update)

//MAP
routes.get('/maps', MapController.list)
routes.get('/maps/:map_id', MapController.show)
routes.post('/maps', upload.single('file'), MapController.store)
routes.delete('/maps/:id', MapController.delete)
routes.put('/maps/:id', upload.single('file'), MapController.update)


module.exports = routes
