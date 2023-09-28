interface User {
  id: number;
  username: string;
  email: string;
  register_date: Date;
  liked: string | Array<string>;
  posts: number;
}
