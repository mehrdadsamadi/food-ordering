import { useEffect, useState } from "react"

export const useProfile = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        fetch("/api/profile")
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setLoading(false)
            })
        
    }, [])

    return {user, loading}
}