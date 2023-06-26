import { Link } from "react-router-dom";
import { Button } from "../components";
import Logo from "../assets/icon.png";

export default function LandingPage() {

    const pushToGithub = () => {
        window.open('https://github.com/oyeolamilekan?tab=repositories', '_blank')
    }

    return (
        <div className="relative">
            
            <div className="max-w-5xl m-auto px-5">
                <div className="flex justify-between items-center py-5">
                    <div className="flex justify-center align-middle middle">
                        <img src={Logo} alt="logo" className="w-10 h-10 mt-3" />
                        <h2 className="font-bold mt-5">Soyoyo</h2>
                    </div>
                    <div className="">
                        <ul className="inline-flex md:space-x-10 space-x-5">
                            <li>
                                <Link to="/app/sign_in">Sign in</Link>
                            </li>
                            <li>
                                <Link to="/app/sign_up">Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-7">
                    <h2 className="md:text-5xl text-2xl font-bold">Payment Orchestration made simple</h2>
                    <p className="mt-3 max-w-xl font-medium">Unlocking Seamless Payment Experiences: Simplifying Transaction Management through Effortless Payment Orchestration</p>
                    <div className="mt-5 flex space-x-4">
                        <Button variant="sm" size="non-full" onClick={pushToGithub}>
                            View Github
                        </Button>
                        <Button size="non-full" variant="outline">
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
