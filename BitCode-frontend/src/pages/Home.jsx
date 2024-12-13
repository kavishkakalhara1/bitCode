import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import { Button, Toast } from "flowbite-react";
import Logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { MdNotifications } from "react-icons/md";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home({ text, index }) {
  const [posts, setPosts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  let query = useQuery();
  let orderId = query.get("order_id");
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    // Set a timer to hide the toast after 10 seconds
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 100000); // 10 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 2 } }}
        exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
      >
        
        <div className="z-10 flex flex-col max-w-6xl px-3 mx-auto md:min-h-screen p-28 ">
          <motion.div
            id="home"
            className="flex float-left mb-10 left-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 2 } }}
            exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
            whileHover={{ y: -8 }}
          >
            <img
              className="flex h-auto mt-0 overflow-hidden transition-all duration-300 md:float-left md:max-w-md md:w-160 w-90"
              src={Logo}
              alt="CodeCampus Logo"
            />
          </motion.div>

          <motion.p
            className="z-20 ml-10 text-3xl font-bold lg:text-6xl md:ml-0 animated-refaa-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 3 } }}
            exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
          >
            Code Campus
          </motion.p>
          <motion.p
            className="mt-4 mb-10 ml-10 text-gray-600 font- md:text-3xl sm:text-md md:ml-0 dark:text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 10 } }}
            exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
          >
            Join Us to Innovate, Share, and Shape the Future of Technology with Our Cutting-Edge Software Solutions.
          </motion.p>

          <Link to="/sign-in">
            <Button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="rounded-bl-none w-80 rounded-tl-xl bg-gradient-to-r from-refaa-red to-refaa-blue hover:from-refaa-red hover:to-red-900 hover:shadow-xl dark:bg-slate-700 dark:hover:from-slate-800 dark:hover:to-slate-700 dark:hover:shadow-xl ring-0 focus:ring-transparent"
            >
              Get Started
            </Button>
          </Link>

    
        </div>

        <motion.div
          id="about"
          className="z-40 mt-0 bg-gray-700 dark:bg-slate-700"
          initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            x: index % 2 === 0 ? 200 : -200,
          }}
          whileInView={{
            opacity: 1,
            x: 0, // Slide in to its original position
            transition: {
              duration: 1, // Animation duration
            },
          }}
          viewport={{ once: false }}
        >
          <CallToAction />
        </motion.div>

        <div className="z-0 flex flex-col gap-6 p-2 mx-auto mt-20 mb-20 py-7">
          {posts && posts.length > 0 && (
            <div className="flex flex-col justify-center gap-6">
              <h2 className="text-3xl font-semibold text-center">
                Recent Posts
              </h2>
              <div className="flex-wrap mx-auto mt-10 md:flex gap-7">
            

                {sortedPosts.slice(0, 3).map((post) => (
                  <PostCard key={post._id} post={post} className="" />
                ))}
              </div>
              <Link
                to={"/search"}
                className="text-lg text-center text-refaa-blue hover:font-semibold"
              >
                View All Posts
              </Link>
            </div>
          )}
        </div>
      </motion.div>

    

      
      
    </>
  );
}