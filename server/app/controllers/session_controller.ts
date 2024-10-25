import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {

  async register({request, response, auth}:HttpContext){
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)
    await auth.use('web').login(user)
    return response.created(user)
  }

  async login({ request, auth }: HttpContext) {
    const {email, password} = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('web').login(user)
    return token
  }

  async logout({ auth, response }:HttpContext){
    await auth.use('web').logout()
    return response.redirect('/login')
  }
  
}
