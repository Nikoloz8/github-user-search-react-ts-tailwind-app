type TAppInfoNameBioDate = {
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
    textPreset1: string
    theme: boolean
    textPreset2: string
}

export default function AppInfoNameBioDate({ textPreset1, theme, textPreset2, info }: TAppInfoNameBioDate) {
    return (
        <>
            <div className='flex justify-between max-md:flex-col max-md:gap-[8px]!'>
                <div className='flex flex-col gap-[8px]'>
                    <h1 className={`${textPreset1} ${!theme ? "text-[#2B3442]!" : ""} `}>{info.name}</h1>
                    <h5 className={`${textPreset2} text-[1.6rem]! max-sm:text-center! text-[#0079FF]!`}>@{info.login}</h5>
                </div>
                <h2 className={`${textPreset2} pt-[6px]! ${!theme ? "text-[#697C9A]!" : ""}`}>{info.joinDate}</h2>
            </div>
            <h4 className={`${textPreset2} leading-[25px]! ${!theme ? "text-[#4B6A9B]!" : ""}`}>{info.bio ? info.bio : "This profile has no bio"}</h4>
        </>
    )
}
