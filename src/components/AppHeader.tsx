import type React from "react"

type TAppHeader = {
    textPreset1: string
    theme: boolean
    sunSVG: React.ReactNode
    moonSVG: React.ReactNode
    setTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AppHeader({ textPreset1, theme, sunSVG, moonSVG, setTheme }: TAppHeader) {
    return (
        <div className='flex justify-between'>
            <h2 className={`${textPreset1} ${!theme ? "text-[#222731]!" : ""}`}>devfinder</h2>
            <h3 className={`flex gap-[10px] items-center justify-center ${textPreset1} text-[1.3rem]! text-[#FFFFFF] tracking-[2.5px]! cursor-pointer ${!theme ? "text-[#697C9A]!" : ""} `} onClick={() => setTheme(!theme)}>{theme ? `LIGHT` : `DARK`}{theme ? sunSVG : moonSVG}</h3>
        </div>)
}
