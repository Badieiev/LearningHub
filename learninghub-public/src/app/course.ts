export interface Course {
  _id: string;
  name: string;
  description: string;
  rating: number;
  topics: string[];
  about: string;
  level?: string;
}
