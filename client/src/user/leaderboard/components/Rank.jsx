import { EmojiEvents, OpenInNew } from "@mui/icons-material"
import { Link } from "react-router-dom"
import boy from "../../../assets/boyV7.png"
const Rank = ({ color, pt = 8, user }) => {
  return (
    <div className={`pt-${pt}`}>
      <Link to={"/u/" + user?.username}>
        <div className='relative flex justify-center'>
          {/* Profile Picture */}
          <img
            src={user?.picture || boy} // Replace with the actual source of your profile picture
            alt='Profile'
            className='w-[84px] h-[84px] mask mask-hexagon'
          />

          {/* Badge */}
          <EmojiEvents
            sx={{ color: color }}
            fontSize='large'
            color='inherit'
            className='absolute left-1/2 transform -translate-x-1/2 translate-y-5 bottom-0'
          />
        </div>
        <div className='name'>
          <div className='flex flex-row pt-4 justify-center'>
            <h2 className='text-center text-light-blue'>{user?.name}</h2>
            <OpenInNew fontSize='small' />
          </div>
          <p className='text-center text-light-blue text-xs max-phone:hidden'>{`(@${user?.username})`}</p>
        </div>
      </Link>
    </div>
  )
}

export default Rank
