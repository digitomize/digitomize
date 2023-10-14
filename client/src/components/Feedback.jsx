import { Helmet } from "react-helmet";

export default function Feedback() {
  const desc =
    `Share your thoughts and insights on our services through the feedback page, contributing to continuous improvement and better user satisfaction.`.toLowerCase();
  const title = `feedback | digitomize`;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content="feedback | digitomize" />
        <meta property="og:description" content={desc} />
        <meta name="description" content={desc} />
      </Helmet>
      <div
        className="text-center items-center"
        style={{
          textAlign: "center",
          color: "white",
          filter: "invert(1)",
          height: "600px",
        }}
      >
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSez2nBb6WMAZ-QVsPhMYilHx57TGrQKRIlozB6iBCkrqNH6ng/viewform?embedded=true"
          width="100%"
          height="100%"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
      </div>
    </>
  );
}
