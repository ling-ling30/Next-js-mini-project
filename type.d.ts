type User = {
  id: number;
  name: string;
  email: string;
  password: any;
};

type Book = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  pages: number;
  image?: string | null;
};

type Token = {
  message: string;
  token: string;
};
