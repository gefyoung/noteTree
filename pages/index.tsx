import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { getNotionPage } from '../utils/node/getNotionRecord'

import { NotionRenderer, Code, Collection, CollectionRow, Modal} from 'react-notion-x'

export default function Home({ notionDetails }) {
//   const router = useRouter()
//   console.log(router.locale)

//   useEffect(()=> {
//     console.log(router)
//     // if (location.hash) {
//     //     let elem = document.getElementById(location.hash.slice(1))
//     //     if (elem) {
//     //         elem.scrollIntoView({behavior: "smooth"})
//     //     }
//     // } else {
//     // window.scrollTo({top:0,left:0, behavior: "smooth"})
//     // }
// }, [])

  return (
    <div className="">
      <Head>
        <title>NoteTree</title>
        <link rel="icon" href="/treeFavicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:image" content="https://talktree.me/treeFavicon.svg"></meta>
        {/* <script src="https://static.opentok.com/v2.20.1/js/opentok.min.js"></script> */}
      </Head>
        <div className="">

          <NotionRenderer recordMap={notionDetails.recordMap} >
            
          </NotionRenderer>
          
        </div>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const notionDetails = await getNotionPage("e50a7e7a84564e85a398096e07db6629")
    return { props: { notionDetails: notionDetails }, revalidate: 1 }
  } catch (err) {
    console.log(err)
    return { notFound: true }
  }
}
