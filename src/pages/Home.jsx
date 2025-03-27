import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Lightbulb, BarChart3, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [activeTab, setActiveTab] = useState('create')
  
  const tabs = [
    { id: 'create', label: 'Create Worksheets', icon: <BookOpen size={20} /> },
    { id: 'solve', label: 'Solve Worksheets', icon: <Lightbulb size={20} /> },
    { id: 'analyze', label: 'Performance Analysis', icon: <BarChart3 size={20} /> }
  ]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            CBSE Worksheets & Assessments
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
            Create subject-wise topic-based worksheets for CBSE students in grades 1-10. 
            Evaluate performance and get personalized improvement suggestions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8" role="tablist" aria-label="Worksheet features">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient text-white shadow-lg' 
                    : 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'create' && (
            <div id="panel-create" role="tabpanel" aria-labelledby="tab-create">
              <MainFeature />
            </div>
          )}
          
          {activeTab === 'solve' && (
            <div id="panel-solve" role="tabpanel" aria-labelledby="tab-solve" className="card p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Solve Interactive Worksheets</h2>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                Access and complete assigned worksheets online with real-time feedback.
              </p>
              <div className="flex justify-center">
                <Link 
                  to="/worksheets"
                  className="btn btn-primary inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="View and access your assigned worksheets"
                >
                  <span>Access My Worksheets</span>
                  <ArrowRight size={18} className="ml-2" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
          
          {activeTab === 'analyze' && (
            <div id="panel-analyze" role="tabpanel" aria-labelledby="tab-analyze" className="card p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                View detailed performance reports and get personalized improvement suggestions.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/analytics"
                  className="btn btn-primary inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="View your performance analytics and reports"
                >
                  <span>View My Performance</span>
                  <ArrowRight size={18} className="ml-2" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Home