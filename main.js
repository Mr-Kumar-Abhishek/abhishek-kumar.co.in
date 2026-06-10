document.addEventListener('DOMContentLoaded', () => {
    // Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Typing Effect for Roles
    const roles = ["Software Developer.", "AI/ML Engineer.", "Quantum Computing Dev.", "Game Developer.", "Polymath."];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(typeEffect, 1000);

    // Fetch GitHub Projects
    const fetchProjects = async () => {
        const container = document.getElementById('projects-container');
        try {
            const response = await fetch('https://api.github.com/users/Mr-Kumar-Abhishek/repos?sort=updated&per_page=100&type=all');
            if (!response.ok) throw new Error('Failed to fetch repositories');
            
            const repos = await response.json();
            


            // Fetch collaborated repos from search API to distinguish contributed forks
            let collaboratedRepos = new Set();
            try {
                const searchOpts = { headers: { 'Accept': 'application/vnd.github.cloak-preview' } };
                const [res1, res2] = await Promise.all([
                    fetch('https://api.github.com/search/commits?q=author-email:mr.kumar.abhishek@outlook.in&per_page=100', searchOpts),
                    fetch('https://api.github.com/search/commits?q=author-email:mr.kumar.abhishek@email.com&per_page=100', searchOpts)
                ]);
                
                if (res1.ok) {
                    const data1 = await res1.json();
                    if (data1.items) data1.items.forEach(i => collaboratedRepos.add(i.repository.name));
                }
                if (res2.ok) {
                    const data2 = await res2.json();
                    if (data2.items) data2.items.forEach(i => collaboratedRepos.add(i.repository.name));
                }
            } catch (e) {
                console.warn('Could not fetch commit data:', e);
            }

            // Filter out forks that you haven't committed to
            const finalRepos = repos.filter(repo => {
                // Keep if it's not a fork, or if it is a fork and you committed to it
                return !repo.fork || collaboratedRepos.has(repo.name);
            });

            const itchProjects = [
                {
                    name: "Emoji Assault",
                    description: "A rip off of a classic game with using emojis",
                    html_url: "https://mr-kumar-abhishek.itch.io/emoji-assault",
                    imageUrl: "https://img.itch.zone/aW1nLzIwNDgzMjI5LnBuZw==/315x250%23c/o3wP%2BG.png",
                    isItch: true
                },
                {
                    name: "belonging",
                    description: "A place to belong",
                    html_url: "https://mr-kumar-abhishek.itch.io/belonging",
                    imageUrl: "https://img.itch.zone/aW1nLzEzMjEzNjUyLnBuZw==/315x250%23c/O64%2FLN.png",
                    isItch: true
                },
                {
                    name: "emoji man",
                    description: "A rip off of a classic game with emojis and random level generation",
                    html_url: "https://mr-kumar-abhishek.itch.io/emoji-man",
                    imageUrl: "https://img.itch.zone/aW1nLzIwNDM2MzgxLmpwZw==/315x250%23c/aaEUAS.jpg",
                    isItch: true
                }
            ];

            const allProjects = [...itchProjects, ...finalRepos];

            container.innerHTML = ''; // Clear loading spinner
            
            allProjects.forEach(repo => {
                // We use github's OpenGraph image endpoint for proper images of the project if an image isn't explicitly provided
                let imageUrl = repo.imageUrl || `https://opengraph.githubassets.com/1/Mr-Kumar-Abhishek/${repo.name}`;
                
                // If the project has a live website, display its screenshot instead of the repo preview!
                if (!repo.imageUrl && repo.homepage && repo.homepage.startsWith('http')) {
                    imageUrl = `https://image.thum.io/get/width/600/crop/600/${repo.homepage}`;
                }

                let badgeHTML = '';
                if (repo.isItch) {
                    badgeHTML = '<span class="project-badge itch-badge">Game</span>';
                } else if (repo.owner && repo.owner.login !== 'Mr-Kumar-Abhishek') {
                    badgeHTML = '<span class="project-badge collab-badge">Collaborator</span>';
                } else if (repo.fork) {
                    if (collaboratedRepos.has(repo.name)) {
                        badgeHTML = '<span class="project-badge collab-badge">Contributed Fork</span>';
                    } else {
                        badgeHTML = '<span class="project-badge fork-badge">Fork</span>';
                    }
                } else {
                    badgeHTML = '<span class="project-badge creator-badge">Creator</span>';
                }

                const card = document.createElement('div');
                card.className = 'project-card glass-panel';
                card.innerHTML = `
                    <div style="position: relative;">
                        <img src="${imageUrl}" alt="${repo.name} Preview" class="project-image" loading="lazy" onerror="this.src='https://via.placeholder.com/600x300/0f111a/00f0ff?text=Project+Preview'">
                        ${badgeHTML}
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${repo.name}</h3>
                        <p class="project-desc">${repo.description || 'A fascinating project by Abhishek Kumar.'}</p>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"><i class="${repo.isItch ? 'fas fa-gamepad' : 'fab fa-github'}"></i> ${repo.isItch ? 'Play on Itch' : 'Repository'}</a>
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
            
        } catch (error) {
            console.error('Error fetching projects:', error);
            container.innerHTML = `
                <div class="glass-panel" style="padding: 2rem; text-align: center; grid-column: 1 / -1;">
                    <p>Unable to load projects at the moment. Please visit my <a href="https://github.com/Mr-Kumar-Abhishek" target="_blank" style="color: var(--accent-1);">GitHub Profile</a> directly.</p>
                </div>
            `;
        }
    };

    fetchProjects();

    // Fetch Blog Articles
    const fetchArticles = async () => {
        const container = document.getElementById('articles-container');
        try {
            // Using a relative path handles GitHub Pages custom domains gracefully and avoids CORS issues
            const response = await fetch('/blog/atom.xml');
            if (!response.ok) throw new Error('Failed to fetch articles');
            
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, 'application/xml');
            
            // The feed is actually an RSS 2.0 feed disguised as atom.xml
            const items = Array.from(xml.querySelectorAll('item')).slice(0, 6);
            
            container.innerHTML = '';
            
            if (items.length === 0) {
                container.innerHTML = '<div class="glass-panel" style="padding: 2rem; text-align: center; grid-column: 1 / -1;"><p>No articles found.</p></div>';
                return;
            }

            items.forEach(item => {
                const title = item.querySelector('title')?.textContent || 'Untitled';
                const link = item.querySelector('link')?.textContent || '#';
                let summary = item.querySelector('description')?.textContent || '';
                
                // Strip HTML tags from summary and limit length
                const tmp = document.createElement('DIV');
                tmp.innerHTML = summary;
                summary = tmp.textContent || tmp.innerText || '';
                if (summary.length > 150) summary = summary.substring(0, 150) + '...';

                const published = item.querySelector('pubDate')?.textContent || '';
                const dateString = published ? new Date(published).toLocaleDateString() : '';

                // Generate a thumbnail using thum.io
                const imageUrl = `https://image.thum.io/get/width/600/crop/600/${link}`;

                const card = document.createElement('div');
                card.className = 'project-card glass-panel';
                card.innerHTML = `
                    <div style="position: relative;">
                        <img src="${imageUrl}" alt="${title}" class="project-image" loading="lazy" onerror="this.src='https://via.placeholder.com/600x300/0f111a/ff0055?text=Article'">
                        <span class="project-badge creator-badge" style="background: rgba(160, 165, 181, 0.85); border-color: #a0a5b5; color: #fff;">Article</span>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${title}</h3>
                        ${dateString ? `<p style="color: var(--accent-1); font-size: 0.8rem; margin-bottom: 0.5rem;">${dateString}</p>` : ''}
                        <p class="project-desc">${summary}</p>
                        <div class="project-links">
                            <a href="${link}" target="_blank" rel="noopener noreferrer"><i class="fas fa-book-open"></i> Read Article</a>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
            
        } catch (error) {
            console.error('Error fetching articles:', error);
            container.innerHTML = `
                <div class="glass-panel" style="padding: 2rem; text-align: center; grid-column: 1 / -1;">
                    <p>Unable to load articles at the moment. Please visit my <a href="https://mr-kumar-abhishek.github.io/blog/" target="_blank" style="color: var(--accent-1);">Blog</a> directly.</p>
                </div>
            `;
        }
    };

    fetchArticles();

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
