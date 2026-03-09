import AppRoutes from './routes/AppRoutes'
import Header from './components/Header'
import Footer from './components/Footer'
import bgImage from './assets/images/background-score-keeper.jpg'
import './App.css'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="wrapper mainClass" style={{backgroundImage: `url(${bgImage})`}}>
    <Header />
    <AppRoutes />
    <Footer />
    </div>
  )
}

export default App
