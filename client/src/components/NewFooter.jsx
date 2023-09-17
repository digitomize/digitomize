import logo from "../assets/logo.png";
export default function Footer() {
  return (
    <footer className="footer p-10 text-base-content md:items-center max-md:grid-flow-col lowercase">
      <div className="footer justify-around">
              <aside>
                  <img
                      width="100"
                      height="100"
                src={logo}
                alt="logo"
                className="rounded-full"
              />
          {/* <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg> */}
          <p>
            <h2 className="text-base-content">Hey👋</h2>
            <h2 className="text-base-content">Loved ❤️ digitomize ?</h2>
            <h2 className="text-base-content">It’s open-source!</h2>
            <h2 className="text-base-content">
              Consider contributing <br/> on{" "}
              <a
                href="https://github.com/pranshugupta54/digitomize"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4DA9FF" }}
              >
                GitHub
              </a>
            </h2>
          </p>
        </aside>
        <nav>
          <header className="footer-title lowercase">social</header>
          <a href="https://www.linkedin.com/company/digitomize" className="link link-hover">linkedin</a>
          <a href="/discord" className="link link-hover">discord</a>
        </nav>
      </div>
      <div className="footer max-md:place-items-end justify-around md:self-start self-end">
        <nav className="place-items-end">
          <header className="footer-title lowercase">Company</header>
          <a href="/updates" className="link link-hover">Updates</a>
          <a href="/contact" className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav className="place-items-end">
          <header className="footer-title lowercase">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a href="https://github.com/digitomize/digitomize/blob/main/LICENSE" className="link link-hover">License</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
}