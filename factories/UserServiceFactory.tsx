import UserServiceMock from '~/mocks/services/userServiceMock/UserServiceMock';

export default class UserServiceFactory {
  static create(pageSize: number): UserServiceMock {
    return new UserServiceMock(pageSize);
  }
}