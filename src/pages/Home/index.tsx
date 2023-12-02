import { Link } from "react-router-dom"
import { APP_INFO } from "content/app-info"
const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <img src={APP_INFO.app_image} alt="Hero Image" className="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 className="text-5xl font-bold">Welcome to {APP_INFO.app_name}!</h1>
        <p className="py-6">{APP_INFO.app_description}</p>
        <Link to={APP_INFO.app_cta_url} className="btn btn-primary">{APP_INFO.app_cta}</Link>
      </div>
    </div>
  </div>
  )
}

export default Home