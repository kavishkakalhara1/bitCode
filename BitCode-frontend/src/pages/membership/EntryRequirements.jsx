import { Accordion } from 'flowbite-react'
import React from 'react'

export const metadata = {
    title: {
      absolute: 'Entry Requirements',
    },
  }

export default function EntryRequirements() {
  return (
    <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center ">Entry Requirements</h1>

        <Accordion collapseAll className="mt-10 bg-white border-b-4 shadow-xl rounded-3xl border-b-refaa-red">
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
              Ordinary Members
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                Any graduate (who has completed an undergraduate or a
                postgraduate degree) of the Faculty of Engineering, University
                of Ruhuna.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
              Life Members
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                Any ordinary member may become a life member upon paying the
                life membership fee. (Life members of former Civil &
                Environmental Engineering, Electrical & Information Engineering
                and Mechanical & Manufacturing Engineering alumni associations
                will be considered as life members of this association).
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold ring-0 focus:ring-transparent">
              Honorary Members
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                Any person who is not eligible for ordinary membership but has
                rendered distinguished service to the faculty, nominated by the
                executive committee and be elected by the association as an
                honorary member.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>

  )
}
