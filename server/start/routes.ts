import router from '@adonisjs/core/services/router'
import SessionController from '#controllers/session_controller'

router.post('/register',[SessionController, 'register'])
router.post('/login',[SessionController, 'login'])
router.post('/logout',[SessionController, 'logout'])