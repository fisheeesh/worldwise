import { useContext } from "react"
import { AuthContext } from "../contexts/FakeAuthContextProvider"

const useFakeAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) throw new Error('useApp must be used within a AppContextProvider')

    return context
}

export default useFakeAuth