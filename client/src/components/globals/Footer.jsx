import { logo } from "../AllAssets";
import GitHubButton from "react-github-btn";

export default function Footer() {
  return (
    <footer className=" font-['Geist'] bg-cardsColor pb-10 mt-6">
      <div className="footer lg:max-w-7xl mx-auto p-10 text-base-content md:items-center flex flex-col md:flex-row justify-center items-start">
        <aside className="flex flex-col mx-auto sm:!ml-0 md:!mr-8 text-center sm:text-start mb-4 sm:mb-0">
          <img
            width="100"
            height="100"
            src={logo}
            alt="logo"
            className="rounded-full m-auto sm:!ml-0 sm:-my-6"
          />
          <div>
            <h2 className="text-2xl my-3">Digitomize</h2>

            <p className="text-base-content text-md max-w-[230px] mb-5">
              Explore upcoming coding contests and dynamically create developer
              portfolios
            </p>
            <GitHubButton
              href="https://github.com/digitomize/digitomize"
              data-color-scheme="no-preference: dark_high_contrast; light: dark_high_contrast; dark: light;"
              data-size="large"
              data-show-count="true"
              aria-label="Star digitomize/digitomize on GitHub"
            >
              Star
            </GitHubButton>
          </div>
        </aside>
        <div className="lg:flex-1 flex flex-col sm:flex-row sm:flex-wrap mx-auto justify-between gap-8 mb-4 sm:mb-0">
          <nav className="flex justify-center items-center sm:!items-start flex-col gap-3 w-full sm:!w-[45%] xl:!w-fit">
            <header className="text-white font-medium text-2xl mb-2">
              Competitions
            </header>
            <a
              href="/contests"
              className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Contests
            </a>
            <a
              href="/challenges"
              className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Challenges
            </a>
          </nav>
          <nav className="flex justify-center items-center sm:!items-start flex-col gap-3 w-full sm:!w-[45%] xl:!w-fit">
            <header className="text-white font-medium text-2xl mb-2">
              Opportunities
            </header>
            <a
              href="/internships"
              className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Internship
            </a>
            <a
              href="/jobs"
              className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Jobs
            </a>
          </nav>
          <nav className="flex justify-center items-center sm:!items-start flex-col gap-3 w-full sm:!w-[45%] xl:!w-fit">
            <header className="text-white font-medium text-2xl mb-2">
              Connect
            </header>
            <a
              href="/feedback"
              className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Feedback
            </a>
            <a
              href="/contact"
              className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              About Digitomize
            </a>
            <a
              href="https://discord.com/invite/bsbBytBqBc"
              className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Join our Discord
            </a>
          </nav>
          <nav className="flex justify-center items-center sm:!items-start flex-col gap-3 w-full sm:!w-[45%] xl:!w-fit">
            <header className="text-white font-medium text-2xl mb-2">
              Social
            </header>
            <div className="flex gap-8 lg:gap-3">
              <a
                href="https://www.linkedin.com/company/digitomize"
                className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white hover:fill-custom-blue"
                >
                  <path
                    d="M29.4393 0.00286429H2.73994C2.3958 -0.0132232 2.05185 0.0385726 1.7278 0.155316C1.40375 0.27206 1.10596 0.451437 0.851441 0.683168C0.596947 0.914919 0.390731 1.19449 0.244635 1.50586C0.0985381 1.81725 0.0153996 2.15433 0 2.49782V29.2038C0.0201595 29.9226 0.315312 30.6066 0.824841 31.115C1.33437 31.6236 2.01963 31.9182 2.73994 31.9383H29.4393C30.1395 31.9072 30.7997 31.6034 31.2783 31.0922C31.7569 30.5811 32.0157 29.9032 31.9993 29.2038V2.49782C32.0051 2.16349 31.9423 1.83154 31.8149 1.52229C31.6875 1.21306 31.4981 0.933042 31.2583 0.699415C31.0187 0.465808 30.7337 0.283537 30.4209 0.163759C30.1081 0.0439817 29.7741 -0.0107681 29.4393 0.00286429ZM9.99977 26.6291H5.33988V12.3978H9.99977V26.6291ZM7.77982 10.2421C7.45465 10.2535 7.13064 10.1975 6.82816 10.0779C6.52567 9.95826 6.25124 9.77749 6.02212 9.54694C5.79299 9.31638 5.61409 9.04104 5.49669 8.73819C5.37928 8.43534 5.3259 8.11154 5.33988 7.78712C5.3255 7.45918 5.37996 7.13188 5.49977 6.8262C5.61959 6.5205 5.80211 6.24318 6.0356 6.01203C6.26912 5.78086 6.54845 5.60096 6.8557 5.48388C7.16297 5.36677 7.49137 5.31508 7.81982 5.33208C8.14499 5.32079 8.46901 5.37669 8.77148 5.49633C9.07397 5.61597 9.3484 5.79674 9.57752 6.0273C9.80665 6.25785 9.98555 6.53319 10.1029 6.83604C10.2204 7.13889 10.2737 7.46269 10.2598 7.78712C10.2741 8.11505 10.2197 8.44235 10.0999 8.74803C9.98005 9.05373 9.79753 9.33105 9.56404 9.56221C9.33053 9.79338 9.05119 9.97327 8.74394 10.0904C8.43667 10.2075 8.10827 10.2592 7.77982 10.2421ZM26.6794 26.6291H21.9995V18.8448C21.9995 16.9886 21.3395 15.7111 19.6795 15.7111C19.164 15.7155 18.6622 15.879 18.2434 16.1792C17.8244 16.4794 17.5088 16.9015 17.3396 17.3878C17.2096 17.7522 17.1552 18.1392 17.1796 18.5255V26.6291H12.5797V12.3978H17.1796V14.3938C17.5886 13.6439 18.1972 13.0216 18.9384 12.5952C19.6795 12.1691 20.5243 11.9557 21.3795 11.9786C24.3994 11.9786 26.6794 13.9747 26.6794 18.2261V26.6291Z"
                    fill="inherit"
                  />
                </svg>
                <span className="sr-only">linkedin link</span>
              </a>
              <a
                href="https://twitter.com/intent/follow?screen_name=digitomize&tw_p=followbutton"
                className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="26"
                  height="27"
                  viewBox="0 0 26 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white hover:fill-custom-blue"
                >
                  <g>
                    <path
                      d="M15.4761 11.0197L25.1567 0H22.8635L14.4543 9.56627L7.7428 0H0L10.1513 14.4673L0 26.0217H2.2932L11.1679 15.9172L18.2572 26.0217H26M3.12087 1.69347H6.64387L22.8618 24.4114H19.3379"
                      fill="inherit"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_376_19">
                      <rect width="26" height="26.0218" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="sr-only">twitter link</span>
              </a>
              <a
                href="https://discord.com/invite/bsbBytBqBc"
                className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="33"
                  height="27"
                  viewBox="0 0 33 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white hover:fill-custom-blue"
                >
                  <g clipPath="url(#clip0_354_206)">
                    <path
                      d="M27.2968 2.86881C25.2261 1.90921 23.0207 1.20214 20.6974 0.798096C20.4112 1.30315 20.0745 1.99339 19.8557 2.54894C17.3978 2.17857 14.9567 2.17857 12.5493 2.54894C12.3136 1.99339 11.9769 1.30315 11.6907 0.798096C9.36744 1.20214 7.16204 1.90921 5.09133 2.86881C0.916225 9.16513 -0.211726 15.31 0.343832 21.3538C3.12162 23.4245 5.7984 24.6703 8.44151 25.4952C9.09808 24.603 9.67047 23.6434 10.1755 22.6501C9.21592 22.2966 8.30683 21.842 7.44824 21.3201C7.68393 21.1518 7.90279 20.9666 8.12164 20.7982C13.391 23.2562 19.0981 23.2562 24.3001 20.7982C24.519 20.9834 24.7379 21.1518 24.9735 21.3201C24.115 21.842 23.189 22.2797 22.2463 22.6501C22.7513 23.6434 23.3237 24.603 23.9803 25.4952C26.6234 24.6703 29.317 23.4245 32.078 21.3538C32.7345 14.3336 30.95 8.25604 27.3305 2.86881H27.2968ZM10.8826 17.6501C9.3001 17.6501 8.0038 16.1854 8.0038 14.3841C8.0038 12.5827 9.26643 11.1181 10.8826 11.1181C12.4988 11.1181 13.7782 12.5827 13.7614 14.3841C13.7614 16.1686 12.4988 17.6501 10.8826 17.6501ZM21.5055 17.6501C19.923 17.6501 18.6267 16.1854 18.6267 14.3841C18.6267 12.5827 19.8894 11.1181 21.5055 11.1181C23.1217 11.1181 24.4012 12.5827 24.3843 14.3841C24.3843 16.1686 23.1217 17.6501 21.5055 17.6501Z"
                      fill="inherit"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_354_206">
                      <rect
                        width="33"
                        height="26"
                        fill="white"
                        transform="translate(0 0.0898438)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="sr-only">discord link</span>
              </a>
              <a
                href="https://instagram.com/digitomize"
                className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.9076 2.30518H10.0923C5.74195 2.30518 2.21533 5.83179 2.21533 10.1821V21.9975C2.21533 26.3477 5.74195 29.8744 10.0923 29.8744H21.9076C26.2579 29.8744 29.7846 26.3477 29.7846 21.9975V10.1821C29.7846 5.83179 26.2579 2.30518 21.9076 2.30518Z"
                    className="stroke-white group-hover:stroke-custom-blue"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 21.9975C12.7372 21.9975 10.0923 19.3526 10.0923 16.0898C10.0923 12.827 12.7372 10.1821 16 10.1821C19.2628 10.1821 21.9077 12.827 21.9077 16.0898C21.9077 17.6565 21.2852 19.1593 20.1773 20.2671C19.0694 21.375 17.5667 21.9975 16 21.9975Z"
                    className="stroke-white group-hover:stroke-custom-blue"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23.8769 6.24367C22.7894 6.24367 21.9077 7.12532 21.9077 8.2129C21.9077 9.30047 22.7894 10.1821 23.8769 10.1821C24.9645 10.1821 25.8462 9.30047 25.8462 8.2129C25.8462 7.12532 24.9645 6.24367 23.8769 6.24367Z"
                    className="fill-white group-hover:fill-custom-blue"
                  />
                </svg>
                <span className="sr-only">instagram link</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <p className="text-center w-full text-sm">
        &copy; 2023 Digitomize.{" "}
        <a
          href="https://github.com/digitomize/digitomize/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          MIT Licensed
        </a>
        . Contribute on{" "}
        <a
          href="https://github.com/digitomize/digitomize"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
