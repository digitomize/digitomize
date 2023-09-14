export default function Home1() {
  return (
    <>
      <div className="max-md:mt-14 mx-10 items-center px-6 md:px-8 flex flex-col text-center">
        <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col md:flex-row transition font-display max-md:text-7xl md:text-[8rem] bg-gradient-to-b from-60% bg-clip-text text-transparent from-custom-blue">
          <span>compete.</span>
        </h1>
        <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col md:flex-row transition font-display max-md:text-7xl md:text-[8rem] bg-gradient-to-b from-60% bg-clip-text text-transparent from-custom-blue">
          <span>develop.</span>
        </h1>
        <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col transition font-display max-md:text-7xl md:text-[8rem] bg-gradient-to-b from-50% bg-clip-text text-transparent from-custom-blue">
          {/* <span>Compete. Develop.</span> */}
          <span>showcase.</span>
        </h1>
      </div>
      <div className="text-center text-3xl my-4 lowercase py-4 text-tagColor max-md:flex flex-col">
      <span> Elevate Your Coding and Development Journey</span> <span> with </span> <span>Digitomize</span>
      </div>
    </>
  );
}
