# Abhishek Kumar | Personal Portfolio

A sleek, modern, and highly dynamic personal portfolio website built with pure HTML, CSS, and Vanilla JavaScript. Designed with a premium glassmorphism aesthetic, this portfolio dynamically aggregates content from GitHub, Itch.io, and RSS feeds to provide a real-time showcase of projects and research articles.

Live Site: [abhishek-kumar.co.in](https://abhishek-kumar.co.in/)

## ✨ Key Features

*   **Premium Glassmorphism Design:** A visually striking UI utilizing transparent, frosted-glass panels (`backdrop-filter`) overlaid on dynamic, floating background gradients.
*   **Dynamic GitHub Integration:** 
    *   Automatically fetches and displays public repositories using the GitHub REST API.
    *   Intelligent commit search logic to distinguish between standard "Forks" and "Contributed Forks" (e.g., PuppyLinux woof-CE).
    *   Automatically filters out cloned forks that contain no personal commits, keeping the portfolio clean.
*   **Live Website Previews:** Integrates with the `image.thum.io` API to automatically capture and display real-time visual screenshots of deployed applications if a repository has a `homepage` link.
*   **RSS Blog Syndication:** Dynamically fetches, parses, and displays the latest research articles directly from a cross-origin RSS 2.0 feed, completely automated.
*   **SEO Safe:** Includes `data-nosnippet` directives on aggregated content to ensure the primary blog retains total SEO authority and avoids duplicate content penalties.
*   **Zero Dependencies:** Built entirely without massive frontend frameworks. No React, no Vue, no build steps. Just pure, highly optimized web standards.
*   **Fully Responsive:** Fluid CSS Grid and Flexbox layouts ensure the site looks gorgeous on 4K monitors and mobile phones alike.

## 🚀 Architecture

*   **`index.html`**: The semantic skeleton of the application. Contains the layout, navigation, and placeholder containers for dynamic content.
*   **`index.css`**: The core styling engine. Contains all custom CSS variables, the glassmorphism utility classes, complex animations, and responsive media queries.
*   **`main.js`**: The brains of the operation. Handles asynchronous data fetching, XML/RSS parsing, DOM manipulation, and dynamic HTML injection for the grids.

## 🛠️ Local Development

Because this project uses vanilla web technologies, running it locally is incredibly simple.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mr-Kumar-Abhishek/abhishek-kumar.co.in.git
    cd abhishek-kumar.co.in
    ```
2.  **Serve the files:**
    Since the site makes cross-origin fetch requests, opening `index.html` directly from the file system (`file://`) may cause CORS restrictions in some browsers. It is recommended to use a local development server.
    
    Using Python:
    ```bash
    python -m http.server 8000
    ```
    Using Node.js (`http-server` or `live-server`):
    ```bash
    npx live-server
    ```
3.  **View the site:** Open your browser and navigate to `http://localhost:8000`.

## 🤝 Contribution Tracking

The portfolio uses an advanced filtering system to highlight Open Source contributions. By default, it searches the GitHub API for commits linked to specific email addresses. If you need to manually force a repository to appear as a "Contributed Fork" (e.g., to bypass GitHub API pagination limits for very old commits), you can add the repository name to the `knownContributedForks` array in `main.js`:

```javascript
const knownContributedForks = ['puppylinux-woof-CE.github.io', 'tuffy', 'woof-CE', 'context-board'];
```

## 📄 License

&copy; Abhishek Kumar. All rights reserved.
