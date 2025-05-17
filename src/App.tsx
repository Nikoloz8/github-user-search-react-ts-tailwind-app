import { useEffect, useState } from 'react'
import './App.css'
import AppSVGS from './components/AppSVGS'

function App() {

  const { sunSVG, companySVG, locationSVG, twitterSVG, websiteSVG, moonSVG } = AppSVGS()

  async function githubFetch(name: string = "octocat") {
    try {
      const token = process.env.GITHUB_TOKEN || "fake_token";

      let response = await fetch(`https://api.github.com/users/${name}`, {
        headers: {
          Authorization: `token ${token}`
        }
      })

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
    console.log(user)
  }


  useEffect(() => { gitFetch("octocat") }, [])


  const [name, setName] = useState("octocat")

  const [theme, setTheme] = useState(false)

  console.log(theme)

  const textPreset1 = "font-[700] text-[2.6rem] leading-[100%] text-[#FFFFFF]"
  const textPreset2 = `${textPreset1} font-[400]! text-[1.5rem]!`

  return (
    <>
      <div className='min-w-[100vw] min-h-[100vh] flex items-center justify-center bg-[#141D2F]'>
        <div className='w-[800px] flex flex-col gap-[30px]'>
          <div className='flex justify-between'>
            <h2 className={`${textPreset1}`}>devfinder</h2>
            <h3 className={`flex gap-[10px] items-center justify-center ${textPreset1} text-[1.3rem]! text-[#FFFFFF tracking-[2.5px]! cursor-pointer`} onClick={() => setTheme(!theme)}>{theme ? `LIGHT` : `DARK`}{theme ? sunSVG : moonSVG}</h3>
          </div>
          <label htmlFor='searchInput' className='w-[100%] p-[10px_10px_10px_30px]! flex items-center rounded-[15px] cursor-pointer justify-between bg-[#1E2A47]'>
            <div className='flex gap-[20px]'>
              <img src="/images/icon-search.svg" alt="" />
              <input onChange={(e) => setName(e.target.value)} placeholder='Search GitHub username…' id='searchInput' name='searchInput' className='caret-[#0079FF] placeholder:font-[400] placeholder:text-[1.8rem] placeholder:leading-[25px] placeholder:text-[#ffffff] outline-none font-[400] leading-[25px] text-[1.8rem] text-[#ffffff] w-[300px]' type="text" />
            </div>
            <div className='flex items-center gap-[25px]'>
              <p className={`${textPreset1} text-[#F74646]! text-[1.5rem]!  ${notFound ? "flex!" : "hidden"}`}>No results</p>
              <button onClick={() => {
                name ? gitFetch(name) : gitFetch("octocat")
              }} className={`w-[106px] h-[50px] cursor-pointer bg-[#60ABFF] outline-none rounded-[10px] ${textPreset1} text-[1.6rem]!`}>Search</button>
            </div>
          </label>
          <div className='p-[50px]! w-[100%] bg-[#1E2A47] flex rounded-[15px]'>
            <img className='w-[120px] h-[120px] mr-[50px] rounded-[100%]' src={info.imageUrl ? info.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrKfppDuTzpqelOMqf1JM_yCkGIg_B62kfw&s"} alt="" />
            <div className='w-[100%] flex flex-col gap-[30px]'>
              <div className='flex flex-col gap-[10px]'>
                <div className='flex justify-between items-center'>
                  <h1 className={`${textPreset1}`}>{info.name}</h1>
                  <h2 className={`${textPreset2}`}>{info.joinDate}</h2>
                </div>
                <h5 className={`${textPreset2} text-[1.6rem]! text-[#0079FF]!`}>@{info.login}</h5>
              </div>
              <h4 className={`${textPreset2} leading-[25px]`}>{info.bio ? info.bio : "This profile has no bio"}</h4>
              <div className='p-[20px_120px_20px_40px]! w-[100%] bg-[#141D2F] rounded-[10px] flex justify-between'>
                <div className='flex flex-col gap-[8px]'>
                  <h3 className={`${textPreset2} text-[1.3rem]!`}>Repos</h3>
                  <h3 className={`${textPreset1} text-[2.2rem]!`}>{info.repoCount}</h3>
                </div>
                <div className='flex flex-col gap-[8px]'>
                  <h3 className={`${textPreset2} text-[1.3rem]!`}>Followers</h3>
                  <h3 className={`${textPreset1} text-[2.2rem]!`}>{info.followersCount}</h3>
                </div>
                <div className='flex flex-col gap-[8px]'>
                  <h3 className={`${textPreset2} text-[1.3rem]!`}>Following</h3>
                  <h3 className={`${textPreset1} text-[2.2rem]!`}>{info.followersCount}</h3>
                </div>
              </div>
              <div className='flex gap-[100px]'>
                <div className='flex flex-col gap-[20px]'>
                  <h4 className={`flex gap-[10px] items-end ${textPreset2}`}>{locationSVG} {info.location ? info.location : "Not Available"}</h4>
                  <h4 className={`flex gap-[10px] items-end ${textPreset2}`}>{websiteSVG}{info.blog ? <a className='hover:underline' href={info.blog}>{info.blog}</a> : "Not Available"}</h4>
                </div>
                <div className='flex flex-col gap-[20px]'>
                  <h4 className={`flex gap-[10px] items-end ${textPreset2}`}>{twitterSVG}{info.twitter ? info.twitter : "Not Available"}</h4>
                  <h4 className={`flex gap-[10px] items-end ${textPreset2}`}>{companySVG}{info.company ? info.company : "Not Available"}</h4>
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
