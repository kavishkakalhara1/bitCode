import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import { Button, Toast } from "flowbite-react";
import Logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { HiExclamation } from "react-icons/hi";
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
        {/* <div className="z-10 flex flex-col max-w-6xl px-3 mx-auto md:min-h-screen p-28 "> */}
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
              alt="REFAA Logo"
            />
          </motion.div>

          <motion.p
            className="z-20 ml-10 text-3xl font-bold lg:text-6xl md:ml-0 animated-refaa-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 3 } }}
            exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
          >
            Ruhuna Engineering Faculty Alumni Association
          </motion.p>
          <motion.p
            className="mt-4 mb-10 ml-10 text-gray-600 font- md:text-3xl sm:text-md md:ml-0 dark:text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 10 } }}
            exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
          >
            Join Us to Reconnect, Collaborate, and Celebrate the Legacy of
            Engineering.
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

          {/* <Toast className="fixed border-2 border-red-700 shadow-xl right-20 top-20">
            <div className="inline-flex items-center justify-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg shrink-0 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="w-5 h-5" />
            </div>
            <div className="pl-4 text-sm font-normal ">
              Please Log Again if you face any issues
            </div>
          </Toast> */}
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
                {/* {posts.slice( -3).map((post) => (
                  <PostCard key={post._id} post={post} className="" />
                ))} */}

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

      <motion.div
        className="fixed top-0 right-0 mb-20 "
        initial={{
          opacity: 1,
          // if odd index card,slide from right instead of left
        }}
        whileInView={{
          opacity: 0,
          x: 0, // Slide in to its original position
          transition: {
            duration: 15, // Animation duration
          },
        }}
        viewport={{ once: true }}
      >
        {orderId && (
          <Toast className="fixed top-0 right-0 flex justify-center mt-20 mr-5 bg-green-400 rounded-full shadow-2xl w-65 drop-shadow-2xl">
            <div className="flex-1 mx-2 font-semibold text-center text-white text-md">
              Payment Table Updated
            </div>
            {/* <Toast.Toggle className="text-white bg-green-500" /> */}
          </Toast>
        )}
      </motion.div>

      
      {showToast && (
        <motion.div
        
        initial={{  opacity: 0 }} // Start from the right (out of view)
        animate={{ x: 0, opacity: 1 }} // Animate to the original position (visible)
        exit={{opacity: 0 }} // Exit by sliding back to the right
        transition={{ duration: 2 }} // Duration of the entrance animation
      >
        <Toast className="fixed mt-2 border-none right-5 top-20 drop-shadow-2xl">
        <div className="flex items-start">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300">
            <MdNotifications className="w-5 h-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Alert</span>
            <div className="mb-2 text-sm font-normal">A new entertainment task is waiting for you.</div>
            <div className="flex gap-2">
              <Link to="" className="w-auto">
                <Button size="xs" className="bg-refaa-blue">Attempt</Button>
              </Link>
              <div className="w-auto">
                <Button color="light" size="xs" onClick={()=>{setShowToast(false);}}>
                  Not now
                </Button>
              </div>
            </div>
          </div>
          <Toast.Toggle />
        </div>
      </Toast>
      </motion.div>
      )}
    </>
  );
}
