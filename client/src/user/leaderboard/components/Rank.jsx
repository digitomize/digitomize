import { WorkspacePremium } from '@mui/icons-material';

const Rank = ({ color, pt = 8 }) => {
    return (
        <div className={`pt-${pt}`}>
            <div className="relative flex justify-center">
                {/* Profile Picture */}
                <img
                    src="profile-picture.jpg" // Replace with the actual source of your profile picture
                    alt="Profile"
                    className="w-[84px] h-[84px] mask mask-hexagon"
                />

                {/* Badge */}
                <WorkspacePremium
                    sx={{ color: color }}
                    fontSize='large'
                    color="inherit"
                    className="absolute left-1/2 transform -translate-x-1/2 translate-y-2 bottom-0"
                />
            </div>
            <h2 className='text-center pt-4'>user</h2>
        </div>
    )
}

export default Rank