export default function Home1() {
  return (
    <>
      <div className="md:pt-8 pt-24 items-center flex flex-col text-center">
        <div className="flex-row">
          <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col md:flex-row transition font-display max-md:text-7xl md:text-[8rem] bg-gradient-to-b from-60% bg-clip-text text-transparent from-custom-blue sm:me-4">
            <span>compete. </span>
          </h1>
          <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col md:flex-row transition font-display max-md:text-7xl md:text-[8rem] bg-gradient-to-b from-60% bg-clip-text text-transparent from-custom-blue">
            <span>develop.</span>
          </h1>
        </div>
        <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col transition font-display max-md:text-7xl md:text-[8rem] bg-gradient-to-b from-50% bg-clip-text text-transparent from-custom-blue">
          {/* <span>Compete. Develop.</span> */}
          <span>showcase.</span>
        </h1>
      </div>
      <div className="text-center text-3xl my-4 lowercase py-4 text-tagColor max-md:flex flex-col">
        <span> Elevate Your Coding and Development Journey</span>{" "}
        <span> with </span> <span>Digitomize</span>
      </div>
    </>
  );
}
