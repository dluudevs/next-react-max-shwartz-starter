import Document, { Html, Head, Main, NextScript } from 'next/document';
// This Head component is specific to the Document class, cannot be used in other pages

// this is the basic document structure even if this page isn't created. this page is created only to override defaults

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          {/* can use react portal to portal modals to this div */}
          <div id="overlay"></div>
          {/* main is where application component tree begins*/}
          <Main /> 
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;