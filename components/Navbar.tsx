import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./mobile-sidebar"

const navbar = () => {
    return (
        <div className='flex items-center p-4'>
            <MobileSidebar/>
            <div className="flex w-full justify-end">
                <UserButton/>
            </div>
        </div>
    )
}
export default navbar
