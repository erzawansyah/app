'use client'
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

const BackButton = () => {
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        console.log("BackButton rendered")
        console.info("Current pathname: ", pathname)
    }, [pathname])


    return (
        <button
            aria-label="Back"
            className="bg-white text-black py-2 px-4 rounded-lg"
            onClick={() => router.back()}
        >
            Back
        </button>
    )
}

export default BackButton
