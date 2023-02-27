export default interface Video {
  id: string;
  title: string;
  thumbnail: string;
  User: {
    id: string;
    name: string;
    imageUrl: string;
  };
  createdAt: string;
  updatedAt: string;
  description: string;
  likesAmount: number;
  published: boolean;
  userId: string;
  url: string;
}
