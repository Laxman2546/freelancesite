import React, { useEffect, useState } from "react";
import {
  PencilIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  StarIcon,
  BriefcaseIcon,
  LinkIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ClockIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import FreelancerNavbar from "../components/FreelancerNavbar.jsx";
const Profile = () => {
  const [freelancerData, setFreelancerData] = useState({
    userName: "Lakshman Kumar",
    title: "Full Stack Developer & UI/UX Designer",
    location: "Hyderabad, India",
    email: "lakshman@example.com",
    phone: "+91 9876543210",
    rating: 4.8,
    completedProjects: 47,
    hourlyRate: 25,
    bio: "Passionate full-stack developer with 5+ years of experience in creating scalable web applications. Specialized in React, Node.js, and modern UI/UX design principles.",
    skills: [
      "React",
      "Node.js",
      "Python",
      "UI/UX Design",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    languages: ["English", "Hindi", "Telugu"],
    availability: "Available",
    responseTime: "Within 2 hours",
  });

  const [experience] = useState([
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      duration: "2022 - Present",
      description:
        "Led development of 5+ web applications serving 10K+ users. Implemented microservices architecture and improved system performance by 40%.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "StartupXYZ",
      duration: "2020 - 2022",
      description:
        "Developed responsive web interfaces using React and TypeScript. Collaborated with design team to create pixel-perfect implementations.",
    },
  ]);

  const [education] = useState([
    {
      id: 1,
      degree: "Bachelor of Technology",
      field: "Computer Science Engineering",
      institution: "JNTUH University",
      year: "2019",
    },
  ]);

  const [portfolio] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/lakshman/ecommerce",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Real-time collaborative task management application",
      technologies: ["React", "Socket.io", "Express"],
      link: "https://github.com/lakshman/taskapp",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "Data visualization dashboard with interactive charts",
      technologies: ["React", "D3.js", "Python"],
      link: "https://github.com/lakshman/analytics",
      image: "https://via.placeholder.com/300x200",
    },
  ]);

  const [certifications] = useState([
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer",
  ]);

  const [socialLinks] = useState({
    github: "https://github.com/lakshman",
    linkedin: "https://linkedin.com/in/lakshman",
    website: "https://lakshman.dev",
    behance: "https://behance.net/lakshman",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full bg-white shadow-sm border-b fixed top-0 z-40">
        <div className="container mx-auto">
          <FreelancerNavbar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl mt-[100px]">
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <img
                src="https://via.placeholder.com/120x120"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {freelancerData.userName}
                    </h1>
                    <p className="text-xl text-gray-600 mt-1">
                      {freelancerData.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {freelancerData.availability}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPinIcon className="w-5 h-5" />
                    <span className="text-sm">{freelancerData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">
                      {freelancerData.rating} Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BriefcaseIcon className="w-5 h-5" />
                    <span className="text-sm">
                      {freelancerData.completedProjects} Projects
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockIcon className="w-5 h-5" />
                    <span className="text-sm">
                      {freelancerData.responseTime}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {freelancerData.bio}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <PencilIcon className="w-5 h-5" />
                  Edit Profile
                </button>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ${freelancerData.hourlyRate}
                  </div>
                  <div className="text-gray-600 text-sm">per hour</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Portfolio Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BriefcaseIcon className="w-6 h-6 text-blue-600" />
                Portfolio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <LinkIcon className="w-4 h-4" />
                        View Project
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BriefcaseIcon className="w-6 h-6 text-green-600" />
                Work Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-l-4 border-green-500 pl-6 relative"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {exp.title}
                    </h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-3">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6 text-purple-600" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600">{edu.field}</p>
                    <p className="text-gray-500 text-sm">
                      {edu.institution} • {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <EnvelopeIcon className="w-5 h-5" />
                  <span className="text-sm">{freelancerData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <PhoneIcon className="w-5 h-5" />
                  <span className="text-sm">{freelancerData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <GlobeAltIcon className="w-5 h-5" />
                  <span className="text-sm">English, Hindi, Telugu</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {freelancerData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 px-3 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Certifications
              </h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700 text-sm"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Links</h3>
              <div className="space-y-3">
                <a
                  href={socialLinks.github}
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span className="text-sm">GitHub Profile</span>
                </a>
                <a
                  href={socialLinks.linkedin}
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span className="text-sm">LinkedIn Profile</span>
                </a>
                <a
                  href={socialLinks.website}
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <GlobeAltIcon className="w-5 h-5" />
                  <span className="text-sm">Personal Website</span>
                </a>
                <a
                  href={socialLinks.behance}
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span className="text-sm">Behance Portfolio</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <span className="font-semibold">96%</span>
                </div>
                <div className="flex justify-between">
                  <span>On-time Delivery</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Repeat Clients</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Earnings</span>
                  <span className="font-semibold">$47K+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
