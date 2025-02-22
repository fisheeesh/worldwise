import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div>
            Home
            <Link to='/app'>Go to the app</Link>
        </div>
    )
}
