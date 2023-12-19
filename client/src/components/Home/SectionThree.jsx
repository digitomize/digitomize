import ContestCards from "../ContestCards";

export default function SectionThree() {
  return (
    <div className="font-['Geist'] md:mt-4 pb-12">
      <div className="hero flex flex-col">
        <div className="">
          <div className="md:my-24 mx-auto w-4/5">
            <h1 className="text-white max-md:text-4xl md:text-7xl text-center">
              <span className="block mt-1 md:mt-6">
                <span className="bg-digitomize-bg px-2">Discover</span> the
                perfect coding competition for you
              </span>{" "}
            </h1>
            <p className="max-md:text-sm text-center mt-8 text-description max-w-2xl mx-auto">
              filter contests based on various criteria and view contest details
              such as remaining time, duration, and more.
            </p>
            <div className="flex justify-center m-8">
              <button className="px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border border-[#9E9CEF]">
                <a href="/contests">Explore Contests</a>
              </button>
            </div>
          </div>
          <div className="w-screen">
            <ContestCards />
          </div>
        </div>
      </div>
    </div>
  );
}
