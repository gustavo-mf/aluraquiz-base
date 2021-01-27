import Head from 'next/head';
import db from '../../../db.json';

function Header() {
  return (
    <div>
      <Head>
        <title>AluraQuiz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:url" content="https://aluraquiz-base.gustavo-mf.vercel.app/"/>
        <meta property="og:title" content={db.title}/>
        <meta property="og:site_name" content="AluraQuiz"/>
        <meta property="og:description" content={db.description}/>
        <meta property="og:image" content={db.bg}/>
        <meta property="og:image:type" content="image/jpeg"/>
        <meta property="og:image:width" content="800"/> 
        <meta property="og:image:height" content="600"/>
        <meta property="og:type" content="website"></meta>
      </Head>
    </div>
  )
}

export default Header;