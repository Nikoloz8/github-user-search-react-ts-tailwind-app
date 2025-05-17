type TAppSearch = {
    theme: boolean
    name: string
    isMobile: boolean
    setName: React.Dispatch<React.SetStateAction<string>>;
    gitFetch: (name?: string) => Promise<void>
    textPreset1: string
    notFound: boolean
}

export default function AppSearch({ theme, name, isMobile, setName, gitFetch, textPreset1, notFound }: TAppSearch) {
    return (
        <label htmlFor='searchInput' className={`w-[100%] p-[10px_10px_10px_30px]! flex items-center rounded-[15px] cursor-pointer justify-between bg-[#1E2A47]  ${!theme ? "bg-[#FEFEFE]! shadow-[0_16px_30px_-10px_#4660BB33]" : ""}`}>
            <div className='flex gap-[20px]'>
                <img src="/images/icon-search.svg" alt="" />
                <input onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        name ? gitFetch(name) : gitFetch("octocat");
                    }
                }} onChange={(e) => setName(e.target.value)} placeholder={isMobile ? "Search" : "Search GitHub username…"} id='searchInput' name='searchInput' className={`caret-[#0079FF] placeholder:font-[400] placeholder:text-[1.8rem] placeholder:leading-[25px] placeholder:text-[#ffffff] outline-none font-[400] max-sm:w-[50%]! leading-[25px] text-[1.8rem] text-[#ffffff] w-[300px] ${!theme ? "placeholder:text-[#4B6A9B]! text-[#222731]!" : ""}`} type="text" />
            </div>
            <div className='flex items-center gap-[25px]'>
                <p className={`${textPreset1} text-[#F74646]! text-[1.5rem]!  ${notFound ? "flex!" : "hidden"}`}>No results</p>
                <button onClick={() => {
                    name ? gitFetch(name.trim()) : gitFetch("octocat")
                }} className={`w-[106px] h-[50px] cursor-pointer bg-[#0079FF] hover:bg-[#60ABFF] outline-none rounded-[10px] ${textPreset1} text-[1.6rem]!`}>Search</button>
            </div>
        </label>)
}
