Route AI ✈️
Route AI is an AI-powered travel planning web application that helps
users create personalized travel itineraries based on their destination,
budget, trip duration, interests, and preferences. It uses Google Gemini
AI to generate travel recommendations and day-wise trip plans.
✨ Features
- Generate personalized travel itineraries with AI.
- Customize trip plans based on destination, budget, duration, and
  interests.
- Get day-wise travel suggestions and recommendations.
- Simple web interface for submitting travel preferences and viewing
  results.
- Backend API that connects the frontend to Google Gemini AI.
- Keeps the Gemini API key on the server instead of exposing it in
  frontend code.
🧰 Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- AI: Google Gemini API
- Configuration: dotenv
📁 Project Structure
Route-AI/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
The structure above is a representative layout. If your actual
filenames differ, update this section to match your repository.

⚙️ Prerequisites
Before running Route AI, install:
- Node.js (which includes npm)
- A Google Gemini API key from Google AI
  Studio
🚀 Getting Started
1. Clone the repository
Replace YOUR-USERNAME with your GitHub username and YOUR-REPOSITORY
with the repository name.
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
2. Install dependencies
npm install
3. Configure environment variables
Create a .env file in the project root:
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
Use the exact environment-variable name expected by your server.js
file. Never commit your real API key to GitHub.
4. Start the server
If your package.json defines a start script, run:
npm start
Otherwise, if the server entry point is server.js, run:
node server.js
5. Open the application
Open the local URL shown in the terminal. If the server uses port
3000, the URL is usually:
http://localhost:3000
🔌 API Endpoint
POST /api/plan
Route AI uses this endpoint to send travel-planning requests to the
backend, which communicates with Gemini AI and returns a generated plan.
The exact request fields and response format depend on the
implementation in your server.js and frontend JavaScript.
Example request shape (adapt the field names to your implementation):
{
  "destination": "Goa",
  "duration": 4,
  "budget": "Moderate",
  "interests": ["beaches", "local food", "sightseeing"]
}
🔐 Security Notes
- Keep .env out of version control.
- Do not place your Gemini API key in frontend JavaScript or commit it
  to a public repository.
- Add .env to .gitignore:
node_modules/
.env
- Validate user input on the backend and handle API errors without
  exposing secrets.
🛠️ Troubleshooting
- Missing API key: Check that .env exists and that its variable
  name matches the one read by the server.
- Dependency errors: Run npm install from the project directory.
- Port already in use: Set a different PORT value if your server
  supports environment-based ports.
- AI/API errors: Verify the API key, model name, API access,
  quota, and the error details in the server terminal.
- Endpoint errors: Confirm that the frontend request URL and
  backend route both use /api/plan.
🌱 Future Improvements
Potential enhancements include:
- Maps and route visualization.
- Hotel, transport, and attraction recommendations.
- Estimated travel costs and budget breakdowns.
- Saving, editing, and sharing itineraries.
- User accounts and trip history.
- Multi-language support and improved accessibility.
🤝 Contributing
Contributions and suggestions are welcome.
1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Submit a pull request describing the improvement.
📄 License
No license has been specified yet. Add a LICENSE file and update this
section before distributing the project for reuse.
Route AI --- Plan smarter. Travel better.
