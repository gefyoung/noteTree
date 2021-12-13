import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <meta name='application-name' content={"NoteTree"} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={"NoteTree"} />
          {/* <meta name='description' content={"On demand expertise"} /> */}
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <script src="https://cdn.usefathom.com/script.js" data-site="EUGEWGHE" defer></script>
          <link rel='shortcut icon' href='/favicon.png' />
          <link rel='manifest' href='/manifest.json' />
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