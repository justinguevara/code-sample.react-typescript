import allRecords from '~/mocks/services/userServiceMock/MockedData';
import type { UserRecordType, UserRecordsWrapper, UserServiceInterface } from '~/types/types';

export default class UserServiceMock implements UserServiceInterface {
  pageSize: number;

  constructor (pageSize: number) {
    this.pageSize = pageSize;
  }

  async getUsers(page: number):Promise<UserRecordsWrapper> {
    const startIndex: number = ((page - 1) * this.pageSize);
    const endIndex: number = ((page - 1) * this.pageSize) + this.pageSize;
    const results: UserRecordType[] = allRecords.slice(startIndex, endIndex);

    return {
      results : results,
      count : allRecords.length
    };
  }
}