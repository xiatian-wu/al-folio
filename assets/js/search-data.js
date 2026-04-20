// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/about-me/";
    },
  },{id: "nav-research",
          title: "Research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/about-me/research/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/about-me/blog/";
          },
        },{id: "post-how-i-built-this-website",
        
          title: "How I Built This Website",
        
        description: "A plain-language walkthrough of building an academic personal website with AI assistance — what we built, decisions made, and tools used.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/about-me/blog/2026/building-personal-website/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/about-me/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/about-me/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-covid-19-amp-travel-behavior",
          title: 'COVID-19 &amp;amp; Travel Behavior',
          description: "Investigating pandemic-driven shifts in work arrangements, vehicle ownership, and daily travel patterns.",
          section: "Projects",handler: () => {
              window.location.href = "/about-me/projects/covid-travel/";
            },},{id: "projects-ev-adoption-amp-consumer-behavior",
          title: 'EV Adoption &amp;amp; Consumer Behavior',
          description: "Understanding consumer perceptions, knowledge, and willingness-to-pay for electric and alternative fuel vehicles.",
          section: "Projects",handler: () => {
              window.location.href = "/about-me/projects/ev-adoption/";
            },},{id: "projects-adoption-of-recycled-plastic-products",
          title: 'Adoption of Recycled Plastic Products',
          description: "Applying discrete choice experiments to understand consumer willingness-to-pay for recycled plastic products and the role of information treatments.",
          section: "Projects",handler: () => {
              window.location.href = "/about-me/projects/recycled-plastic/";
            },},{id: "projects-ride-hailing-amp-mobility",
          title: 'Ride-hailing &amp;amp; Mobility',
          description: "Examining travel patterns, multimodality, and the broader mobility impacts of ride-hailing services.",
          section: "Projects",handler: () => {
              window.location.href = "/about-me/projects/ridehailing/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/about-me/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/about-me/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/about-me/about-me/assets/pdf/cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%78%69%61%74%69%61%6E.%69%6F%67%61%6E%73%65%6E@%67%77%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=ASuKttYAAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-4851-1323", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/xiatianwu", "_blank");
        },
      },];
