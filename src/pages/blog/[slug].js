import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import { Link } from '../../i18n'
import React from 'react'
import { makeStyles, Grid, Button, Typography, Paper } from '@material-ui/core'

import ShareBlockStandard from '../../sharedComponents/ShareBlockStandard'
import ShareButtonCircle from '../../sharedComponents/ShareButtonCircle'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import EmailIcon from '@material-ui/icons/Email'
import FacebookIcon from '@material-ui/icons/Facebook'
import DocDivider from '../../utils/DocDivider'
import DateFormatter from '../../utils/dateFormatter'
import PostBody from '../../utils/postBody'

// import Image from '/blogheader.png'; // Import using relative path

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: '10px'
  },
  background: {
    backgroundColor: '#a0a0a0',
    padding: theme.spacing(3, 3, 3, 3)
  },
  paper: {
    margin: theme.spacing(3, 3, 3, 3),
    padding: theme.spacing(3, 3, 3, 3)
  },
  postbody: {
    padding: theme.spacing(3, 3, 3, 3)
  },
  paperContainer: {
    backgroundSize: 'contain',
    height: '300px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(\'/blogheader.png\')'
  }

}))

function Post ({ post, morePosts, preview }) {
  const router = useRouter()
  const classes = useStyles()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const shareBlockProps = {
    url: 'https://www.docudio.com/blog/welcome-to-docudio',
    button: ShareButtonCircle,
    buttons: [
      { network: 'Twitter', icon: TwitterIcon },
      { network: 'Facebook', icon: FacebookIcon },
      { network: 'Email', icon: EmailIcon },
      { network: 'Linkedin', icon: LinkedInIcon }
    ],
    text: 'Checkout this blog Post!',
    longtext: 'This Docudio blog post is awesome, check it out!'
  }

  const handleChange = (event) => {
    console.log(event)
    console.log(router.locale)
    console.log(router.pathname)
    const searchParams = new URLSearchParams(router.query)
    router.push(router.pathname + '?' + searchParams.toString(), undefined, { locale: event })
    // i18n.changeLanguage(event)
  }

  const buttons = [{ language: 'en', text: 'English' },
    { language: 'de', text: 'Deutsch' },
    { language: 'es', text: 'español' },
    { language: 'fr', text: 'français' },
    { language: 'ja', text: '日本語' },
    { language: 'ko', text: '한국어' },
    { language: 'zh-CN', text: '简体中文' },
    { language: 'pt', text: 'Português' }
  ]
  return (
    <Paper className={classes.paper}>
      <DocDivider />
      <Link
        activeClassName='Mui-selected'
        href='/blog/welcome-to-docudio'
        passHref

      >

        <div className={classes.background}>
          <Typography variant='body1' style={{ marginBottom: '30px' }}>
            <DateFormatter dateString={post.date} />
          </Typography>
          <Typography variant='h4' style={{ marginBottom: '30px' }}>
            {post.title}</Typography>
          <Typography variant='body1' style={{ marginBottom: '5px' }}>
Language</Typography>

          <Grid container direction='row'
            spacing={1} >

            {buttons.map((button, index) => {
              const { language, text } = button

              return (
                <Grid item xl='auto'  md='auto' lg='auto' key={index}>
                  <Button
                    variant='outlined'
                    size='small'
                    style={{ marginRight: '5px', marginTop: '5px' }}
                    key={language}
                    language={language}
                    onClick={() => { handleChange(language) }}
                  >
                    {text}
                  </Button>
                </Grid>
              )
            })}
          </Grid>

          <Typography variant='body1' style={{ marginTop: '20px', marginBottom: '30px' }}>
BY: {post.author.name}</Typography>
          <Typography variant='body1' >
Share</Typography>
          <ShareBlockStandard left noColor {...shareBlockProps} />

          {/*  <div className={classes.paperContainer}>
                Some text to fill the Paper Component
            </div> */ }
        </div>
      </Link>
      <article className='mb-32'>
        <title>
          {post.title} | Next.js Blog Example
        </title>
        <meta property='og:image' content={post.ogImage.url} />
        <div className={classes.postbody}>

          <PostBody content={post.content} />
        </div>

      </article>

    </Paper>

  )
}

export async function getStaticProps ({ params, locale }) {
  const post = getPostBySlug(locale, params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage'
  ])
  const content = post.content

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}

export async function getStaticPaths () {
  const locales = ['en', 'zh-CN', 'de', 'es', 'fr', 'ja', 'ko', 'pt']
  const finalpaths = []
  locales.map((locale) => {
    const posts = getAllPosts(locale, ['slug'])
    const allPostsinLocale = posts.map((post) => {
      if (locale == 'en') {
        return {
          params: {
            slug: post.slug
          },
          locale: 'en'
        }
      } else {
        return {
          params: {
            slug: post.slug
          },
          locale: locale
        }
      }
    })
    finalpaths.push(...allPostsinLocale)
  })
  return {
    paths: finalpaths,
    fallback: false
  }
}

export default (Post)
