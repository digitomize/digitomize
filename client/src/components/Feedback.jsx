import { MetaData } from "./CustomComponents";
export default function Feedback() {
  return (
    <>
      <MetaData path="feedback" />
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
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading…
        </iframe>
      </div>
    </>
  );
}
