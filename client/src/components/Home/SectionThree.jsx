import ContestCards from "../ContestCards";

export default function SectionThree() {
  return (
    <div className="contestlist font-['Geist'] pb-36">
      <div className="hero flex flex-col">
        <div className="">
          <div className="my-24 mx-auto">
            <h1 className="text-6xl my-0 font-['Geist'] text-white font-semibold text-center">
              Upcoming <span className="block mt-4">Contest List</span>
            </h1>
            <p className="text-center mt-8 text-description max-w-2xl mx-auto">
              filter contests based on various criteria and view contest details
              such as remaining time, duration, and more.
            </p>
            <div className="flex justify-center m-8">
              <button className="px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75">
                <a href="/contests">Explore Contests</a>
              </button>
            </div>
            <div className="flex justify-center">
              <div className="max-phone:hidden mt-24 max-w-[30vw]">
                <ContestCards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
