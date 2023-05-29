import { Button } from "../components";

export default function LandingPage() {

    const pushToGithub = () => {
        window.open('https://github.com/oyeolamilekan/crypto-giftcard')
    }

    return (
        <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            <div className="max-w-5xl m-auto px-5">
                <div className="flex justify-between items-center py-5">
                    <div>
                        <h2>Soyoyo</h2>
                    </div>
                    <div className="">
                        <ul className="inline-flex md:space-x-20 space-x-10">
                            <li>Sign in</li>
                            <li>Sign Up</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-7">
                    <h2 className="md:text-5xl text-2xl font-bold">Payment Orchestration made simple</h2>
                    <p className="mt-3 max-w-xl font-medium">Unlocking Seamless Payment Experiences: Simplifying Transaction Management through Effortless Payment Orchestration</p>
                    <div className="mt-5 flex space-x-4">
                        <Button variant="sm" size="non-full" onClick={pushToGithub}>
                            Star Github
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
