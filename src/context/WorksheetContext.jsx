import { createContext, useContext, useState, useEffect } from 'react'

const WorksheetContext = createContext()

export function useWorksheets() {
  return useContext(WorksheetContext)
}

export function WorksheetProvider({ children }) {
  const [worksheets, setWorksheets] = useState(() => {
    const savedWorksheets = localStorage.getItem('worksheets')
    return savedWorksheets ? JSON.parse(savedWorksheets) : []
  })

  useEffect(() => {
    localStorage.setItem('worksheets', JSON.stringify(worksheets))
  }, [worksheets])

  const addWorksheet = (worksheet) => {
    const newWorksheet = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...worksheet
    }
    setWorksheets(prev => [newWorksheet, ...prev])
    return newWorksheet.id
  }

  const getWorksheet = (id) => {
    return worksheets.find(worksheet => worksheet.id === id)
  }

  const deleteWorksheet = (id) => {
    setWorksheets(prev => prev.filter(worksheet => worksheet.id !== id))
  }

  const value = {
    worksheets,
    addWorksheet,
    getWorksheet,
    deleteWorksheet
  }

  return (
    <WorksheetContext.Provider value={value}>
      {children}
    </WorksheetContext.Provider>
  )
}