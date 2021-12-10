import NavbarComp from "../navbar/navbar"
import Link from 'next/link'
import { useRouter } from "next/router"

export default function AboutComp() {
  const router = useRouter()
  return (
    <>
      {/* <NavbarComp /> */}
      <div className="m-10">
        <div className="max-w-prose">
        </div>
        <div className="mt-5">This website is in beta</div>
        <div>Email geoff@Talktree.me or <Link href="/gty" ><a>notetree.me/gty</a></Link></div>
        <div className="mt-5">


          <button
            onClick={() => router.push("/about/tos")}
            className="px-2 py-1 mx-5 my-1 rounded hover:bg-gray-200 "
          >
            <Link href="/about/tos">
              <a>Terms of Service</a>
            </Link>
          </button>

          <button
            onClick={() => router.push("/about/privacy")}
            className="px-2 py-1 mx-5 my-1 rounded hover:bg-gray-200 "
          >
            <Link href="/about/privacy">
              <a>Privacy Policy</a>
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}
