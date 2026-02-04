// Update Local Time
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

// Form submission handler
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Simulate form submission
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you! Your message has been sent successfully.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Add click functionality to repository cards
    document.querySelectorAll('.repo-card').forEach(card => {
        card.addEventListener('click', function() {
            const repoName = this.querySelector('h3').textContent;
            alert(`Opening repository: ${repoName}`);
            // In real implementation, this would navigate to the repository
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