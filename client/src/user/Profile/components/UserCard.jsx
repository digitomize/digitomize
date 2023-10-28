
import logo from '../../../assets/logo.png'

function UserCard({ height }) {
    console.log(height)
    return (
        <div className={`border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] rounded-xl bg-cardsColor  hover:scale-[1.02] hover:bg-cardsHover w-[450px] h-[${height}px] p-6 `}>
            <div className='rounded-full h-[90px] w-[90px]'>
                <img src={logo} alt="" />
            </div>
            <div className='flex flex-col items-start gap-[8px] p-0'>
                <div>
                    <h1>
                        user name 👋
                    </h1>
                </div>

            </div>
        </div>
    )
}

export default UserCard