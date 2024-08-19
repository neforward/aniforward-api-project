import Link from "next/link"

const MainHeader = () => {
    return (
        <>

            <header className="main-header">
                <div className="container">
                    <div className="flex items-center justify-center">
                        <nav className="flex items-center gap-10">
                            <Link href='/home'>Home</Link>
                            <Link href='/manga'>Manga</Link>
                            <Link href='/fyp'>For You</Link>
                            <Link href='/airing'>Top Airing</Link>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default MainHeader