import React from "react";
import { Accordion } from "flowbite-react";

export default function VisionAndMission() {
  return (
    
    <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
        <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center ">Vision and Mission</h1>

        <Accordion collapseAll className="mt-10 bg-white border-b-4 shadow-xl rounded-3xl border-b-refaa-red ">
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
              Our Vision
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                To be a leading alumni association that nurtures a strong,
                connected community of Ruhuna Engineering graduates, promoting
                professional excellence, lifelong learning, and collaborative
                opportunities that benefit both the alumni and the broader
                society.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
              Our Mission
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                Our mission is to cultivate a strong network among alumni,
                students, and the faculty of Engineering at the University of
                Ruhuna. We aim to support professional development, assist
                recent graduates in finding employment, and foster student
                welfare and industrial programs. By facilitating collaboration
                between the faculty and industry, we ensure academic programs
                meet industry demands and provide opportunities for research and
                development. Our efforts are dedicated to enhancing the overall
                growth and success of our alumni community.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
      </div>
    
  );
}
