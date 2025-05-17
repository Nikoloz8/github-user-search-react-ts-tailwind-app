import { useEffect, useState } from "react"

export default function AppLogics() {


    async function githubFetch(name: string = "octocat") {
        try {
            let response = await fetch(`https://api.github.com/users/${name}`)

            if (!response.ok) {
                throw new Error("Response Error!")
            }

            let data = await response.json()
            return data

        } catch (e) {
            console.log(e)
            return null
        }
    }


    const [info, setInfo] = useState({
        name: "",
        joinDate: "",
        login: "",
        imageUrl: "",
        repoCount: "",
        followersCount: "",
        followingsCount: "",
        bio: "",
        location: "",
        blog: "",
        twitter: "",
        company: ""
    })

    function toMonth(num: string) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        const monthIndex = parseInt(num, 10) - 1
        return months[monthIndex]
    }

    const [notFound, setNotFound] = useState(false)

    async function gitFetch(name: string = "octocat") {
        const user = await githubFetch(name.trim())
        if (!user.name) {
            setNotFound(true)
            return
        }

        setNotFound(false)

        let date = user.created_at.split("-")
        setInfo({ name: user.name, joinDate: `Joined ${date[2].slice(0, 2)} ${toMonth(date[1]).slice(0, 3)} ${date[0]}`, login: user.login, imageUrl: user.avatar_url, repoCount: user.public_repos, followersCount: user.followers, followingsCount: user.following, bio: user.bio, location: user.location, blog: user.blog, twitter: user.twitter_username, company: user.company })
    }


    useEffect(() => { gitFetch("octocat") }, [])

    const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

    useEffect(() => {
        const handleSize = () => setIsMobile(window.innerWidth < 640)
        window.addEventListener("resize", handleSize)
        return () => window.removeEventListener("resize", handleSize)
    }, [])

    const [name, setName] = useState("octocat")

    const [theme, setTheme] = useState(true)

    
    return {
        theme,
        setTheme,
        name,
        setName,
        isMobile,
        info,
        notFound,
        gitFetch,
    }
}
