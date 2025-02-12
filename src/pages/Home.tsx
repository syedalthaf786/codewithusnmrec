import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Code, BookOpen, Youtube, Github, Terminal } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  duration: string;
  category: string;
}

interface Project {
  id: string;
  title: string;
  video_url: string;
  source_url: string;
  category: string;
  image_url: string;
  created_at: string;
  author_name: string;
  published_date: string;
}

const faqs = [
  {
    question: "What is CodeWithUs?",
    answer: "CodeWithUs is an online platform that offers courses and projects to help you learn programming and build real-world applications."
  },
  {
    question: "How can I enroll in a course?",
    answer: "You can enroll in a course by visiting the Courses page, selecting a course, and following the enrollment instructions."
  },
  {
    question: "Are the courses free?",
    answer: "Some courses are free, while others may require a fee. Please check the course details for more information."
  },
  {
    question: "Can I contribute to the projects?",
    answer: "Yes, you can contribute to our open-source projects on GitHub. Visit our GitHub profile for more information."
  }
];

export default function Home() {
  const [selectedCategory] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*');

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from('feedback')
      .insert([{ feedback, email }]);

    if (error) {
      console.error('Error submitting feedback:', error);
    } else {
      setFeedback('');
      setEmail('');
      setFeedbackSubmitted(true);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learn Programming with Yerram Sneha....
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Master Web Development, Python, JavaScript, and more through hands-on projects
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Start Learning
              </Link>
              <Link
                to="/projects"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Tutorials */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Courses</h2>
            <Link to="/Courses" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.filter(course =>
                selectedCategory === "All" || course.category === selectedCategory
              ).map((course, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/5">
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <span className="text-sm text-gray-500">{course.category}</span><br />
                      <span className="text-sm text-gray-500">{course.duration}</span>
                      <div className="flex gap-4 mt-4">
                        <Link
                          to={`/course/${course.id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          View Course →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link to="/projects" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.filter(project =>
              selectedCategory === "All" || project.category === selectedCategory
            ).map((project, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-3/5">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-2">By {project.author_name}</p>
                    <p className="text-gray-500 mb-4">Published on {new Date(project.published_date).toLocaleDateString()}</p>
                    <div className="flex gap-4">
                      <Link
                        to={`/project/${project.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        View Project →
                      </Link>
                      <a
                        href={project.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Github className="h-5 w-5" />
                        <span className="ml-1">Source Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
              Frequently asked questions
            </h2>
          </div>
          <div className="accordion-group" data-accordion="default-accordion">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 ${openFaqIndex === i ? 'accordion-active:bg-indigo-50 accordion-active:border-indigo-600' : ''} mb-8 lg:p-4`}
                id={`basic-heading-${i}`}
              >
                <button
                  className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
                  aria-controls={`basic-collapse-${i}`}
                  onClick={() => toggleFaq(i)}
                >
                  <h5>{faq.question}</h5>
                  <svg
                    className={`w-6 h-6 text-gray-900 transition duration-500 ${openFaqIndex === i ? 'hidden' : 'block'} accordion-active:text-indigo-600 group-hover:text-indigo-600 origin-center`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18M12 18V6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <svg
                    className={`w-6 h-6 text-gray-900 transition duration-500 ${openFaqIndex === i ? 'block' : 'hidden'} accordion-active:text-indigo-600 group-hover:text-indigo-600`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <div
                  id={`basic-collapse-${i}`}
                  className="accordion-content w-full overflow-hidden pr-4"
                  aria-labelledby={`basic-heading-${i}`}
                  style={{ maxHeight: openFaqIndex === i ? '250px' : '0', transition: 'max-height 0.5s ease' }}
                >
                  <p className="text-base text-gray-900 font-normal leading-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section id="feedback" className="py-24 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
              We value your feedback
            </h2>
            <p className="text-lg text-gray-700 mt-4">
              Please let us know what you think about our platform.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {feedbackSubmitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
                Thank you for your feedback!
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <Testimonials />

      {/* Newsletter Subscription */}
      <Newsletter />

      {/* GitHub Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Github className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Open Source Projects</h2>
          <p className="text-gray-300 mb-8">
            Check out our GitHub repositories for complete source code and contribute to our projects
          </p>
          <a
            href=""
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            <Github className="h-5 w-5" />
            View GitHub Profile
          </a>
        </div>
      </section>
    </div>
  );
}
