

const UserComponentTop = ({ user }) => {

  const openMessagePhone = () => {
    const devSite = `/${user.Username}/message`
    const prodSite = `${process.env.NEXT_PUBLIC_URL}/${user.Username}/message`
    const currentSite = process.env.NEXT_PUBLIC_STAGE === 'prod' ? prodSite : devSite
    window.open(
      currentSite,
      "MsgWindow",
      "width=500,height=700"
    )
  }

  console.log(user)
  return (
    <>
    <div className="flex justify-center ml-">
      <div className="flex flex-row m-5 ml-20 w-192">
        <div className="flex-shrink-0 mr-20">
          {user.userIcon && <img width={100} height={100} src={user.userIcon} ></img>}
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