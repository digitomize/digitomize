import { logo } from "../AllAssets";
import GitHubButton from 'react-github-btn'

export default function Footer() {
  return (
    <footer className="pt-12 font-['Geist'] bg-footer footer p-10 text-base-content md:items-center flex flex-col md:flex-row justify-center  ">
      <div className="footer justify-around">
        <aside className="flex flex-row">
          <img
            width="100"
            height="100"
            src={logo}
            alt="logo"
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl">Digitomize</h2>

            <p className="text-base-content text-md max-w-[230px] text-[#797FBC] my-1">
              explore upcoming coding contests and dynamically create developer
              portfolios
            </p>
            <GitHubButton href="https://github.com/digitomize/digitomize" data-color-scheme="no-preference: dark_high_contrast; light: dark_high_contrast; dark: light;" data-size="large" data-show-count="true" aria-label="Star digitomize/digitomize on GitHub">Star</GitHubButton>
            {/* <img
              className="mt-4"
              src={Microsoft}
              width={180}
              draggable={false}
              alt="microsoft"
            /> */}
          </div>
        </aside>
      </div>
      <div className="footer max-md:place-items-center justify-around md:self-start self-end">
        <nav className="flex justify-center items-center flex-col">
          <header className="text-white font-medium text-2xl">Social</header>
          <a
            href="https://instagram.com/digitomize"
            className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
          >
            instagram
          </a>
          <a
            href="https://www.linkedin.com/company/digitomize"
            className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
          >
            linkedin
          </a>
          <a
            href="/discord"
            className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
          >
            discord
          </a>
          <a
            href="https://twitter.com/intent/follow?screen_name=digitomize&tw_p=followbutton"
            className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
          >
            twitter
          </a>

        </nav>

        <nav className="flex justify-center items-center flex-col">
          <header className="text-white font-medium text-2xl">Company</header>
          {/* <a
            href="#"
            className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
          >
            updates
          </a> */}
          <a
            href="https://github.com/digitomize/digitomize/blob/main/LICENSE"
            className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
          >
            license
          </a>
          <a
            href="/about"
            className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
          >
            about
          </a>
          
          {/* <a className="link link-hover hover:text-custom-blue hover:no-underline hover:scale-110 transition-all text-lg">
            Jobs
          </a> */}
          {/* <a className="link link-hover hover:text-custom-blue hover:no-underline hover:scale-110 transition-all text-lg">
            Press kit
          </a> */}
        </nav>
        {/* <nav className="flex justify-center items-center flex-col mr-2">
          <header className="text-white font-medium text-2xl">Legal</header>
          <a className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg">
            Terms of use
          </a>
          <a
            href="https://github.com/digitomize/digitomize/blob/main/LICENSE"
            className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
          >
            license
          </a>
          <a className="link link-hover hover:hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg">
            Cookie policy
          </a>
        </nav> */}
      </div>
    </footer>
  );
}
