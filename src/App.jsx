import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun, File, Plus, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Worksheets from './pages/Worksheets'
import WorksheetView from './pages/WorksheetView'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const location = useLocation()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const navItems = [
    { path: '/', label: 'Create', icon: <Plus size={18} /> },
    { path: '/worksheets', label: 'My Worksheets', icon: <File size={18} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> }
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
              W
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              WorksheetWiz
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-surface-100 dark:bg-surface-700 font-medium'
                    : 'hover:bg-surface-50 dark:hover:bg-surface-800'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-around">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 text-sm ${
                  isActive(item.path)
                    ? 'text-primary font-medium'
                    : 'text-surface-600 dark:text-surface-400'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/worksheets" element={<Worksheets />} />
          <Route path="/worksheets/:id" element={<WorksheetView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6 print:hidden">
        <div className="container mx-auto px-4 text-center text-surface-600 dark:text-surface-400 text-sm">
          <p>© {new Date().getFullYear()} WorksheetWiz. All rights reserved.</p>
          <p className="mt-1">A comprehensive educational platform for CBSE students in grades 1-10.</p>
        </div>
      </footer>
    </div>
  )
}

export default App