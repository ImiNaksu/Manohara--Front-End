import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faComments,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import userProfile1 from "../img/docProfile1.jpg";
import userProfile2 from "../img/docProfile2.jpg";
import userProfile3 from "../img/docProfile3.jpg";

const userProfiles = [
  {
    rating: 5,
    review:
      "This app has truly changed my life. The AI chat helped me understand my emotions better, and the recommendations have been incredibly effective.",
    name: "Alice Johnson",
    position: "Community Member",
    profileImg: userProfile1,
  },
  {
    rating: 4,
    review:
      "A great tool for anyone struggling with depression. The meditation and exercise recommendations really help!",
    name: "Michael Smith",
    position: "Active User",
    profileImg: userProfile2,
  },
  {
    rating: 5,
    review:
      "The community feature is fantastic! I feel supported and less alone in my journey. Highly recommend it.",
    name: "Emily Davis",
    position: "Community Member",
    profileImg: userProfile3,
  },
];

const Home = () => {
  const [profileIndex, setProfileIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const itemsPerPage = 3;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNext = () => {
    if (profileIndex + itemsPerPage < userProfiles.length) {
      setProfileIndex(profileIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (profileIndex - itemsPerPage >= 0) {
      setProfileIndex(profileIndex - itemsPerPage);
    }
  };

  return (
    <div className="home-container">
      <div className={`header ${isScrolled ? "fixed-header" : ""}`}>
        <div className="Logo">
          <h4>Manohara</h4>
        </div>

        <div className="headerLinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="headerButtons">
          <div className="login">
            <Link to={"/login"}>
              <button type="button">Login</button>
            </Link>
          </div>
          <div className="signin">
            <Link to={"/signup"}>
              <button type="button">SignUp</button>
            </Link>
          </div>
        </div>
      </div>

      <section id="home" className="section section1">
        <div className="section1-body">
          <p className="sec1">Your Mental Well-being, Our Priority.</p>
          <h1>Uncover, Heal, and Embrace a Brighter Tomorrow.</h1>
          <p className="sec2">
            Our AI-powered chatbot interacts with you to assess your mental
            health and provides personalized recommendations to help manage
            depression.
          </p>
        </div>
      </section>

      <section id="about" className="section section2">
        <div className="section2-head">
          <h1>About</h1>
          <p>
            Using advanced AI technology, our system interacts with users,
            detects signs of depression, and provides tailored recommendations
            to improve mental health.
          </p>
        </div>
        <div className="section2-body">
          <div className="box">
            <FontAwesomeIcon icon={faBrain} className="box-icon" />
            <h3>AI-Powered Analysis</h3>
            <hr />
            <p>
              Our chatbot engages in meaningful conversations to assess your
              emotional state and detect signs of depression.
            </p>
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faComments} className="box-icon" />
            <h3>Community Support</h3>
            <hr />
            <p>
              Connect with others, share your experiences, and find support in a
              safe and welcoming community.
            </p>
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faChartLine} className="box-icon" />
            <h3>Track Your Progress</h3>
            <hr />
            <p>
              Monitor your mental well-being with our personalized dashboard and
              stay on top of your emotional health.
            </p>
          </div>
        </div>
      </section>

      <section id="reviews" className="section section4">
        <div className="section4-head">
          <h1>Every User Matters</h1>
          <p>
            Join a growing community dedicated to mental well-being. Read what
            our users have to say about their journey with MentalEase.
          </p>
        </div>
        <div className="section4-body">
          <button onClick={handlePrev} disabled={profileIndex === 0}>
            &#10094;
          </button>
          {userProfiles
            .slice(profileIndex, profileIndex + itemsPerPage)
            .map((userProfile, index) => (
              <div key={index} className="box">
                <div className="rating">
                  {"★".repeat(userProfile.rating)}
                  {"☆".repeat(5 - userProfile.rating)}
                </div>
                <p>{userProfile.review}</p>
                <div className="profileName">
                  <p>
                    - {userProfile.name}, {userProfile.position}
                  </p>
                </div>
                <div className="profile">
                  <img src={userProfile.profileImg} alt={userProfile.name} />
                </div>
              </div>
            ))}
          <button
            onClick={handleNext}
            disabled={profileIndex + itemsPerPage >= userProfiles.length}
          >
            &#10095;
          </button>
        </div>
      </section>

      <section id="contact" className="section section5">
        <div className="section5-head">
          <p className="sec5-p1">Newsletter</p>
          <h1>JOIN US</h1>
          <p className="sec5-p2">
            Join us today and take a step toward better mental well-being.
          </p>

          <div className="subscribe">
            <input type="email" placeholder="Your Email" />
            <button className="sub-btn">Subscribe</button>
          </div>
        </div>
        <div className="section5-footer">
          <div className="footer2">
            <p>
              <strong>&#169; Manohara All Right Reserved</strong>
            </p>
            <div>
              <FontAwesomeIcon icon={faFacebook} className="footer2-img" />
              <FontAwesomeIcon icon={faInstagram} className="footer2-img" />
              <FontAwesomeIcon icon={faTwitter} className="footer2-img" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
