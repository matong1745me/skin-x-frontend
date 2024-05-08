export interface Post {
  id: number | undefined;
  title: string | undefined;
  content: string | undefined;
  tags: string[] | undefined;
  postedBy: string | undefined;
  postedAt: Date | undefined;
}