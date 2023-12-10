import { logo } from "../AllAssets"
import Microsoft from "/src/assets/ms_startups_dark.png"

export default function Footer() {
  return (
    <footer className="pt-12 font-['Geist'] bg-footer footer p-10 text-base-content md:items-center max-md:grid-flow-col ">
      <div className='footer justify-around'>
        <aside className='flex flex-row'>
          <img
            width='100'
            height='100'
            src={logo}
            alt='logo'
            className='rounded-full'
          />
          <div>
            <h2 className='text-2xl'>Digitomize</h2>
            <p className='text-base-content text-md max-w-[230px] text-[#797FBC] mt-1'>
              explore upcoming coding contests and dynamically create developer
              portfolios
            </p>
            <img
              className='mt-4'
              src={Microsoft}
              width={180}
              draggable={false}
              alt='microsoft'
            />
          </div>
        </aside>
        <nav className='flex justify-center items-center flex-col'>
          <header className='text-white font-medium text-2xl p-1'>
            Social
          </header>
          <a
            href='https://www.linkedin.com/company/digitomize'
            className='link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg'
          >
            linkedin
          </a>
          <a
            href='/discord'
            className='link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg'
          >
            discord
          </a>
        </nav>
      </div>
      <div className='footer max-md:place-items-end justify-around md:self-start self-end'>
        <nav className='flex justify-center items-center flex-col'>
          <header className='text-white font-medium text-2xl'>Company</header>
          <a
            href='/updates'
            className='link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg'
          >
            Updates
          </a>
          <a
            href='/contact'
            className='link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg'
          >
            Contact
          </a>
          <a className='link link-hover hover:text-custom-blue hover:no-underline hover:scale-110 transition-all text-lg'>
            Jobs
          </a>
          <a className='link link-hover hover:text-custom-blue hover:no-underline hover:scale-110 transition-all text-lg'>
            Press kit
          </a>
        </nav>
        <nav className='flex justify-center items-center flex-col mr-2'>
          <header className='text-white font-medium text-2xl'>Legal</header>
          <a className='link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg'>
            Terms of use
          </a>
          <a
            href='https://github.com/digitomize/digitomize/blob/main/LICENSE'
            className='link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg'
          >
            License
          </a>
          <a className='link link-hover hover:hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg'>
            Cookie policy
          </a>
        </nav>
      </div>
    </footer>
  )
}
