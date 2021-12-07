import Link from 'next/link'

export default function UserAgreement() {
  return (
    <div>
      By continuing, you agree to our
      <Link href="/about/tos"><a className="mx-1 text-blue-500">User Agreement</a></Link>
      and
      <Link href="/about/privacy"><a className="ml-1 text-blue-500">Privacy Policy</a></Link>
      .
    </div>
  )
}