import { logOut } from "../../firebase/firebasefunctions"

export const HomePage = ()=>{
    const handleSignOut = ()=>{
        logOut()
    }
    return(<>
    Home Page
    <button onClick={handleSignOut}>Sign Out</button>
    </>)
}