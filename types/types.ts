export type UserRecordType = {
  id: number;
  firstName: string;
  lastName: string;
};

export type UserRecordsWrapper = {
  results: UserRecordType[]; 
  count: number;
  [key: string]: any;
};

export type onClickEventListener = (event: React.MouseEvent<HTMLButtonElement>) => void;

export interface UserServiceInterface {
  getUsers(page: number): Promise<UserRecordsWrapper>;
};