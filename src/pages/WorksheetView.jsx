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
  
  // Generate actual questions based on the worksheet configuration
  const generateQuestions = () => {
    const questions = []
    const types = worksheet.selectedQuestionTypes
    const topics = worksheet.selectedTopics
    const subject = worksheet.subject
    const grade = worksheet.grade
    
    // Question bank based on subject and topics
    const questionBank = {
      Mathematics: {
        'Algebra': [
          {
            type: 'Multiple Choice',
            text: 'If 3x + 7 = 22, what is the value of x?',
            options: ['3', '5', '7', '9']
          },
          {
            type: 'Fill in the Blanks',
            text: 'The solution to the equation 2x - 3 = 11 is x = _______.'
          },
          {
            type: 'Short Answer',
            text: 'Solve for x: 5x - 2 = 3x + 6'
          },
          {
            type: 'True/False',
            text: 'The equation x² = 9 has exactly one solution.'
          },
          {
            type: 'Long Answer',
            text: 'Solve the system of equations: 2x + y = 7 and 3x - 2y = 1. Show all your work.'
          }
        ],
        'Geometry': [
          {
            type: 'Multiple Choice',
            text: 'The sum of the interior angles of a triangle is:',
            options: ['90°', '180°', '270°', '360°']
          },
          {
            type: 'Fill in the Blanks',
            text: 'A quadrilateral with exactly one pair of parallel sides is called a _______.'
          },
          {
            type: 'Short Answer',
            text: 'Find the area of a circle with radius 5 cm. Use π = 3.14.'
          },
          {
            type: 'True/False',
            text: 'All squares are rectangles.'
          },
          {
            type: 'Match the Following',
            columnA: ['Triangle', 'Square', 'Rectangle', 'Circle'],
            columnB: ['3 sides', '4 equal sides', 'area = πr²', '4 sides with equal opposite sides']
          }
        ],
        'Fractions': [
          {
            type: 'Multiple Choice',
            text: 'What is 1/3 + 1/6?',
            options: ['1/2', '2/9', '1/9', '3/6']
          },
          {
            type: 'Fill in the Blanks',
            text: 'The simplified form of 8/12 is _______.'
          },
          {
            type: 'Short Answer',
            text: 'Calculate 2/3 ÷ 1/4.'
          },
          {
            type: 'True/False',
            text: '3/5 is greater than 7/10.'
          }
        ],
        'Decimals': [
          {
            type: 'Multiple Choice',
            text: 'Which decimal is equal to 3/4?',
            options: ['0.25', '0.5', '0.75', '0.8']
          },
          {
            type: 'Fill in the Blanks',
            text: '0.125 expressed as a fraction in lowest terms is _______.'
          },
          {
            type: 'Short Answer',
            text: 'Arrange the following decimals in ascending order: 0.25, 0.5, 0.125, 0.75'
          }
        ]
      },
      Science: {
        'Physics': [
          {
            type: 'Multiple Choice',
            text: 'Which of the following is the SI unit of force?',
            options: ['Joule', 'Newton', 'Watt', 'Pascal']
          },
          {
            type: 'Fill in the Blanks',
            text: 'The formula for calculating speed is distance divided by _______.'
          },
          {
            type: 'True/False',
            text: 'Mass and weight are the same physical quantity.'
          },
          {
            type: 'Long Answer',
            text: 'Explain Newton\'s three laws of motion with examples.'
          }
        ],
        'Chemistry': [
          {
            type: 'Multiple Choice',
            text: 'Which of the following is NOT a state of matter?',
            options: ['Solid', 'Liquid', 'Gas', 'Energy']
          },
          {
            type: 'Fill in the Blanks',
            text: 'The process by which a solid changes directly into a gas is called _______.'
          },
          {
            type: 'Match the Following',
            columnA: ['Oxygen', 'Hydrogen', 'Carbon', 'Nitrogen'],
            columnB: ['O', 'H', 'C', 'N']
          },
          {
            type: 'Short Answer',
            text: 'Write the chemical formula for water and explain its composition.'
          }
        ],
        'Biology': [
          {
            type: 'Multiple Choice',
            text: 'Which organelle is known as the "powerhouse of the cell"?',
            options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic reticulum']
          },
          {
            type: 'Fill in the Blanks',
            text: 'The process by which plants make their own food using sunlight is called _______.'
          },
          {
            type: 'True/False',
            text: 'Humans have 23 pairs of chromosomes.'
          },
          {
            type: 'Long Answer',
            text: 'Describe the process of digestion in humans, starting from the mouth to the large intestine.'
          }
        ]
      },
      English: {
        'Grammar': [
          {
            type: 'Multiple Choice',
            text: 'Which of the following is an example of a proper noun?',
            options: ['City', 'London', 'River', 'Mountain']
          },
          {
            type: 'Fill in the Blanks',
            text: 'The past tense of the verb "go" is _______.'
          },
          {
            type: 'True/False',
            text: 'Adverbs can modify verbs, adjectives, and other adverbs.'
          },
          {
            type: 'Match the Following',
            columnA: ['Noun', 'Verb', 'Adjective', 'Adverb'],
            columnB: ['Person, place, or thing', 'Action or state', 'Describes a noun', 'Describes a verb']
          }
        ],
        'Comprehension': [
          {
            type: 'Short Answer',
            text: 'Read the following passage and answer the question: "The sun was setting behind the mountains, casting long shadows across the valley. The birds were returning to their nests, singing their evening songs." What time of day is described in the passage?'
          },
          {
            type: 'Multiple Choice',
            text: 'Based on the following sentence, what does "eccentric" most likely mean? "The eccentric old man wore mismatched socks and talked to his pet rocks."',
            options: ['Wealthy', 'Unusual', 'Friendly', 'Intelligent']
          },
          {
            type: 'Long Answer',
            text: 'Read the following poem and explain its theme and the literary devices used:\n\n"The road not taken, the path less traveled by,\nHas made all the difference in my life.\nTwo paths diverged in a yellow wood,\nAnd I, I took the one less traveled by."'
          }
        ]
      },
      'Social Studies': {
        'History': [
          {
            type: 'Multiple Choice',
            text: 'Who was the first Prime Minister of India?',
            options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Patel', 'Subhas Chandra Bose']
          },
          {
            type: 'Fill in the Blanks',
            text: 'The Indian Independence Act was passed in the year _______.'
          },
          {
            type: 'True/False',
            text: 'The Quit India Movement was launched in 1942.'
          },
          {
            type: 'Long Answer',
            text: 'Describe the role of Mahatma Gandhi in India\'s freedom struggle and his philosophy of non-violence.'
          }
        ],
        'Geography': [
          {
            type: 'Multiple Choice',
            text: 'Which is the longest river in India?',
            options: ['Ganga', 'Brahmaputra', 'Yamuna', 'Godavari']
          },
          {
            type: 'Fill in the Blanks',
            text: 'The Tropic of _______ passes through the middle of India.'
          },
          {
            type: 'Match the Following',
            columnA: ['Mumbai', 'Kolkata', 'Chennai', 'Delhi'],
            columnB: ['West coast', 'Eastern coast', 'Capital city', 'Ganges Delta']
          },
          {
            type: 'Short Answer',
            text: 'Name the major climate zones of India and their characteristics.'
          }
        ]
      }
    }
    
    // Generate a mix of questions based on the selected topics and types
    for (let i = 0; i < worksheet.questionCount; i++) {
      const type = types[i % types.length]
      const topic = topics[i % topics.length]
      
      // If we have questions for this subject and topic
      if (questionBank[subject] && questionBank[subject][topic]) {
        // Filter by question type
        const availableQuestions = questionBank[subject][topic].filter(q => q.type === type)
        
        if (availableQuestions.length > 0) {
          // Select a question (with rotation to avoid repetition)
          const questionTemplate = availableQuestions[i % availableQuestions.length]
          
          questions.push({
            id: `q${i+1}`,
            type,
            topic,
            text: questionTemplate.text,
            options: questionTemplate.options,
            columnA: questionTemplate.columnA,
            columnB: questionTemplate.columnB
          })
        } else {
          // Fallback if no matching question type
          questions.push({
            id: `q${i+1}`,
            type,
            topic,
            text: `${type} question about ${topic} (${subject}, Grade ${grade})`
          })
        }
      } else {
        // Fallback if no questions for this subject/topic
        questions.push({
          id: `q${i+1}`,
          type,
          topic,
          text: `${type} question about ${topic} (${subject}, Grade ${grade})`
        })
      }
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
                    
                    {question.type === 'Multiple Choice' && question.options && (
                      <div className="mt-2 space-y-2">
                        {['A', 'B', 'C', 'D'].map((option, idx) => (
                          idx < question.options.length && (
                            <div key={option} className="flex items-center">
                              <div className="w-5 h-5 rounded-full border border-surface-400 print:border-black flex items-center justify-center mr-2 print:mr-1">
                                {option}
                              </div>
                              <span>{question.options[idx]}</span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'Fill in the Blanks' && (
                      <div className="mt-2">
                        {question.text}
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
                    
                    {question.type === 'Match the Following' && question.columnA && question.columnB && (
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-medium mb-2">Column A</div>
                          <ul className="space-y-2">
                            {question.columnA.map((item, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="mr-2">{idx + 1}.</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium mb-2">Column B</div>
                          <ul className="space-y-2">
                            {question.columnB.map((item, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="mr-2">{String.fromCharCode(65 + idx)}.</span>
                                <span>{item}</span>
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