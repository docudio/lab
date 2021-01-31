export default interface Post {
  slug: string,
  excerpt: string,
  date: string,
  title: string,
  author: {
    name: string
  }
}
