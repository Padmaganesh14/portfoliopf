import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-darker text-main min-h-screen">
      {/* Navbar (includes scroll progress bar) */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}

export default App
