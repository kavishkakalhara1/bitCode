import React from 'react'
import { Accordion } from "flowbite-react";

export const metadata = {
    title: {
      absolute: 'Affiliation',
    },
  }
  
  export default function Affiliation() {
    return (
      <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center ">Affiliation</h1>
  
          <Accordion collapseAll className="mt-10 bg-white border-b-4 shadow-xl rounded-3xl border-b-refaa-red drop-shadow">
            <Accordion.Panel  >
              <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
                Overview
              </Accordion.Title>
              <Accordion.Content>
                <p className="mt-4 text-base text-justify">
                  The Ruhuna Engineering Faculty Alumni Association (REFAA)
                  extends its reach through various affiliations known as
                  Chapters. These Chapters enable alumni to connect, network, and
                  support each other and the university, regardless of their
                  geographic location.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel >
              <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
                Chapter Structure
              </Accordion.Title>
              <Accordion.Content>
                <p className="mt-4 text-base text-justify">
                  All affiliations of REFAA are operated as Chapters. Each Chapter
                  functions under the main association, maintaining its unique
                  activities and focus while aligning with REFAA&apos;s overall
                  mission. For example, the Ruhuna Engineering Faculty Alumni
                  Association - Australian Chapter is a prominent affiliate.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            
            <Accordion.Panel>
              <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
                Guidelines for Forming a Chapter
              </Accordion.Title>
              <Accordion.Content>
                <p className="mt-4 text-base text-justify">
                  To ensure consistency and alignment with REFAA&apos;s goals, forming
                  a new Chapter requires prior approval from the Executive
                  Committee. The following guidelines outline the process and
                  requirements:
                </p>
                <div className="flex">
                  <ol className="mt-4 text-base list-decimal list-inside">
                    <li>
                      {" "}
                      Initial Approval: Prior approval must be granted by the
                      Executive Committee to form an affiliate.
                    </li>
                    <li>
                      {" "}
                      Annual Reports: The Chairman of each Chapter is required to
                      submit annual audited reports to the association.
                    </li>
                    <li>
                      {" "}
                      Affiliation Fee: An annual affiliation fee must be paid by
                      the Chapter to the association. The fee amount is determined
                      at the time of initiating the Chapter.
                    </li>
                    <li>
                      {" "}
                      Governance: While Chapters are free to operate individually,
                      the association governs the activities of every Chapter to
                      ensure alignment with the overall mission and objectives.
                    </li>
                  </ol>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
                How to Form a Chapter
              </Accordion.Title>
              <Accordion.Content>
                <p className="mt-4 text-base ">
                  Interested in forming a new Chapter? Here&apos;s how:
                </p>
  
                <div className="flex">
                  <ol className="mt-4 text-base list-decimal list-inside">
                    <li>
                      {" "}
                      Initial Interest: Gather a group of interested alumni and
                      discuss your ideas.
                    </li>
                    <li>
                      {" "}
                      Approval Process: Submit a proposal to the REFAA Executive
                      Committee for approval.
                    </li>
                    <li>
                      {" "}
                      Organize: Set up your Chapter structure, plan initial
                      meetings, and outline key activities.
                    </li>
                    <li>
                      {" "}
                      Reporting: Submit annual audited reports and pay the annual
                      affiliation fee to maintain your Chapter&apos;s affiliation with
                      REFAA.
                    </li>
                  </ol>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            
            <Accordion.Panel>
              <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
                Benefits of Forming a Chapter
              </Accordion.Title>
              <Accordion.Content>
                <p className="mt-4 text-base">
                  Forming a Chapter provides numerous benefits:
                </p>
  
                <div className="flex">
                  <ul className="mt-4 text-base list-disc list-inside">
                    <li>
                      {" "}
                      Connect with fellow alumni in your region or industry.
                    </li>
                    <li>
                      {" "}
                      Access professional development resources and career
                      support.
                    </li>
                    <li> Participate in social and professional events.</li>
                    <li>
                      {" "}
                      Contribute to the growth and success of the university and
                      its students.
                    </li>
                  </ul>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
                Existing Chapters
              </Accordion.Title>
              <Accordion.Content>
                <p className="mt-4 text-base text-justify">
                  Australian Chapter: This Chapter supports alumni in Australia by
                  organizing networking events, offering professional development
                  resources, and helping new graduates transition to life and work
                  in Australia.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            
          </Accordion>
        </div>
      </div>
    );
  }
  