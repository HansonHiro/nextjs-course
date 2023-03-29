import Document, { Html, Head, Main, NextScript } from "next/document";
//import {Head}'s Next/Document is different.
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
