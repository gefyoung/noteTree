import { useRouter } from 'next/router'

const UserComponentTop = ({ user }) => {

  const router = useRouter()

  const openMessagePhone = () => {
    const devSite = `/${user.Username}/message`
    const prodSite = `${process.env.NEXT_PUBLIC_URL}/${user.Username}/message`
    const currentSite = process.env.NEXT_PUBLIC_STAGE === 'prod' ? prodSite : devSite
    window.open(
      devSite,
      "MsgWindow",
      "width=500,height=700"
    )
  }

  const goBack =() => {
    
    router.back()
  }

  return (
    <>
    <div className="flex justify-center mb-10">
      <div className="flex flex-row m-5 ml-20 w-192">
        <div onClick={() => goBack()} className="flex-shrink-0 mr-20 cursor-pointer">
          {user.userIcon && <img width={100} height={100} src={user.userIcon} ></img>}
          <div className="flex justify-center text-sm ">back</div>
        </div>

        <div className="flex flex-col">
          <h3 className='mx-5 mt-5'>{user.Username}</h3> 
          {user.ppm > 0 && <div className='mx-5 mb-3'>{'$' + user.ppm}</div>}
          <button type="button" onClick={openMessagePhone}>message</button>

          {/* {user.receiver && <button className="mt-3" type="button" onClick={openReviewPhone}>donate</button>} */}
          {user.ppm > 0 && <div className="m-2 text-md">${user.ppm} / minute</div>}
        </div>
        </div>
      </div>
    </>
  )
}
export default UserComponentTop