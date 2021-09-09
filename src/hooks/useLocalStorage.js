import { useContext } from 'react'
import ManejadorStorage from 'services/ManejadorStorage'

export const useLocalStorage = () => {
    return useContext(AppContext)
}
