import { Link } from "react-router-dom"

export default function Notfound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1>Page not found, go to <Link to="/"><strong className="text-blue-800 underline text-xl font-semibold">home</strong></Link></h1>
        </div>
    )
}