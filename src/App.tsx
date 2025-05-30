import './App.css'
import AppSVGS from './components/AppSVGS'
import AppHeader from './components/AppHeader'
import AppSearch from './components/AppSearch'
import AppInfoNameBioDate from './components/AppInfoNameBioDate'
import AppInfoGeneralStats from './components/AppInfoGeneralStats'
import AppGeneralInfo from './components/AppGeneralInfo'
import AppLogics from './components/AppLogics'

function App() {
  const { theme, setTheme, name, setName, isMobile, info, notFound, gitFetch, loading } = AppLogics()

  const { sunSVG, companySVG, locationSVG, twitterSVG, websiteSVG, moonSVG } = AppSVGS(theme)

  const textPreset1 = "font-[700] text-[2.6rem] leading-[100%] text-[#FFFFFF]"
  const textPreset2 = `${textPreset1} font-[400]! text-[1.5rem]!`

  return (
    <>
      <div className={`min-w-[100vw] min-h-[100vh] flex items-center justify-center bg-[#141D2F] ${!theme ? "bg-[#F6F8FF]" : ""} max-md:p-[30px]`}>

        {loading ? (
          <div className="text-white text-2xl animate-pulse">
            Loading...
          </div>
        ) : (
          <div className='w-[800px] flex flex-col gap-[30px]'>

            <AppHeader textPreset1={textPreset1} theme={theme} sunSVG={sunSVG} moonSVG={moonSVG} setTheme={setTheme} />

            <AppSearch theme={theme} name={name} isMobile={isMobile} setName={setName} gitFetch={gitFetch} textPreset1={textPreset1} notFound={notFound} />

            <div className={`p-[50px]! max-sm:gap-[50px] max-sm:p-[30px]! max-sm:flex-col max-sm:items-center max-sm:justify-center w-[100%] bg-[#1E2A47] flex rounded-[15px] ${!theme ? "bg-[#FEFEFE]! shadow-[0_16px_30px_-10px_#4660BB33]" : ""}`}>
              <img className={`w-[120px] max-sm:m-0! h-[120px] mr-[50px] rounded-[100%]`} src={info.imageUrl ? info.imageUrl : undefined} alt="" />
              <div className='w-[100%] flex max-sm:items-center max-sm:justify-center  flex-col gap-[30px]'>

                <AppInfoNameBioDate info={info} textPreset1={textPreset1} theme={theme} textPreset2={textPreset2} />

                <AppInfoGeneralStats theme={theme} textPreset1={textPreset1} textPreset2={textPreset2} info={info} />

                <AppGeneralInfo theme={theme} info={info} companySVG={companySVG} twitterSVG={twitterSVG} websiteSVG={websiteSVG} textPreset2={textPreset2}
                  locationSVG={locationSVG} />
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default App
