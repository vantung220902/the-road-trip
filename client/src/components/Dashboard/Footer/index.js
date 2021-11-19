import React, { Component } from 'react';
import './index.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
class Footer extends Component {
    render() {
        return (
            <div className="footer-basic">
                <footer>
                    <div className="social">
                        <InstagramIcon className="icon-footer" />
                        <YouTubeIcon className="icon-footer" />
                        <TwitterIcon className="icon-footer" />
                        <FacebookIcon className="icon-footer" />
                    </div>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/">Services</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/">About</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/">Terms</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/">Privacy Policy</a>
                        </li>
                    </ul>
                    <p className="copyright">The Road Trip</p>
                </footer>
            </div>
        );
    }
}

export default Footer;
