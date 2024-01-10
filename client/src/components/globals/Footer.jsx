import { useEffect, useRef } from "react";
import '../css/FancyCard.css'

export default function Footer() {


  return (
    <footer>
      <div className="navs pt-4 bg-base-200 footer p-10 text-base-content flex justify-around flex-wrap lowercase relative overflow-hidden">
        <nav>
          <svg viewBox="0 0 160 160" width="160" height="160">
            <circle cx="80" cy="80" r="50" />
            <g transform=" matrix(0.866, -0.5, 0.25, 0.433, 80, 80)">
              <path d="M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z" fill="#FFF">
                <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="1s" repeatCount="indefinite" />
              </path>
            </g>
            <path d="M 50,0 A 50,50 0 0,0 -50,0Z" transform="matrix(0.866, -0.5, 0.5, 0.866, 80, 80)" />
            <path d="M69.9387 106.561C69.427 106.884 69.0675 107.363 68.7056 107.84C68.0602 108.691 67.4132 109.541 66.7668 110.392C66.5264 110.224 66.2859 110.056 66.0454 109.888C66.6116 107.774 67.1778 105.66 67.6466 103.91C58.0645 104.642 48.5805 105.366 39.0966 106.091C39.0644 105.83 39.0322 105.57 39 105.31C43.6683 103.77 48.3366 102.23 53.0048 100.689C52.937 100.389 52.8691 100.089 52.8013 99.7894C51.2772 99.9044 49.7531 100.019 47.352 100.201C48.4014 99.4738 48.6877 99.1797 49.0351 99.0491C55.0607 96.7836 61.1108 94.5823 67.1139 92.259C68.7317 91.6329 69.0604 90.1207 69.7128 88.5004C71.9337 82.9844 74.7847 77.7187 77.4851 72.4034C78.7302 69.9525 80.3864 67.6968 81.4807 65.188C82.411 63.0553 80.6894 62.8494 79.1506 62.9465C76.1843 63.1336 73.2226 63.3948 70.259 63.6253C70.152 63.3213 70.045 63.0174 69.938 62.7135C71.2755 62.0599 72.6129 61.4063 74.6669 60.4025C71.1166 60.6756 68.2357 60.8972 65.3548 61.1189C65.2643 60.8525 65.1738 60.5861 65.0833 60.3197C65.8932 59.8228 66.7031 59.3259 67.513 58.829C67.511 58.6064 67.509 58.3837 67.5069 58.1611C64.1998 58.3898 60.8926 58.6185 56.716 58.9073C57.6511 58.1721 58.0821 57.6562 58.6321 57.4276C66.1404 54.307 73.9389 52.9166 82.0931 53.0715C85.9121 53.144 89.7427 52.4101 93.5764 52.1856C94.0002 52.1608 94.4793 53.0842 95.059 53.7024C95.856 52.5236 96.7062 51.2661 97.5623 50C97.8503 50.2295 98.1364 50.3695 98.1214 50.4582C97.5856 53.6162 98.2495 55.5991 101.752 56.9737C105.333 58.3787 109.216 60.4578 111.518 63.3858C116.191 69.3306 115.99 75.9811 111.936 82.5997C107.371 90.0526 100.806 94.2036 92.6143 96.9028C89.7592 97.8436 86.1153 97.8851 83.7516 100.666C83.2063 101.307 81.4111 100.782 80.2268 100.994C75.1133 101.91 73.9668 106.47 71.9689 110.211C70.5714 112.827 69.2912 115.506 67.5416 118C67.5209 113.999 70.4249 110.725 69.9387 106.561ZM84.4078 86.2311C84.1707 88.579 85.7784 87.3179 86.4762 87.1362C87.7828 86.796 89.0043 86.1251 90.2588 85.5864C96.4326 82.9356 101.837 79.5532 102.78 72.0614C102.866 71.3835 102.82 70.3498 102.403 70.0047C100.268 68.2365 97.9914 66.6398 95.4958 64.7834C91.6618 72.3047 88.2023 79.0911 84.4078 86.2311Z" fill="#FFFFFF" />
          </svg>

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
        </nav>
        <nav className="fancy-card flex justify-start items-center flex-col pt-10 bg-[#1d232a]">

          <header className="text-light-font font-semibold lowercase text-3xl border-b-4 border-custom-blue p-1">
            Social
          </header>
          <a
            href="https://www.linkedin.com/company/digitomize"
            className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl"
          >
            linkedin
          </a>
          <a
            href="/discord"
            className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl"
          >
            discord
          </a>

        </nav>

        <nav className="fancy-card flex justify-start items-center flex-col pt-10 bg-[#1d232a]">
          <header className="text-light-font font-semibold lowercase text-3xl border-b-4 border-blue-500 p-1">
            Company
          </header>
          <a
            href="/updates"
            className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-xl"
          >
            Updates
          </a>
          <a
            href="/contact"
            className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-xl"
          >
            Contact
          </a>
          <a className="link link-hover hover:text-custom-blue hover:no-underline hover:scale-110 transition-all text-xl">
            Jobs
          </a>
          <a className="link link-hover hover:text-custom-blue hover:no-underline hover:scale-110 transition-all text-xl">
            Press kit
          </a>
        </nav>
        <nav className="fancy-card flex justify-start items-center flex-col mr-2 pt-10 bg-[#1d232a]">
          <header className="text-light-font font-semibold lowercase text-3xl border-b-4 border-blue-500 p-1 ">
            Legal
          </header>
          <a className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl">
            Terms of use
          </a>
          <a
            href="https://github.com/digitomize/digitomize/blob/main/LICENSE"
            className="link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl"
          >
            License
          </a>
          <a className="link link-hover hover:hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-xl">
            Cookie policy
          </a>
        </nav>

      </div>
    </footer>
  );
}
