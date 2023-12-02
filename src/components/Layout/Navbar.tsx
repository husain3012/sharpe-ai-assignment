import { APP_INFO } from "content/app-info"
import { NAV_LINKS } from "./content"
import { Link } from "react-router-dom"



const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <Link to={'/'} className="btn btn-ghost text-xl">{APP_INFO.app_name}</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        {NAV_LINKS.map((item) => (
          <li key={item.name}>
            <Link to={item.link}>{item.name}</Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default Navbar