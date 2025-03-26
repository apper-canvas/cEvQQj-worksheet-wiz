import { motion } from 'framer-motion'
import { FileText, Calendar, Book, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWorksheets } from '../context/WorksheetContext'

const WorksheetCard = ({ worksheet }) => {
  const { deleteWorksheet } = useWorksheets()
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card h-full flex flex-col"
    >
      <div className="bg-gradient p-4 text-white">
        <h3 className="font-bold text-lg truncate">{worksheet.worksheetName}</h3>
        <div className="flex items-center text-white/80 text-sm mt-1">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(worksheet.createdAt)}</span>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-center text-surface-600 dark:text-surface-300 mb-3">
          <Book size={16} className="mr-2" />
          <span className="font-medium">Grade {worksheet.grade} {worksheet.subject}</span>
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Topics:</h4>
          <div className="flex flex-wrap gap-1">
            {worksheet.selectedTopics.map(topic => (
              <span 
                key={topic} 
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Question Types:</h4>
          <div className="flex flex-wrap gap-1">
            {worksheet.selectedQuestionTypes.map(type => (
              <span 
                key={type} 
                className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-surface-600 dark:text-surface-400 text-sm mt-3">
          <FileText size={14} className="inline mr-1" />
          <span>{worksheet.questionCount} questions</span>
        </div>
      </div>
      
      <div className="border-t border-surface-200 dark:border-surface-700 p-4 flex justify-between">
        <Link to={`/worksheets/${worksheet.id}`}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            <Eye size={16} className="mr-2" />
            View
          </motion.button>
        </Link>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => deleteWorksheet(worksheet.id)}
          className="btn btn-outline text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 size={16} className="mr-2" />
          Delete
        </motion.button>
      </div>
    </motion.div>
  )
}

export default WorksheetCard