type TAppInfoGeneralStats = {
  theme: boolean
  textPreset1: string
  textPreset2: string
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
}

export default function AppInfoGeneralStats({ theme, textPreset1, textPreset2, info }: TAppInfoGeneralStats) {
  return (
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
    </div>)
}
