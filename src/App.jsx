import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import "./sass/app.scss";
//componenti
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BodyApp from "./components/BodyApp";

//api
import { useGetPostsQuery } from "./redux/Api/apiProva";
import { useGetCategoriesQuery } from "./redux/Api/apiCategories";

function App() {
  //ridurre la sidebar
  const [isSidebarReduced, setIsSidebarReduced] = useState(false);

  const toggleSidebarSize = () => {
    setIsSidebarReduced(!isSidebarReduced);
  };

  // const { data: posts, error, isLoading } = useGetPostsQuery();

  // console.log(posts);
  // if (isLoading) return <div>Caricamento in corso...</div>;
  // if (error) return <div>Errore durante il caricamento dei dati.</div>;
 
  

  return (
    <>
      <div className="app-container">
        {/* Passa lo stato della sidebar come prop */}
        <Sidebar isReduced={isSidebarReduced ? 'reduced' : ''}/>
        <div className="content-container">
        {/* Passa toggleSidebar alla navbar */}
        <Navbar toggleSidebarSize={toggleSidebarSize}/>
        <BodyApp />
      </div>
      </div>
    </>
  );
}

export default App;

{
  /* <div>


<a href="https://vitejs.dev" target="_blank">
  <img src={viteLogo} className="logo" alt="Vite logo" />
</a>
<a href="https://react.dev" target="_blank">
  <img src={reactLogo} className="logo react" alt="React logo" />
</a>
</div>
<h1>Vite + React</h1>
<div className="card">
<button onClick={() => setCount((count) => count + 1)}>
  count is {count}
</button>
<p>
  Edit <code>src/App.jsx</code> and save to test HMR
</p>
</div>
<p className="read-the-docs">
Click on the Vite and React logos to learn more
</p> */
}
