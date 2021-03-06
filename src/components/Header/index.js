import React from 'react';
import Head from 'next/head';
import db from '../../../db.json';

function Header() {
  return (
    <div>
      <Head>
        <title>{db.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:url" content="https://aluraquiz-base.gustavo-mf.vercel.app/" />
        <meta property="og:title" content={db.title} />
        <meta property="og:site_name" content="GhibliQuiz" />
        <meta property="og:description" content={db.description} />
        <meta property="og:image" content={db.bg} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="website" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
    </div>
  );
}

export default Header;
