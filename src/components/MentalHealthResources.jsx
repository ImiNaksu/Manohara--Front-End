import React, { useState } from "react";
import { FaBook, FaHeadphones, FaNewspaper, FaVideo } from "react-icons/fa";
import "../styles/Library.css";
import Header from "./Header";

import book1 from "../img/books/book1.png";
import article1 from "../img/articles/article1.png";
import audio1 from "../img/audios/audio1.png";
import video1 from "../img/videos/video1.jpg";

import book2 from "../img/books/book2.png";
import article2 from "../img/articles/article2.png";
import audio2 from "../img/audios/audio2.png";
import video2 from "../img/videos/video2.png";

import book3 from "../img/books/book3.png";
import article3 from "../img/articles/article3.jpg";
import audio3 from "../img/audios/audio3.png";
import video3 from "../img/videos/video3.jpg";

import book4 from "../img/books/book4.png";
import article4 from "../img/articles/article4.png";
import audio4 from "../img/audios/audio4.png";
import video4 from "../img/videos/video4.jpg";

import book5 from "../img/books/book5.png";
import article5 from "../img/articles/article5.png";
import video5 from "../img/videos/video5.jpg";

import book6 from "../img/books/book6.png";
import article6 from "../img/articles/article6.png";
import video6 from "../img/videos/video6.jpg";

import book7 from "../img/books/book7.png";
import article7 from "../img/articles/article7.png";
import video7 from "../img/videos/video7.jpg";

import book8 from "../img/books/book8.png";
import article8 from "../img/articles/article8.png";
import video8 from "../img/videos/video8.jpg";
import audio5 from "../img/audios/audio5.png";

const categories = {
  "Stress Management": [
    {
      title: "The Art of Clear Thinking",
      author: "Hasard Lee",
      type: "Book",
      description:
        "A Stealth Fighter Pilot's Timeless Rules for Making Tough Decisions",
      image: book1,
      link: "https://www.cole13.com/wp-content/uploads/2023/08/Hasard-Lee-The-Art-of-Clear-Thinking_-A-Stealth-Fighter-Pilots-Timeless-Rules-for-Making-Tough-Decisions-St.-Martins-Press-2023-1.pdf",
    },
    {
      title:
        "Relaxation techniques: Breath control helps quell errant stress response",
      author: "Harvard Health Publishing",
      type: "Article",
      description:
        "An article outlining research-backed stress management strategies.",
      image: article1,
      link: "https://www.health.harvard.edu/mind-and-mood/relaxation-techniques-breath-control-helps-quell-errant-stress-response",
    },
    {
      title: "Stress Relief Audio Guide",
      author: "SoundHelix",
      type: "Audio",
      description:
        "An audio guide designed to help you manage and reduce stress.",
      image: audio1,
      link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "Stress Management Techniques",
      author: "YouTube",
      type: "Video",
      description: "A video tutorial on practical techniques to manage stress.",
      image: video1,
      link: "https://www.youtube.com/watch?v=inpok4MKVLM",
    },
  ],
  "Anxiety Support": [
    {
      title: "Understanding and Managing Anxiety",
      author: "Sebastian Salicru",
      type: "Book",
      description:
        "A comprehensive workbook offering strategies to manage anxiety and phobias.",
      image: book2,
      link: "https://www.ptspsychology.com/wp-content/uploads/2021/08/Understanding-and-Managing-Anxiety_SSalicru-PTS.pdf",
    },
    {
      title: "Understanding Anxiety: The Complete Beginner's Guide",
      author: "Nick Wignail",
      type: "Article",
      description:
        "An insightful article on the causes and treatments of anxiety.",
      image: article2,
      link: "https://nickwignall.com/understanding-anxiety/",
    },
    {
      title: "Anxiety Relief Audio Session",
      author: "SoundHelix",
      type: "Audio",
      description:
        "An audio session crafted to help alleviate anxiety symptoms.",
      image: audio2,
      link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      title: "Coping with Anxiety",
      author: "YouTube",
      type: "Video",
      description:
        "A video resource offering practical tips and techniques for managing anxiety.",
      image: video2,
      link: "https://www.youtube.com/watch?v=MIr3RsUWrdo",
    },
  ],
  "Depression Awareness": [
    {
      title: "Feeling Good",
      author: "David D. Burns",
      type: "Book",
      description:
        "A well-known book that provides strategies to overcome depression.",
      image: book3,
      link: "https://ia601708.us.archive.org/14/items/feeling-good-the-new-mood-therapy/David%20Burns%20-%20Feeling%20Good.pdf",
    },
    {
      title: "Understanding Depression",
      author: "NIMH",
      type: "Article",
      description:
        "An informative article on the nature of depression and treatment options.",
      image: article3,
      link: "https://www.nimh.nih.gov/health/topics/depression/index.shtml",
    },
    {
      title: "Depression Free Support Audio",
      author: "SoundHelix",
      type: "Audio",
      description:
        "An audio resource offering comfort and insights for those battling depression.",
      image: audio3,
      link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      title: `"I'm Fine" - Learning To Live With Depression`,
      author: "Jake Tyler",
      type: "Video",
      description:
        "A video sharing personal experiences and expert advice on managing depression.",
      image: video3,
      link: "https://www.youtube.com/watch?v=IDPDEKtd2yM",
    },
  ],
  "Mindfulness & Meditation": [
    {
      title: "Wherever You Go, There You Are",
      author: "Jon Kabat-Zinn",
      type: "Book",
      description:
        "A guide to cultivating mindfulness and incorporating meditation into daily life.",
      image: book4,
      link: "https://experiencelife.lifetime.life/wp-content/uploads/2021/06/Wherever-You-Go-There-You-Are-1.pdf",
    },
    {
      title: "Introduction to Mindfulness",
      author: "Mindful.org",
      type: "Article",
      description:
        "An article detailing the basics of mindfulness and meditation practices.",
      image: article4,
      link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
    },
    {
      title: "Mindfulness Meditation Audio",
      author: "SoundHelix",
      type: "Audio",
      description:
        "An audio meditation guide to help you begin your mindfulness journey.",
      image: audio4,
      link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      title: "Mindfulness Meditation Techniques",
      author: "YouTube",
      type: "Video",
      description:
        "A video tutorial demonstrating effective mindfulness meditation techniques.",
      image: video4,
      link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    },
  ],
  "Sleep & Recovery": [
    {
      title: "Sleep Smarter",
      author: "Shawn Stevenson",
      type: "Book",
      description:
        "A book offering strategies to improve sleep quality and promote recovery.",
      image: book5,
      link: "https://s3-us-west-2.amazonaws.com/sleepsmarter/Sleep%20Smarter%20Bonus_Final.pdf",
    },
    {
      title: "The Science of Sleep",
      author: "Sleep Foundation",
      type: "Article",
      description:
        "An article discussing the importance of sleep and its impact on health.",
      image: article5,
      link: "https://www.sleepfoundation.org/how-sleep-works/what-happens-when-you-sleep",
    },
    {
      title: "Sleep Meditation Audio",
      author: "SoundHelix",
      type: "Audio",
      description:
        "An audio guide designed to help you relax and improve sleep quality.",
      image: audio1,
      link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    {
      title: "6 tips for better sleep | Sleeping with Science, a TED series",
      author: "YouTube",
      type: "Video",
      description:
        "A video resource offering tips and techniques for better sleep and recovery.",
      image: video5,
      link: "https://www.youtube.com/watch?v=t0kACis_dJE",
    },
  ],
  "Self-Care Routines": [
    {
      title: "The Self-Care Handbook",
      author: "Ken Druck",
      type: "Book",
      description:
        "A book exploring practical self-care routines to improve overall wellbeing.",
      image: book6,
      link: "https://www.kendruck.com/wp-content/uploads/2017/09/Ken-Druck-self_care.bk_.pdf",
    },
    {
      title: "What Is Self-Care and Why Is It Important?",
      author: "Angelica Bottaro",
      type: "Article",
      description:
        "An article discussing why self-care is essential for mental health.",
      image: article6,
      link: "https://www.verywellhealth.com/what-is-self-care-5212781",
    },
    {
      title: "Self Care",
      author: "YouTube",
      type: "Video",
      description:
        "A video demonstration of practical self-care routines for everyday life.",
      image: video6,
      link: "https://www.youtube.com/watch?v=IYq0h3KgDpY",
    },
  ],
  "Nutrition & Mental Health": [
    {
      title: "The Food-Mood Connection",
      author: "Gary Null",
      type: "Book",
      description:
        "A book exploring the impact of nutrition on mental health and wellbeing.",
      image: book7,
      link: "https://mindbodytraininginstitute.com/wp-content/uploads/2021/02/The-Food-Mood-Connection-Module10.pdf",
    },
    {
      title: "Food and Mood: Is There a Connection?",
      author: "Harvard Health",
      type: "Article",
      description:
        "An article examining how dietary choices affect mental health.",
      image: article7,
      link: "https://www.health.harvard.edu/mind-and-mood/food-and-mood-is-there-a-connection",
    },
    {
      title: "How would Nutrition improve your mental health?",
      author: "YouTube",
      type: "Video",
      description:
        "A video exploring the link between dietary habits and mental health.",
      image: video7,
      link: "https://www.youtube.com/watch?v=YlZStgF1H4I",
    },
  ],
  "Coping with Grief / Loneliness": [
    {
      title: "A GUIDE TO Grief, Loss & Healing",
      author: "Elisabeth Kübler-Ross",
      type: "Book",
      description:
        "A seminal book offering insights and strategies for coping with loss.",
      image: book8,
      link: "https://www.everystep.org/filesimages/Grief%20and%20Loss/ATP-Guide-Grief.pdf",
    },
    {
      title: "Coping with Grief and Loss",
      author: "HelpGuide",
      type: "Article",
      description:
        "An article offering practical advice for dealing with grief and loneliness.",
      image: article8,
      link: "https://www.helpguide.org/articles/grief/coping-with-grief-and-loss.htm",
    },
    {
      title: "Grief Support Audio",
      author: "SoundHelix",
      type: "Audio",
      description:
        "An audio resource providing comfort and strategies for coping with grief.",
      image: audio5,
      link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    },
    {
      title: "Coping with grief, loneliness during the holidays",
      author: "YouTube",
      type: "Video",
      description:
        "A video discussing methods and personal stories on coping with grief and loneliness.",
      image: video8,
      link: "https://www.youtube.com/watch?v=y4z9AqblvCA",
    },
  ],
};

const getButtonContent = (type) => {
  switch (type) {
    case "Book":
      return { icon: <FaBook />, label: "View Book" };
    case "Audio":
      return { icon: <FaHeadphones />, label: "Listen Audio" };
    case "Article":
      return { icon: <FaNewspaper />, label: "View Article" };
    case "Video":
      return { icon: <FaVideo />, label: "Watch Video" };
    default:
      return { icon: null, label: "View" };
  }
};

// Function to get all books with category labels
const getAllBooks = () => {
  return Object.entries(categories).flatMap(([category, books]) =>
    books.map((book) => ({ ...book, category }))
  );
};

const MentalHealthResources = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const booksToShow = selectedCategory
    ? categories[selectedCategory]
    : getAllBooks();

  const handleViewBook = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="main-div">
      <Header />
      <div className="lib-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Categories</h2>
          <ul>
            <li
              className={selectedCategory === null ? "active" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </li>
            {Object.keys(categories).map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Book List */}
        <main className="book-list">
          <div
            className={selectedCategory === null ? "all-categories" : "cards"}
          >
            {selectedCategory === null
              ? // Show All Categories with separate sections
                Object.entries(categories).map(([category, books]) => (
                  <div key={category} className="category-section">
                    <h3 className="category-title">{category}</h3>
                    <div className="cards">
                      {books.map((book, index) => {
                        const { icon, label } = getButtonContent(book.type);
                        return (
                          <div key={index} className="card">
                            <img
                              src={book.image}
                              alt={book.title}
                              className="book-image"
                            />
                            <div className="book-details">
                              <h4>{book.title}</h4>
                              <p>by {book.author}</p>
                              <p>{book.description}</p>
                              <button
                                className="view-button"
                                onClick={() => handleViewBook(book.link)}
                              >
                                {icon} {label}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              : // Show books for a selected category
                booksToShow.map((book, index) => {
                  const { icon, label } = getButtonContent(book.type);
                  return (
                    <div key={index} className="card">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="book-image"
                      />
                      <div className="book-details">
                        <h4>{book.title}</h4>
                        <p>by {book.author}</p>
                        <p>{book.description}</p>
                        <button
                          className="view-button"
                          onClick={() => handleViewBook(book.link)}
                        >
                          {icon} {label}
                        </button>
                      </div>
                    </div>
                  );
                })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentalHealthResources;
