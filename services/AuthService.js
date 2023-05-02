import HTTPService from './HTTPService';

class AuthService {
  getCurrentUser() {
    
  }

  isSignedIn() {

  }

  async signIn({ email, password }) {
    const { data } = await HTTPService.post('/signin', { email, password });

    HTTPService.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return {
      userID: data._id,
      name: data.name,
      token: data.token,
    };
  }

  signUp({ email, password, fullname }) {
    const data = {
      email,
      password,
      name: fullname,
    };

    return HTTPService.post('/signup', data);
  }
}

export default new AuthService;
