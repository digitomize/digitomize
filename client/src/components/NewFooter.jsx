import {
  logo
} from "./AllAssets";

export default function Footer() {
  return (
    <footer className="pt-4 bg-base-200 footer p-10 text-base-content md:items-center max-md:grid-flow-col lowercase">
      <div className="footer justify-around">
        <aside>
          <img
            width="100"
            height="100"
            src={logo}
            alt="logo"
            className="rounded-full"
          />
          <div>
            <h2 className="text-base-content text-xl">Hey👋</h2>
            <h2 className="text-base-content text-xl">Loved ❤️ digitomize ?</h2>
            <h2 className="text-base-content text-xl">It’s open-source!</h2>
            <h2 className="text-base-content text-xl">
              Consider contributing <br /> on{" "}
              <a
                href="https://github.com/pranshugupta54/digitomize"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4DA9FF" }}
              >
                GitHub
              </a>
            </h2>
          </div>
        </aside>
        <nav className='flex justify-center items-center flex-col'>
          <header className="text-light-font font-semibold lowercase text-3xl border-b-4 border-custom-blue p-1">Social</header>
          <a
            href="https://www.linkedin.com/company/digitomize"
            className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl"
          >
            linkedin
          </a>
          <a href="/discord" className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl">
            discord
          </a>
        </nav>
      </div>
      <div className="footer max-md:place-items-end justify-around md:self-start self-end">
        <nav className="flex justify-center items-center flex-col">
          <header className="text-light-font font-semibold lowercase text-3xl border-b-4 border-blue-500 p-1">Company</header>
          <a href="/updates" className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-xl">
            Updates
          </a>
          <a href="/contact" className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-xl">
            Contact
          </a>
          <a className="link link-hover hover:text-custom-blue hover:no-underline hover:scale-110 transition-all text-xl">Jobs</a>
          <a className="link link-hover hover:text-custom-blue hover:no-underline hover:scale-110 transition-all text-xl">Press kit</a>
        </nav>
        <nav className="flex justify-center items-center flex-col mr-2">
          <header className="text-light-font font-semibold lowercase text-3xl border-b-4 border-blue-500 p-1 ">Legal</header>
          <a className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl">Terms of use</a>
          <a
            href="https://github.com/digitomize/digitomize/blob/main/LICENSE" 
            className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl"
          >
            License
          </a>
          <a className="link link-hover hover:hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
}
