import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

// El file da lel web bas, w beygahez el HTML el asasy le kol page.
// El function de beteshta8al fel Node.js, fa mesh beta2dar testa5dem el DOM.
export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Da beywa2af scroll el body 3ashan ScrollView teshta8al zay el mobile. */}
        <ScrollViewStyleReset />

        {/* Ben5aly background el web nafs lawn el wireframe el fate7. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Momken nezawed hena ay element mo7tagino gowwa head 3al web. */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #F5F7F4;
}
`;
