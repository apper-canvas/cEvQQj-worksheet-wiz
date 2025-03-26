import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  AlertTriangle,
  FileText,
  BookOpen,
  Calendar,
  CheckCircle2
} from 'lucide-react'
import { useWorksheets } from '../context/WorksheetContext'

const WorksheetView = () => {
  const { id } = useParams()
  const { getWorksheet } = useWorksheets()
  const navigate = useNavigate()
  const [worksheet, setWorksheet] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchWorksheet = () => {
      const foundWorksheet = getWorksheet(id)
      setWorksheet(foundWorksheet)
      setLoading(false)
    }
    
    fetchWorksheet()
  }, [id, getWorksheet])
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date)
  }
  
  const handlePrint = () => {
    window.print()
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-60 bg-surface-200 dark:bg-surface-700 rounded mb-4"></div>
          <div className="h-6 w-40 bg-surface-200 dark:bg-surface-700 rounded"></div>
        </div>
      </div>
    )
  }
  
  if (!worksheet) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="card-neu p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Worksheet Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            The worksheet you're looking for doesn't exist or has been deleted.
          </p>
          <Link to="/worksheets" className="btn btn-primary">
            <ArrowLeft size={18} className="mr-2" />
            Back to Worksheets
          </Link>
        </div>
      </div>
    )
  }
  
  // Generate some placeholder questions based on the worksheet configuration
  const generateQuestions = () => {
    const questions = []
    const types = worksheet.selectedQuestionTypes
    const topics = worksheet.selectedTopics
    
    for (let i = 0; i < worksheet.questionCount; i++) {
      const type = types[i % types.length]
      const topic = topics[i % topics.length]
      
      questions.push({
        id: `q${i+1}`,
        type,
        topic,
        text: `Sample ${type} question about ${topic} (${worksheet.subject}, Grade ${worksheet.grade})`
      })
    }
    
    return questions
  }
  
  const questions = generateQuestions()
  
  return (
    <div className="container mx-auto px-4 py-8 print:py-0 print:px-0">
      <div className="mb-6 print:hidden">
        <button 
          onClick={() => navigate('/worksheets')}
          className="btn btn-outline mb-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Worksheets
        </button>
        
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <h1 className="text-3xl font-bold text-gradient">{worksheet.worksheetName}</h1>
          
          <div className="flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="btn btn-outline"
            >
              <Printer size={18} className="mr-2" />
              Print
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
            >
              <Download size={18} className="mr-2" />
              Download PDF
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="card print:border-none print:shadow-none p-6 print:p-0">
        {/* Worksheet Header - will show on print */}
        <div className="border-b border-surface-200 dark:border-surface-700 print:border-black pb-4 mb-6">
          <div className="print:text-black">
            <h1 className="text-2xl font-bold mb-1 print:text-center">{worksheet.worksheetName}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 print:justify-center print:text-sm">
              <div className="flex items-center">
                <BookOpen size={16} className="mr-1 print:hidden" />
                <span>Grade {worksheet.grade} {worksheet.subject}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1 print:hidden" />
                <span>Created: {formatDate(worksheet.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <FileText size={16} className="mr-1 print:hidden" />
                <span>{worksheet.questionCount} Questions</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2 print:hidden">
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
        
        {/* Instructions - will show on print */}
        <div className="mb-6 print:text-black print:mb-4">
          <h2 className="font-bold text-lg mb-2 print:text-base">Instructions:</h2>
          <ul className="list-disc list-inside space-y-1 print:text-sm">
            <li>Answer all questions as per the given instructions.</li>
            <li>Each question carries equal marks unless specified otherwise.</li>
            <li>Write your answers in clear, legible handwriting.</li>
            <li>Time allowed: 45 minutes</li>
          </ul>
        </div>
        
        {/* Questions - will show on print */}
        <div className="print:text-black">
          <h2 className="font-bold text-lg mb-4 print:text-base">Questions:</h2>
          
          <div className="space-y-6 print:space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="print:text-sm">
                <div className="flex items-start">
                  <div className="font-bold mr-2">{index + 1}.</div>
                  <div>
                    <div className="font-medium">{question.text}</div>
                    
                    {question.type === 'Multiple Choice' && (
                      <div className="mt-2 space-y-2">
                        {['A', 'B', 'C', 'D'].map(option => (
                          <div key={option} className="flex items-center">
                            <div className="w-5 h-5 rounded-full border border-surface-400 print:border-black flex items-center justify-center mr-2 print:mr-1">
                              {option}
                            </div>
                            <span>Sample option {option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'Fill in the Blanks' && (
                      <div className="mt-2">
                        Complete the sentence: The {worksheet.subject} concept of ____________ is related to {question.topic}.
                      </div>
                    )}
                    
                    {question.type === 'True/False' && (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded border border-surface-400 print:border-black mr-2 print:mr-1"></div>
                          <span>True</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded border border-surface-400 print:border-black mr-2 print:mr-1"></div>
                          <span>False</span>
                        </div>
                      </div>
                    )}
                    
                    {question.type === 'Short Answer' && (
                      <div className="mt-2">
                        <div className="h-8 border-b border-surface-400 print:border-black"></div>
                      </div>
                    )}
                    
                    {question.type === 'Long Answer' && (
                      <div className="mt-2">
                        <div className="h-24 border-b border-surface-400 print:border-black"></div>
                      </div>
                    )}
                    
                    {question.type === 'Match the Following' && (
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-medium mb-2">Column A</div>
                          <ul className="space-y-2">
                            {[1, 2, 3, 4].map(num => (
                              <li key={num} className="flex items-center">
                                <span className="mr-2">{num}.</span>
                                <span>Item {num}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium mb-2">Column B</div>
                          <ul className="space-y-2">
                            {['P', 'Q', 'R', 'S'].map(letter => (
                              <li key={letter} className="flex items-center">
                                <span className="mr-2">{letter}.</span>
                                <span>Match {letter}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer - will show on print */}
        <div className="mt-10 pt-4 border-t border-surface-200 dark:border-surface-700 print:border-black text-center print:text-black">
          <div className="flex items-center justify-center print:text-sm">
            <CheckCircle2 size={16} className="mr-1 print:hidden" />
            <span>End of Worksheet</span>
          </div>
          <div className="text-xs text-surface-500 dark:text-surface-400 mt-1 print:text-black">
            Generated by WorksheetWiz - CBSE Educational Worksheet Generator
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorksheetView