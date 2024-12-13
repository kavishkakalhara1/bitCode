import CallToAction from "../components/CallToAction";
import { motion } from "framer-motion";

export default function ArticlesPage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center max-w-2xl min-h-screen gap-6 p-3 mx-auto"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-gray-500 text-md">
        Build fun and engaging projects while learning HTML, CSS, and
        JavaScript!
      </p>
      <CallToAction />
    </motion.div>
  );
}
