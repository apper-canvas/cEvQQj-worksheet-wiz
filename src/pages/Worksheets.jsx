import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Search, Filter, AlertTriangle } from 'lucide-react'
import { useWorksheets } from '../context/WorksheetContext'
import WorksheetCard from '../components/WorksheetCard'

const Worksheets = () => {
  const { worksheets } = useWorksheets()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  // Get unique grades and subjects for filters
  const grades = [...new Set(worksheets.map(ws => ws.grade))].sort((a, b) => a - b)
  const subjects = [...new Set(worksheets.map(ws => ws.subject))].filter(Boolean)

  // Filter worksheets based on search query and filters
  const filteredWorksheets = worksheets.filter(worksheet => {
    const matchesSearch = worksheet.worksheetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worksheet.selectedTopics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesGrade = selectedGrade ? worksheet.grade.toString() === selectedGrade : true
    const matchesSubject = selectedSubject ? worksheet.subject === selectedSubject : true
    
    return matchesSearch && matchesGrade && matchesSubject
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 text-gradient">My Generated Worksheets</h1>
        <p className="text-surface-600 dark:text-surface-300">
          Access and view all your previously created worksheets
        </p>
      </motion.div>

      <div className="card p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-surface-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search worksheets"
              className="input-field pl-10"
            />
          </div>
          
          {/* Grade Filter */}
          <div className="relative">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="input-field appearance-none"
            >
              <option value="">All Grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter size={18} className="text-surface-400" />
            </div>
          </div>
          
          {/* Subject Filter */}
          <div className="relative">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input-field appearance-none"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter size={18} className="text-surface-400" />
            </div>
          </div>
        </div>
      </div>

      {worksheets.length === 0 ? (
        <div className="card-neu p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-surface-200 dark:bg-surface-700 rounded-full flex items-center justify-center mb-4">
            <FileText size={32} className="text-surface-400 dark:text-surface-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Worksheets Yet</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            You haven't created any worksheets yet. Go to the Create tab to generate your first worksheet!
          </p>
        </div>
      ) : filteredWorksheets.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-surface-200 dark:bg-surface-700 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} className="text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Matching Worksheets</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            No worksheets match your current search criteria.
          </p>
          <button 
            onClick={() => {
              setSearchQuery('')
              setSelectedGrade('')
              setSelectedSubject('')
            }}
            className="btn btn-outline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredWorksheets.map(worksheet => (
              <WorksheetCard key={worksheet.id} worksheet={worksheet} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default Worksheets