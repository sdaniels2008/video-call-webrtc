import HTTPService from "./HTTPService";

class ConversationsService {
  list() {
    return HTTPService.get('/v1/conversations');
  }
}

export default new ConversationsService;
