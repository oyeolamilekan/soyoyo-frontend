import { APPNAME } from "../config"
import { useSessionStorage } from "./useSession"

export const useAuth = () => {
    const { value: user } = useSessionStorage(APPNAME, '')
    if (user) {
        return true
    } else {
        return false
    }
}