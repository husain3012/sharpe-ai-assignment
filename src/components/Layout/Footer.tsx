import { APP_INFO } from 'content/app-info'
const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
    <aside>
      <p>{APP_INFO.app_name}  - {new Date().getFullYear()}</p>
    </aside>
  </footer>
  )
}

export default Footer