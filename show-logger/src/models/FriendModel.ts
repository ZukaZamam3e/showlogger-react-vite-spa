export interface FriendModel {
  id: number;
  friendUserId: number;
  friendEmail: string;
  friendName: string;
  createdDate: Date;
  isPending: boolean;
  isPendingZ: string;
}
