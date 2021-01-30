import Post from '../pages/blog/types/Post'
const generateRssItem = (post: Post): string => `
  <item>
    <guid>https://docudio.com/${post.slug}</guid>
    <title>${post.title}</title>
    <link>https://docudio.com/blog/${post.slug}</link>
    <description>${post.excerpt}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>
`

const generateRss = (posts: Post[]): string => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Blog - Docudio</title>
      <link>https://docudio.com/blog</link>
      <description>Docudio's home page and blog. </description>
      <language>en</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="https://docudio.com/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`

export default generateRss
