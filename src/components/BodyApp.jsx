import "../sass/bodyapp.scss";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

function BodyApp() {

  return (
    <div className="body-app">
      <Breadcrumb />
      <div className="center-app">
        <Outlet/>
      </div>
    </div>
  );
}

export default BodyApp;
