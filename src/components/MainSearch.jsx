import Link from "next/link"

const MainSearch = () => {
    return (
        <>
            <div className="main-search">
                <div className="container">
                    <div className="main-search-content">
                        <div className="search-first">
                            <div className="search-logo">
<svg fill="#ffd684" width="52px" height="52px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.912 17.959c-0.303-3.823 0.963-7.599 3.509-10.464 2.548-2.859 6.152-4.563 9.98-4.708 3.828-0.141 7.547 1.281 10.301 3.943 2.761 2.661 4.308 6.328 4.297 10.161v-0.891c0-8.839-7.161-16-16-16s-16 7.161-16 16c0 8.839 7.161 16 16 16h1.068c-7.385-0.521-13.115-6.645-13.156-14.041zM25.599 18.667c-5.749 0.021-7.183-7.984-1.776-9.959-1.583-0.844-3.359-1.276-5.156-1.239-4.531 0-8.615 2.728-10.349 6.911-1.733 4.188-0.776 9.005 2.428 12.208 3.203 3.204 8.020 4.161 12.208 2.428 4.183-1.735 6.911-5.819 6.911-10.349 0.032-0.713-0.025-1.432-0.176-2.136-0.876 1.401-2.437 2.219-4.089 2.136z"/>
</svg>
                                <h3>ANI<span>FORWARD</span></h3>
                            </div>
                            <div className="searchbar">
                                <input type="text" placeholder="Search..." />
                                <div className="search-btn">
                                <button><svg fill="#000000" width="30px" height="30px" viewBox="0 -8 72 72" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><title>search</title><path d="M58.73,44.35l-11-11a21.26,21.26,0,0,1-6.37,6.37l11,11a4.51,4.51,0,0,0,6.38-6.38Z" /><path d="M48,22A18,18,0,1,0,30,40,18,18,0,0,0,48,22ZM30,35.52A13.53,13.53,0,1,1,43.52,22,13.55,13.55,0,0,1,30,35.52Z" /><path d="M19.47,22h3A7.52,7.52,0,0,1,30,14.47v-3A10.53,10.53,0,0,0,19.47,22Z" /></svg></button>
                            </div>
                            </div>
                            {/* <div className="top-search">
                                <h5>Top search: <span></span></h5>
                            </div> */}
                            <Link href='/home'>
                            <div className="watch-btn">
                                <button>Watch anime</button>
                            </div>
                            </Link>
                        </div>
                        <div className="search-poster">
                            <img src="https://aniwatchtv.to/images/anw-min.webp" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainSearch