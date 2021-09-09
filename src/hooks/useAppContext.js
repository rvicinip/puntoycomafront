import { useContext } from 'react'
import { AppContext } from 'contexts/AppContext.js'

export const useAppContext = () => {
    return useContext(AppContext)
}
