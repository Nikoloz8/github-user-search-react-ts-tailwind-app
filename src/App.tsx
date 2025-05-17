import { useEffect, useState } from 'react'
import './App.css'
import AppSVGS from './components/AppSVGS'

function App() {


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

  const [theme, setTheme] = useState(false)

  const { sunSVG, companySVG, locationSVG, twitterSVG, websiteSVG, moonSVG } = AppSVGS(theme)

  const textPreset1 = "font-[700] text-[2.6rem] leading-[100%] text-[#FFFFFF]"
  const textPreset2 = `${textPreset1} font-[400]! text-[1.5rem]!`

  return (
    <>
      <div className={`min-w-[100vw] min-h-[100vh] flex items-center justify-center bg-[#141D2F] ${!theme ? "bg-[#F6F8FF]" : ""} max-md:p-[30px]`}>
        <div className='w-[800px] flex flex-col gap-[30px]'>
          <div className='flex justify-between'>
            <h2 className={`${textPreset1} ${!theme ? "text-[#222731]!" : ""}`}>devfinder</h2>
            <h3 className={`flex gap-[10px] items-center justify-center ${textPreset1} text-[1.3rem]! text-[#FFFFFF] tracking-[2.5px]! cursor-pointer ${!theme ? "text-[#697C9A]!" : ""} `} onClick={() => setTheme(!theme)}>{theme ? `LIGHT` : `DARK`}{theme ? sunSVG : moonSVG}</h3>
          </div>
          <label htmlFor='searchInput' className={`w-[100%] p-[10px_10px_10px_30px]! flex items-center rounded-[15px] cursor-pointer justify-between bg-[#1E2A47]  ${!theme ? "bg-[#FEFEFE]! shadow-[0_16px_30px_-10px_#4660BB33]" : ""}`}>
            <div className='flex gap-[20px]'>
              <img src="/images/icon-search.svg" alt="" />
              <input onKeyDown={(e) => {
                if (e.key === "Enter") {
                  name ? gitFetch(name) : gitFetch("octocat");
                }
              }} onChange={(e) => setName(e.target.value)} placeholder={isMobile ? "Search" : "Search GitHub username…"} id='searchInput' name='searchInput' className={`caret-[#0079FF] placeholder:font-[400] placeholder:text-[1.8rem] placeholder:leading-[25px] placeholder:text-[#ffffff] outline-none font-[400] max-sm:w-[50%]! leading-[25px] text-[1.8rem] text-[#ffffff] w-[300px] ${!theme ? "placeholder:text-[#4B6A9B]!" : ""}`} type="text" />
            </div>
            <div className='flex items-center gap-[25px]'>
              <p className={`${textPreset1} text-[#F74646]! text-[1.5rem]!  ${notFound ? "flex!" : "hidden"}`}>No results</p>
              <button onClick={() => {
                name ? gitFetch(name.trim()) : gitFetch("octocat")
              }} className={`w-[106px] h-[50px] cursor-pointer bg-[#0079FF] hover:bg-[#60ABFF] outline-none rounded-[10px] ${textPreset1} text-[1.6rem]!`}>Search</button>
            </div>
          </label>
          <div className={`p-[50px]! max-sm:gap-[50px] max-sm:flex-col max-sm:items-center max-sm:justify-center w-[100%] bg-[#1E2A47] flex rounded-[15px] ${!theme ? "bg-[#FEFEFE]! shadow-[0_16px_30px_-10px_#4660BB33]" : ""}`}>
            <img className={`w-[120px] max-sm:m-0! h-[120px] mr-[50px] rounded-[100%]`} src={info.imageUrl ? info.imageUrl : undefined} alt="" />
            <div className='w-[100%] flex max-sm:items-center max-sm:justify-center  flex-col gap-[30px]'>
              <div className='flex justify-between max-md:flex-col max-md:gap-[8px]!'>
                <div className='flex flex-col gap-[8px]'>
                  <h1 className={`${textPreset1} ${!theme ? "text-[#2B3442]!" : ""} `}>{info.name}</h1>
                  <h5 className={`${textPreset2} text-[1.6rem]! text-[#0079FF]!`}>@{info.login}</h5>
                </div>
                <h2 className={`${textPreset2} pt-[6px]! ${!theme ? "text-[#697C9A]!" : ""}`}>{info.joinDate}</h2>
              </div>
              <h4 className={`${textPreset2} leading-[25px]! ${!theme ? "text-[#4B6A9B]!" : ""}`}>{info.bio ? info.bio : "This profile has no bio"}</h4>
              <div className={`p-[20px_120px_20px_40px]! max-md:flex-col max-md:gap-[20px] max-md:items-center max-md:justify-center max-md:p-[20px_40px_20px_40px]! ${!theme ? "bg-[#F6F8FF]!" : ""} w-[100%]  bg-[#141D2F] rounded-[10px] flex justify-between`}>
                <div className='flex flex-col gap-[8px] items-center'>
                  <h3 className={`${textPreset2} text-[1.3rem]! ${!theme ? "text-[#4B6A9B]!" : ""}`}>Repos</h3>
                  <h3 className={`${textPreset1} ${!theme ? "text-[#2B3442]!" : ""} text-[2.2rem]!`}>{info.repoCount}</h3>
                </div>
                <div className='flex flex-col gap-[8px] items-center'>
                  <h3 className={`${textPreset2} ${!theme ? "text-[#4B6A9B]!" : ""} text-[1.3rem]!`}>Followers</h3>
                  <h3 className={`${textPreset1} ${!theme ? "text-[#2B3442]!" : ""} text-[2.2rem]!`}>{info.followersCount}</h3>
                </div>
                <div className='flex flex-col gap-[8px] items-center'>
                  <h3 className={`${textPreset2} ${!theme ? "text-[#4B6A9B]!" : ""} text-[1.3rem]!`}>Following</h3>
                  <h3 className={`${textPreset1} ${!theme ? "text-[#2B3442]!" : ""} text-[2.2rem]!`}>{info.followingsCount}</h3>
                </div>
              </div>
              <div className='flex gap-[100px] max-md:gap-[0] max-md:justify-center  max-md:items-center max-md:flex-wrap'>
                <div className='flex max-md:flex-col gap-[100px] max-md:gap-[0]'>
                  <div className='flex flex-col gap-[20px]'>
                    <h4 className={`flex gap-[10px] ${!theme ? "text-[#4B6A9B]!" : ""} items-end ${textPreset2}`}>{locationSVG} {info.location ? info.location : "Not Available"}</h4>
                    <h4 className={`flex gap-[10px] items-end ${!theme ? "text-[#4B6A9B]!" : ""} ${textPreset2}`}>{websiteSVG}{info.blog ? <a className='hover:underline' href={info.blog}>{info.blog}</a> : "Not Available"}</h4>
                  </div>
                  <div className='flex flex-col gap-[20px] max-md:mt-[20px]'>
                    <h4 className={`flex gap-[10px] items-end ${!theme ? "text-[#4B6A9B]!" : ""} ${textPreset2}`}>{twitterSVG}{info.twitter ? info.twitter : "Not Available"}</h4>
                    <h4 className={`flex gap-[10px] items-end ${!theme ? "text-[#4B6A9B]!" : ""} ${textPreset2}`}>{companySVG}{info.company ? info.company : "Not Available"}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
