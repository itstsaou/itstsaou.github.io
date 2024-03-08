import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

const people = [
  {
    name: "Angelina Goniea-Richards",
    role: "President",
    imageComponent: (
      <StaticImage
        className="h-16 w-16 rounded-full"
        src="../images/exec-boards/2023/angelina_goniea-richards.jpg"
        width={64}
        alt="president's profile picture"
      />
    ),
  },
  {
    name: "Saruda Seeharit",
    role: "Vice President",
    imageComponent: (
      <StaticImage
        className="h-16 w-16 rounded-full"
        src="../images/exec-boards/2022/saruda-seeharit.jpg"
        width={64}
        alt="vice president's profile picture"
      />
    ),
  },
  {
    name: "Krerkkiat Chusap",
    role: "Treasurer / Developer",
    imageComponent: (
      <StaticImage
        className="h-16 w-16 rounded-full"
        src="../images/exec-boards/2022/krerkkiat-chusap.png"
        width={64}
        alt="treasurer's profile picture"
      />
    ),
  },
  {
    name: "Jeffrey Shane",
    role: "Faculty Advisor",
    imageComponent: (
      <StaticImage
        className="h-16 w-16 rounded-full"
        src="../images/exec-boards/2022/jeffrey-shane.jpg"
        width={64}
        alt="faculty advisor's profile picture"
      />
    ),
  },
];

export default function LeadershipPanel() {
  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our organization is run by these talented people with the support of
            our lovely members.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                {person.imageComponent}
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
