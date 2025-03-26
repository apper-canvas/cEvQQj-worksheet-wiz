import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Plus, 
  X, 
  Check, 
  AlertCircle,
  ChevronDown,
  Sparkles
} from 'lucide-react'

// CBSE subjects by grade
const subjectsByGrade = {
  1: ["English", "Hindi", "Mathematics", "Environmental Studies", "Art Education"],
  2: ["English", "Hindi", "Mathematics", "Environmental Studies", "Art Education"],
  3: ["English", "Hindi", "Mathematics", "Environmental Studies", "Art Education"],
  4: ["English", "Hindi", "Mathematics", "Environmental Studies", "Art Education"],
  5: ["English", "Hindi", "Mathematics", "Environmental Studies", "Art Education"],
  6: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Sanskrit"],
  7: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Sanskrit"],
  8: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Sanskrit"],
  9: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Sanskrit", "Information Technology"],
  10: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Sanskrit", "Information Technology"]
}

// Sample topics by subject (simplified)
const topicsBySubject = {
  "Mathematics": [
    "Numbers and Number Systems", 
    "Addition and Subtraction", 
    "Multiplication and Division", 
    "Fractions", 
    "Decimals",
    "Geometry",
    "Measurement",
    "Data Handling",
    "Algebra",
    "Ratio and Proportion"
  ],
  "Science": [
    "Living and Non-living Things",
    "Plants and Animals",
    "Human Body",
    "Food and Nutrition",
    "Matter and Materials",
    "Force and Energy",
    "Earth and Space",
    "Environment and Ecology",
    "Light and Sound",
    "Electricity and Magnetism"
  ],
  "English": [
    "Reading Comprehension",
    "Grammar",
    "Writing Skills",
    "Vocabulary",
    "Literature",
    "Speaking and Listening",
    "Poetry",
    "Prose",
    "Creative Writing",
    "Formal Writing"
  ],
  // Add more subjects as needed
}

const questionTypes = [
  "Multiple Choice",
  "Fill in the Blanks",
  "Short Answer",
  "Long Answer",
  "Match the Following",
  "True/False"
]

const MainFeature = () => {
  const [grade, setGrade] = useState("")
  const [subject, setSubject] = useState("")
  const [topics, setTopics] = useState([])
  const [selectedTopics, setSelectedTopics] = useState([])
  const [questionCount, setQuestionCount] = useState(10)
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState([])
  const [worksheetName, setWorksheetName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false)
  const [isQuestionTypeDropdownOpen, setIsQuestionTypeDropdownOpen] = useState(false)

  // Update available topics when subject changes
  useEffect(() => {
    if (subject && topicsBySubject[subject]) {
      setTopics(topicsBySubject[subject])
    } else {
      setTopics([])
    }
    setSelectedTopics([])
  }, [subject])

  // Reset subject when grade changes
  useEffect(() => {
    setSubject("")
  }, [grade])

  const handleTopicToggle = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic))
    } else {
      setSelectedTopics([...selectedTopics, topic])
    }
  }

  const handleQuestionTypeToggle = (type) => {
    if (selectedQuestionTypes.includes(type)) {
      setSelectedQuestionTypes(selectedQuestionTypes.filter(t => t !== type))
    } else {
      setSelectedQuestionTypes([...selectedQuestionTypes, type])
    }
  }

  const validateForm = () => {
    if (!grade) {
      setError("Please select a grade")
      return false
    }
    if (!subject) {
      setError("Please select a subject")
      return false
    }
    if (selectedTopics.length === 0) {
      setError("Please select at least one topic")
      return false
    }
    if (selectedQuestionTypes.length === 0) {
      setError("Please select at least one question type")
      return false
    }
    if (!worksheetName.trim()) {
      setError("Please enter a worksheet name")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false)
        setGrade("")
        setSubject("")
        setSelectedTopics([])
        setQuestionCount(10)
        setSelectedQuestionTypes([])
        setWorksheetName("")
      }, 3000)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-neu p-8 relative overflow-visible">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient text-white rounded-full p-3 shadow-lg">
          <FileText size={24} />
        </div>
        
        <h2 className="text-2xl font-bold text-center mt-4 mb-6">Create Custom Worksheet</h2>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg p-3 mb-6 flex items-center"
            >
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Grade Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                Grade Level
              </label>
              <div className="relative">
                <select 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="input-field appearance-none pr-10"
                >
                  <option value="">Select Grade</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                    <option key={g} value={g}>Grade {g}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-surface-500">
                  <GraduationCap size={18} />
                </div>
              </div>
            </div>
            
            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                Subject
              </label>
              <div className="relative">
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={!grade}
                  className="input-field appearance-none pr-10"
                >
                  <option value="">Select Subject</option>
                  {grade && subjectsByGrade[grade]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-surface-500">
                  <BookOpen size={18} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Topics Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              Topics
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                disabled={!subject}
                className="input-field text-left flex items-center justify-between"
              >
                <span className={!selectedTopics.length ? "text-surface-400" : ""}>
                  {selectedTopics.length 
                    ? `${selectedTopics.length} topic${selectedTopics.length !== 1 ? 's' : ''} selected` 
                    : "Select topics"}
                </span>
                <ChevronDown size={18} className={`transition-transform ${isTopicDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isTopicDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  >
                    {topics.length > 0 ? (
                      topics.map(topic => (
                        <div 
                          key={topic}
                          onClick={() => handleTopicToggle(topic)}
                          className="flex items-center px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer"
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                            selectedTopics.includes(topic) 
                              ? 'bg-primary border-primary' 
                              : 'border-surface-300 dark:border-surface-600'
                          }`}>
                            {selectedTopics.includes(topic) && <Check size={14} className="text-white" />}
                          </div>
                          <span>{topic}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-surface-500">No topics available</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Selected Topics Pills */}
            {selectedTopics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedTopics.map(topic => (
                  <motion.div
                    key={topic}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center"
                  >
                    <span>{topic}</span>
                    <button 
                      type="button"
                      onClick={() => handleTopicToggle(topic)}
                      className="ml-1 p-1 rounded-full hover:bg-primary/20"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Question Count */}
            <div>
              <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                Number of Questions
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                className="input-field"
              />
            </div>
            
            {/* Question Types */}
            <div>
              <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
                Question Types
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsQuestionTypeDropdownOpen(!isQuestionTypeDropdownOpen)}
                  className="input-field text-left flex items-center justify-between"
                >
                  <span className={!selectedQuestionTypes.length ? "text-surface-400" : ""}>
                    {selectedQuestionTypes.length 
                      ? `${selectedQuestionTypes.length} type${selectedQuestionTypes.length !== 1 ? 's' : ''} selected` 
                      : "Select question types"}
                  </span>
                  <ChevronDown size={18} className={`transition-transform ${isQuestionTypeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isQuestionTypeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg"
                    >
                      {questionTypes.map(type => (
                        <div 
                          key={type}
                          onClick={() => handleQuestionTypeToggle(type)}
                          className="flex items-center px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer"
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                            selectedQuestionTypes.includes(type) 
                              ? 'bg-primary border-primary' 
                              : 'border-surface-300 dark:border-surface-600'
                          }`}>
                            {selectedQuestionTypes.includes(type) && <Check size={14} className="text-white" />}
                          </div>
                          <span>{type}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Selected Question Types Pills */}
              {selectedQuestionTypes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedQuestionTypes.map(type => (
                    <motion.div
                      key={type}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-secondary/10 text-secondary rounded-full px-3 py-1 text-sm flex items-center"
                    >
                      <span>{type}</span>
                      <button 
                        type="button"
                        onClick={() => handleQuestionTypeToggle(type)}
                        className="ml-1 p-1 rounded-full hover:bg-secondary/20"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Worksheet Name */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              Worksheet Name
            </label>
            <input
              type="text"
              value={worksheetName}
              onChange={(e) => setWorksheetName(e.target.value)}
              placeholder="Enter a name for your worksheet"
              className="input-field"
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isGenerating || success}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`btn ${
                success 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gradient'
              } text-white px-8 py-3 rounded-xl font-medium shadow-lg disabled:opacity-70`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : success ? (
                <>
                  <Check size={20} className="mr-2" />
                  Worksheet Created!
                </>
              ) : (
                <>
                  <Plus size={20} className="mr-2" />
                  Create Worksheet
                </>
              )}
            </motion.button>
          </div>
        </form>
        
        {/* Success Animation */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ 
                    scale: [0.5, 1.2, 1],
                    opacity: [0, 1, 1]
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4"
                >
                  <Sparkles size={40} className="text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Worksheet Created!</h3>
                <p className="text-surface-600 dark:text-surface-300">
                  Your worksheet has been generated successfully.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MainFeature