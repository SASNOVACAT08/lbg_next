import Head from 'next/head'

function MyHead() {
  return (
    <div>
      <Head>
      <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        
      </Head>
    </div>
  )

}
export default MyHead