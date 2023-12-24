import { Rewind } from "lucide-react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const RewindHome = () => {
    return (
        <div className='mx-auto w-full max-w-screen-xl px-2.5 md:px-20 antialiased'>
            <div className="heading w-4/5 mx-auto text-center my-4">
                <h1 className="text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center">
                    <span className="flex items-center bg-digitomize-bg pt-1 md:pt-6 px-2  rounded-lg">
                        Rewind 2023
                        <Rewind className="inline-block ml-2" size={40} />
                    </span>
                </h1>

            </div>
            <div className='max-w-2xl mx-auto'>
                <Swiper
                    // install Swiper modules
                    modules={[Pagination, Navigation]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                >
                    <SwiperSlide>
                        {/* <div className='mx-4'>
                            <div className='card dynamicprofile border-[#D1E5F4] border-2 shadow-[8px_8px_0px_#D1E5F4] rounded-xl my-4 h-80'></div>
                        </div> */}
                        <div className="card dynamicprofile border-[#D1E5F4] border-2 shadow-[8px_8px_0px_#D1E5F4] rounded-xl my-4 p-6 text-white max-w-xl mx-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Digitomize</h2>
                                <h2 className="text-xl font-semibold">Leetcode</h2>
                                <button className="bg-[#FFD700] text-black rounded-full px-4 py-1">Rewind 2023</button>
                            </div>
                            <div className="flex items-center mb-4 pt-4">
                                <img
                                    alt="User avatar"
                                    className="ring-4 ring-yellow-400 rounded-full w-24 h-24"
                                    src="/placeholder.svg?height=100&width=100"
                                />
                                <div className="ml-4">
                                    <h3 className="text-2xl font-bold">pranshgupta54</h3>
                                    <div className="flex items-center mt-1">
                                        <div className="flex justify-center items-center border border-badge bg-badge text-badge-txt px-6 py-1 rounded-full text-xs mr-3">
                                            AC 50
                                        </div>
                                        <div className='flex justify-center items-center border border-badge bg-badge text-badge-txt px-6 py-1 rounded-full text-xs'>Submissions 50</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center pt-8">
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">Easy</h4>
                                    <span className="text-4xl font-bold text-green-400">50</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">Medium</h4>
                                    <span className="text-4xl font-bold text-yellow-400">50</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">Hard</h4>
                                    <span className="text-4xl font-bold text-red-500">50</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center mt-8">
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">Highest Contest Ranking</h4>
                                    <span className="text-4xl font-bold">🏆 5000</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">Global Contest Ranking</h4>
                                    <span className="text-4xl font-bold">🏆 5000</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide><div className="h-80 bg-red-500">hello</div></SwiperSlide>
                    <SwiperSlide><div className="h-80 bg-red-700">hello</div></SwiperSlide>
                    <SwiperSlide><div className="h-80 bg-red-900">hello</div></SwiperSlide>
                </Swiper>

            </div>

        </div>
    );
};

export default RewindHome;