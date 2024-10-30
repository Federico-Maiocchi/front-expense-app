import { useState } from "react";
import "../sass/navbar.scss";

function Navbar({ toggleSidebarSize }) {
  // Stato per gestire l'apertura/chiusura full screen
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Funzione per entrare/uscire dalla modalità full-screen
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // Entra in full-screen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // Esci dal full-screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }

    // Cambia lo stato
    setIsFullScreen(!isFullScreen);
  };

  return (
    <nav>
      <ul className="flex justify-between items-center gap-5">
        <li onClick={toggleSidebarSize} style={{ cursor: "pointer" }} aria-label="Toggle Sidebar">
          <i className="fa-solid fa-bars"></i>
          {/* Icona per ridurre/espandere */}
        </li>
        <li onClick={toggleFullScreen} style={{ cursor: "pointer" }} aria-label="Toggle Full Screen">
          {/* Cambia l'icona se siamo in full-screen */}
          <i
            className={`fa-solid ${
              isFullScreen ? "fa-minimize" : "fa-maximize"
            }`}
          ></i>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;


// import { useState } from "react";
// import "../sass/navbar.scss";


// function Navbar({ toggleSidebarSize }) {

//   // Stato per gestire l'apertura/chiusura full screen
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   // Funzione per entrare/uscire dalla modalità full-screen
//   const toggleFullScreen = () => {
//     if (!isFullScreen) {
//       // Entra in full-screen
//       if (document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//       } else if (document.documentElement.mozRequestFullScreen) {
//         // Firefox
//         document.documentElement.mozRequestFullScreen();
//       } else if (document.documentElement.webkitRequestFullscreen) {
//         // Chrome, Safari and Opera
//         document.documentElement.webkitRequestFullscreen();
//       } else if (document.documentElement.msRequestFullscreen) {
//         // IE/Edge
//         document.documentElement.msRequestFullscreen();
//       }
//     } else {
//       // Esci dal full-screen
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         // Firefox
//         document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         // Chrome, Safari and Opera
//         document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         // IE/Edge
//         document.msExitFullscreen();
//       }
//     }

//     // Cambia lo stato
//     setIsFullScreen(!isFullScreen);
//   };

//   return (
//     <nav>
//       <ul className="flex justify-between items-center gap-5">
//         <li onClick={toggleSidebarSize} style={{ cursor: "pointer" }}>
//           <i className="fa-solid fa-bars"></i>{" "}
//           {/* Icona per ridurre/espandere */}
//         </li>
//         {/* <li>nav bar</li> */}
//         {/*full screen apertura chiusura*/}
//         <li onClick={toggleFullScreen} style={{ cursor: "pointer" }}>
//           {/* Cambia l'icona se siamo in full-screen */}
//           <i
//             className={`fa-solid ${
//               isFullScreen ? "fa-minimize" : "fa-maximize"
//             }`}
//           ></i>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
