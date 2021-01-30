import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs () {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug (locale, slug, fields = []) {
  const realSlug = slug
  const fullPath = join(postsDirectory, `${realSlug}/${locale}/${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // console.log(fileContents)
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts (locale, fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(locale, slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}
