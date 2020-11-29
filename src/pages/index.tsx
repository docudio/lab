import Head from 'next/head'

function Home() {
  return (
    <>
      <Head>
                  <link
            rel='alternate'
            type='application/rss+xml'
            title='RSS feed for blog posts'
            href='https://docudio.com/rss.xml'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />

        <title>Self Services</title>
      </Head>
      <h1>test</h1>
      </>
  )
}

export default Home
