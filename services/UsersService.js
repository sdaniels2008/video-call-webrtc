import HTTPService from './HTTPService';

class UsersService {
  listOnlineUsers() {
    return HTTPService.get('/v1/users/online');
  }
}

export default new UsersService;
