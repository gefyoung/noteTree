import Link from 'next/link'

export default function UserAgreement() {
  return (
    <div className="flex flex-row">
      <div className="overflow-visible ">By continuing, you agree to our </div>
      <div className="mx-1 text-blue-500">
        <Link href="/about/tos"><a>User Agreement</a></Link>
      </div>
      <div>and </div>
      <div className="ml-1 text-blue-500">
        <Link href="/about/privacy"><a>Privacy Policy</a></Link>
      </div>
      .
    </div>
  )
}