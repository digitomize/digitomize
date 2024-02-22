import Contests from "./components/Contests";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-zinc-900 App w-96 min-h-40 mx-auto rounded-xl">
      <Header />
      <Contests />
      <Footer />
    </div>
  );
}

export default App;