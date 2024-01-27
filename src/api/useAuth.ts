import { JwtPayload, jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

interface UserData {
    email: string,
    role: string
}

interface CustomJwtPayload extends JwtPayload {
    role: string
}

export default function useAuth(){
    const [cookies, setCookie] = useCookies(["jwt-auth"]);
    function login(token: string){
        const decoded = jwtDecode<CustomJwtPayload>(token);
        console.log(decoded)
        setCookie("jwt-auth", token)
    }

    function logout(){
        setCookie("jwt-auth", null)
    }

    function getUser(): UserData | null {
        if (cookies["jwt-auth"]) {
            const decoded = jwtDecode<CustomJwtPayload>(cookies["jwt-auth"]);
            const email = decoded.sub
            const role = decoded.role
            if (email && role) {
                return {email, role}
            }
        }
        return null
    }

    return {
        getUser,
        login, 
        logout
    }
}