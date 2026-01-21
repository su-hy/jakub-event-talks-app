
const fs = require('fs');

const talks = [
    {
        title: "The Future of JavaScript",
        speakers: ["Jane Doe"],
        categories: ["JavaScript", "Web Development"],
        duration: 60,
        description: "A deep dive into the next features of JavaScript and what they mean for web development."
    },
    {
        title: "Advanced CSS Techniques",
        speakers: ["John Smith"],
        categories: ["CSS", "Frontend"],
        duration: 60,
        description: "Learn about the latest and greatest in CSS, including Grid, Flexbox, and custom properties."
    },
    {
        title: "Building Scalable APIs with Node.js",
        speakers: ["Peter Jones", "Mary Johnson"],
        categories: ["Node.js", "Backend"],
        duration: 60,
        description: "An in-depth look at how to build and deploy scalable and resilient APIs using Node.js."
    },
    {
        title: "State of the Art in Machine Learning",
        speakers: ["Samantha Lee"],
        categories: ["Machine Learning", "AI"],
        duration: 60,
        description: "A comprehensive overview of the latest trends and research in the field of machine learning."
    },
    {
        title: "The JAMstack Revolution",
        speakers: ["David Chen"],
        categories: ["JAMstack", "Web Development"],
        duration: 60,
        description: "Discover the benefits of the JAMstack architecture and how to build fast and secure sites."
    },
    {
        title: "Cybersecurity in 2026",
        speakers: ["Emily White"],
        categories: ["Cybersecurity", "Security"],
        duration: 60,
        description: "An overview of the current cybersecurity landscape and how to protect your applications."
    }
];

function generateSchedule(talks) {
    let scheduleHtml = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    talks.slice(0, 3).forEach(talk => {
        const startTime = new Date(currentTime);
        const endTime = new Date(startTime.getTime() + talk.duration * 60000);
        scheduleHtml += `
            <div class="talk" data-categories="${talk.categories.join(',').toLowerCase()}">
                <h3>${formatTime(startTime)} - ${formatTime(endTime)}</h3>
                <h4>${talk.title}</h4>
                <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
                <p><strong>Categories:</strong> ${talk.categories.join(', ')}</p>
                <p>${talk.description}</p>
            </div>
        `;
        currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break
    });

    const lunchStartTime = new Date(currentTime);
    const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60000);
    scheduleHtml += `
        <div class="break">
            <h3>${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</h3>
            <h4>Lunch Break</h4>
        </div>
    `;
    currentTime = new Date(lunchEndTime.getTime() + 10 * 60000); // 10 minute break

    talks.slice(3).forEach(talk => {
        const startTime = new Date(currentTime);
        const endTime = new Date(startTime.getTime() + talk.duration * 60000);
        scheduleHtml += `
            <div class="talk" data-categories="${talk.categories.join(',').toLowerCase()}">
                <h3>${formatTime(startTime)} - ${formatTime(endTime)}</h3>
                <h4>${talk.title}</h4>
                <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
                <p><strong>Categories:</strong> ${talk.categories.join(', ')}</p>
                <p>${talk.description}</p>
            </div>
        `;
        currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break
    });

    return scheduleHtml;
}


const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talk Day</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1, h2 {
            text-align: center;
        }
        #search {
            display: block;
            margin: 20px auto;
            padding: 10px;
            width: 50%;
        }
        .schedule {
            max-width: 800px;
            margin: 0 auto;
        }
        .talk, .break {
            background-color: white;
            border-left: 5px solid #007bff;
            padding: 20px;
            margin-bottom: 20px;
        }
        .break {
            border-left-color: #6c757d;
        }
        .talk h3, .break h3 {
            margin-top: 0;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <h1>Tech Talk Day</h1>
    <h2>Event Schedule</h2>
    <input type="text" id="search" placeholder="Search by category...">
    <div class="schedule">
        ${generateSchedule(talks)}
    </div>

    <script>
        const searchInput = document.getElementById('search');
        const talks = document.querySelectorAll('.talk');

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            talks.forEach(talk => {
                const categories = talk.dataset.categories;
                if (categories.includes(searchTerm)) {
                    talk.classList.remove('hidden');
                } else {
                    talk.classList.add('hidden');
                }
            });
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent);

console.log('index.html generated successfully!');
