export const siteConfig = {
  company: {
    name: "Codecrest",
    description:
      "A product studio partnering with ambitious teams to ship AI-native platforms, modernize cloud stacks, and keep critical systems running.",
    location:
      "Office # 100, 101 Second Floor, Kohinoor 1, Faisalabad, Pakistan",
    email: "hello@codecrest.com",
    phonePrimary: "+92 300 1234567",
    phoneSecondary: "+92 321 9876543",
    socials: {
      twitter: "https://twitter.com/codecrest",
      linkedin: "https://www.linkedin.com/company/codecrest",
      github: "https://github.com/codecrest",
      instagram: "https://instagram.com/codecreststudio",
    },
  },
  columns: [
    {
      title: "Company",
      links: [
        { id: "company-overview", title: "Overview", url: "/" },
        { id: "company-about", title: "About", url: "/about" },
        { id: "company-leadership", title: "Leadership", url: "/about#leadership" },
        { id: "company-culture", title: "Culture", url: "/about#culture" },
      ],
    },
    {
      title: "Services",
      links: [
        {
          id: "service-digital-consulting",
          title: "Digital Consulting",
          url: "/services/digital-consulting-strategy",
        },
        {
          id: "service-generative-ai",
          title: "Generative AI",
          url: "/services/generative-ai",
        },
        {
          id: "service-data-modernization",
          title: "Data Modernization",
          url: "/services/data-modernization",
        },
        {
          id: "service-cloud-ops",
          title: "Cloud Operations",
          url: "/services/cloud-operations-migration",
        },
      ],
    },
    {
      title: "Work",
      links: [
        { id: "work-projects", title: "Projects", url: "/projects" },
        {
          id: "work-case-study",
          title: "Enterprise AI Platform",
          url: "/projects/enterprise-ai-platform",
        },
        {
          id: "work-connected-intelligence",
          title: "Connected Intelligence",
          url: "/projects/connected-intelligence-hub",
        },
        { id: "work-contact", title: "Start a Project", url: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { id: "resource-blogs", title: "Insights & Research", url: "/blogs" },
        { id: "resource-services", title: "All Services", url: "/services" },
        {
          id: "resource-methodology",
          title: "Delivery Playbook",
          url: "/about#timeline",
        },
        {
          id: "resource-press",
          title: "Press & Media",
          url: "mailto:hello@codecrest.com",
        },
      ],
    },
  ],
};
