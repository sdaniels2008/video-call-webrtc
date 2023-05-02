import HTTPService from "./HTTPService";

class MessagesService {
  list(user) {
    return HTTPService.get(`/v1/conversations/${user}/messages`);
  }

  send(data) {
    return HTTPService.post('/v1/messages/send', data);
  }
}

export default new MessagesService;
