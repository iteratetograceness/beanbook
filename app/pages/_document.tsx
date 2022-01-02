import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" /> 
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" /> 
          <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&family=Volkhov:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
          <meta name="description" content="Mobile-friendly coffee tasting journal app" />
          <meta property="og:title" content="BeanBook" />
          <meta property="og:description" content="A minimalistic coffee tasting journal app" />
          <meta property="og:url" content="" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument