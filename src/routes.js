const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const AuthController = require('./controllers/AuthController')
const AuthMiddleware = require('./middlewares/AuthMiddleware')
const MapController = require('./controllers/MapController')
const UserController = require('./controllers/UserController')
const CategoryController = require('./controllers/CategoryController')
const EventController = require('./controllers/EventController')

const upload = multer(multerConfig)
const routes = express.Router()



//AUTENTICAR
routes.post('/auth', AuthController.login)
routes.post('/register', UserController.store)


//USUARIO
routes.get('/users', UserController.list)
routes.get('/users/:id', UserController.show)
routes.put('/users', UserController.update)

//MAPA
routes.get('/maps', MapController.list)
routes.get('/maps/:map_id', MapController.show)
routes.post('/maps', upload.single('file'), MapController.store)
routes.delete('/maps/:id', MapController.delete)
routes.put('/maps/:id', upload.single('file'), MapController.update)

routes.get('/maps/:map_id/events', MapController.listEventFromMap);
routes.post('/maps/:map_id/events/:event_id', MapController.storeEventToMap);
routes.delete('/maps/:map_id/events/:event_id', MapController.deleteEventFromMap);


//CATEGORIAS
routes.get('/categorys', CategoryController.list)
routes.get('/categorys/:id', CategoryController.show)
routes.post('/categorys', CategoryController.store)
routes.delete('/categorys/:id', CategoryController.delete)
routes.put('/categorys/:id', CategoryController.update)

//EVENTOS
routes.get('/events', EventController.list)
routes.get('/events/:event_id', EventController.show)
routes.post('/categorys/:category_id/events', EventController.store)
routes.delete('/categorys/:category_id/events', EventController.delete)
routes.put('/categorys/:category_id/events/:id', EventController.update)







routes.use(AuthMiddleware)

module.exports = routes
