type TAppGeneralInfo = {
    theme: boolean
    info: {
        name: string
        joinDate: string
        login: string
        imageUrl: string
        repoCount: string
        followersCount: string
        followingsCount: string
        bio: string
        location: string
        blog: string
        twitter: string
        company: string
    }
    companySVG: React.ReactNode
    locationSVG: React.ReactNode
    twitterSVG: React.ReactNode
    websiteSVG: React.ReactNode
    textPreset2:string
}

export default function AppGeneralInfo({ theme, info, websiteSVG, textPreset2, twitterSVG, companySVG, locationSVG }:TAppGeneralInfo) {
    return (
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
        </div>)
}
