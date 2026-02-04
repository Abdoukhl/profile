// GitHub API Configuration
const GITHUB_USERNAME = 'Abdoukhl';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Cache management
let repositoriesCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch repositories from GitHub API with caching
async function fetchGitHubRepositories() {
    const now = Date.now();
    
    // Return cached data if still valid
    if (repositoriesCache && (now - lastFetchTime) < CACHE_DURATION) {
        return repositoriesCache;
    }
    
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        const sortedRepos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 6);
        
        // Update cache
        repositoriesCache = sortedRepos;
        lastFetchTime = now;
        
        return sortedRepos;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        // Return cached data if available, even if expired
        return repositoriesCache || [];
    }
}

// Update repository cards with real GitHub data
async function updateRepositories() {
    const repos = await fetchGitHubRepositories();
    if (!repos || repos.length === 0) return;

    const container = document.querySelector('.repositories-grid');
    if (!container) return;

    container.innerHTML = '';

    repos.forEach(repo => {
        const languageColors = {
            'Java': '#b07219',
            'JavaScript': '#f1e05a',
            'PHP': '#4F5D95',
            'Python': '#3572A5',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Blade': '#f7523f',
            'EJS': '#A91E50',
            'TypeScript': '#2b7489',
            'Vue': '#2c3e50',
            'React': '#61dafb',
            'Node.js': '#339933',
            'C++': '#f34b7d',
            'C#': '#178600',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Swift': '#ffac45',
            'Kotlin': '#A97BFF'
        };

        const language = repo.language || 'Unknown';
        const color = languageColors[language] || '#586069';
        
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        repoCard.innerHTML = `
            <div class="repo-header">
                <h3><i class="fas fa-folder"></i> ${repo.name}</h3>
                <span class="repo-language" style="background: ${color}; color: white;">${language}</span>
            </div>
            <p class="repo-description">${repo.description || 'No description available'}</p>
            <div class="repo-footer">
                <span class="repo-stats"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                <span class="repo-stats"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                <span class="repo-updated">Updated ${formatDate(repo.updated_at)}</span>
            </div>
        `;
        
        repoCard.addEventListener('click', () => {
            window.open(repo.html_url, '_blank');
        });
        
        container.appendChild(repoCard);
    });

    // Update stats
    updateStats(repos);
}

// Auto-refresh repositories periodically
function startAutoRefresh() {
    // Refresh every 5 minutes
    setInterval(async () => {
        console.log('Auto-refreshing repositories...');
        await updateRepositories();
    }, 5 * 60 * 1000);
    
    // Also refresh when page becomes visible again (user returns to tab)
    document.addEventListener('visibilitychange', async () => {
        if (!document.hidden) {
            console.log('Page became visible, refreshing repositories...');
            await updateRepositories();
        }
    });
}

// Manual refresh button
function addRefreshButton() {
    const sectionTitle = document.querySelector('#repositories .section-title');
    if (!sectionTitle) return;
    
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'refresh-btn';
    refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
    refreshBtn.style.cssText = `
        margin-left: auto;
        padding: 8px 16px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: background 0.2s;
    `;
    
    refreshBtn.addEventListener('click', async () => {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        refreshBtn.disabled = true;
        
        // Clear cache to force fresh fetch
        repositoriesCache = null;
        lastFetchTime = 0;
        
        await updateRepositories();
        
        setTimeout(() => {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            refreshBtn.disabled = false;
        }, 1000);
    });
    
    sectionTitle.appendChild(refreshBtn);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'today';
    if (diffDays === 2) return 'yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

// Update user statistics
function updateStats(repos) {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    // Update stat numbers if they exist
    const repoCount = document.querySelector('.stat-number');
    if (repoCount) {
        repoCount.textContent = repos.length;
    }
    
    // Update footer stats
    const footerRepos = document.querySelector('.footer-stats span:first-child');
    if (footerRepos) {
        footerRepos.innerHTML = `<i class="fas fa-code-branch"></i> ${repos.length} Repositories`;
    }
}

// Fetch contribution data (simplified version)
async function fetchContributions() {
    // Note: GitHub GraphQL API would be needed for real contribution data
    // For now, we'll keep the existing generated graph
    console.log('Contributions graph using generated data');
}

// Initialize GitHub data
async function initializeGitHubData() {
    await updateRepositories();
    await fetchContributions();
}
function updateLocalTime() {
    const now = new Date();
    const options = {
        timeZone: 'Africa/Algiers',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
    
    let timeStr = '';
    let dateStr = '';
    
    parts.forEach(part => {
        if (part.type === 'hour' || part.type === 'minute' || part.type === 'second') {
            timeStr += part.value;
            if (part.type === 'hour') timeStr += ':';
            if (part.type === 'minute') timeStr += ':';
        }
        if (part.type === 'weekday' || part.type === 'month' || part.type === 'day' || part.type === 'year') {
            dateStr += part.value + ' ';
        }
    });
    
    document.getElementById('local-time').textContent = 
        `${dateStr.trim()} | ${timeStr}`;
}

// Generate Contribution Graph with realistic data
function generateContributionGraph() {
    const graph = document.getElementById('contribution-graph');
    
    // Create main container with proper layout
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '8px';
    
    // Create days column (left side)
    const daysColumn = document.createElement('div');
    daysColumn.className = 'graph-days';
    
    const daysOfWeek = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'graph-day';
        dayElement.textContent = day;
        daysColumn.appendChild(dayElement);
    });
    
    // Create graph area container
    const graphArea = document.createElement('div');
    graphArea.style.flex = '1';
    
    // Create month labels
    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    const monthsContainer = document.createElement('div');
    monthsContainer.className = 'graph-months';
    
    months.forEach(month => {
        const monthElement = document.createElement('div');
        monthElement.className = 'graph-month';
        monthElement.textContent = month;
        monthsContainer.appendChild(monthElement);
    });
    
    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'graph-grid';
    
    // Generate 52 weeks (columns) with mostly low activity
    for (let week = 0; week < 52; week++) {
        const weekColumn = document.createElement('div');
        weekColumn.className = 'week-column';
        
        // Generate 7 days (rows) per week
        for (let day = 0; day < 7; day++) {
            const cell = document.createElement('div');
            cell.className = 'contribution-cell';
            
            // Create realistic pattern: mostly no activity, some low activity
            let contributionLevel = 0;
            
            // Add some activity in recent weeks
            if (week >= 45) {
                contributionLevel = Math.random() > 0.6 ? (Math.random() > 0.7 ? 2 : 1) : 0;
            } else {
                // Occasional activity throughout the year
                contributionLevel = Math.random() > 0.85 ? 1 : 0;
            }
            
            cell.classList.add(`lvl${contributionLevel}`);
            
            // Tooltip
            const contributions = contributionLevel === 0 ? 0 : contributionLevel * 2;
            cell.setAttribute('title', `${contributions} contributions`);
            
            weekColumn.appendChild(cell);
        }
        
        gridContainer.appendChild(weekColumn);
    }
    
    graphArea.appendChild(monthsContainer);
    graphArea.appendChild(gridContainer);
    
    container.appendChild(daysColumn);
    container.appendChild(graphArea);
    graph.appendChild(container);
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Scroll to section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form submission handler with real email functionality
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Create email content
    const emailContent = {
        to: 'abderrahmanekhial05@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        body: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from Abderrahmane Khial's Portfolio Website
        `
    };
    
    // Method 1: Try to open email client (most reliable)
    const mailtoLink = `mailto:abderrahmanekhial05@gmail.com?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    
    // Try to send via mailto
    window.location.href = mailtoLink;
    
    // Show success message after a short delay
    setTimeout(() => {
        alert('Thank you for your message! Your email client should open with the message pre-filled. Please send it to contact Abderrahmane.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
    
    // Method 2: Alternative - Web3Forms (free service)
    // Uncomment below if you want to use a form service instead
    /*
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            apikey: 'YOUR_WEB3FORMS_API_KEY', // Get free key from web3forms.com
            name: name,
            email: email,
            subject: subject,
            message: message,
            from_name: 'Portfolio Contact Form',
            to_email: 'abderrahmanekhial05@gmail.com'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you! Your message has been sent successfully.');
            this.reset();
        } else {
            alert('Sorry, there was an error. Please try again.');
        }
    })
    .catch(error => {
        alert('Error sending message. Please try again or email directly.');
        console.error('Error:', error);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
    */
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GitHub data first
    initializeGitHubData();
    
    // Add refresh button for repositories
    addRefreshButton();
    
    // Start auto-refresh for repositories
    startAutoRefresh();
    
    // Set initial time and update every second
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
    
    // Generate contribution graph
    generateContributionGraph();
    
    // Animate repository cards on hover
    document.querySelectorAll('.repo-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add animation to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let scrollY = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
});