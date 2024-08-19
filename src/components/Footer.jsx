'use client'
import Link from "next/link"
import { FaGithub, FaTwitter, FaReddit } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="wide-container">
                    <div class="footer-content">
                        <div className="footer-logo">
                            <div className="lorem-logo">
                                <Link href='/' passHref>
                                    <h3>ANI<span>FORWARD</span></h3>
                                </Link>
                            </div>
                            <div class="join-now">
                                <a href="#">Join now</a>
                            </div>
                            <div class="social-media">
                                <a href=""><FaGithub size={32} /></a>
                                <a href=""><SiTelegram size={32} /></a>
                                <a href=""><FaReddit size={32} /></a>
                                <a href=""><FaTwitter size={32} /></a>
                            </div>
                        </div>
                        <div class="footer-links">
                            <a href="#">Terms of service</a>
                            <a href="#">DMCA</a>
                            <a href="#">Contact</a>
                        </div>
                        <div class="disclaimer">
                            <p>AniForward does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
                        </div>
                        <div class="copyright">
                            <p>© 2024 AniForward. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer