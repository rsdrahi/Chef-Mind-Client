#  Chef Mind - AI Recipe Platform

Chef Mind is a modern AI-powered recipe management platform where users can discover recipes, search meals, save favorite recipes, and generate intelligent recipe insights using Google's Gemini AI.

The platform provides a smooth cooking experience with a responsive UI, powerful filtering system, and AI-generated recipe summaries.

##  Live Website

 https://chef-mind-theta.vercel.app/

---

##  Features

###  Recipe Management

- View all available recipes
- Search recipes by title
- Filter recipes by:
  - Category
  - Cuisine
  - Difficulty
- Sort recipes:
  - Latest recipes
  - Oldest recipes
  - Title ascending
  - Title descending

---

###  AI Recipe Assistant

Integrated with Google Gemini AI.

Users can generate:

- Recipe summary
- Health benefits
- Chef tips
- Food and drink pairing suggestions

The AI assistant helps users understand recipes better and improve their cooking experience.

---

###  Save Recipes

Users can:

- Save favorite recipes
- View saved recipes
- Remove saved recipes

---

###  Recipe Details

Each recipe contains:

- Recipe image
- Description
- Ingredients
- Cooking instructions
- Cuisine information
- Cooking difficulty
- Cooking time
- Serving information

---

###  Responsive Design

Fully responsive UI optimized for:

- Desktop
- Tablet
- Mobile devices

---

#  Technology Stack

## Frontend

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- DaisyUI
- Hero UI
- React Icons
- Axios / Fetch API

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- MongoDB Driver

## AI Integration

- Google Gemini AI
- @google/genai SDK

## Deployment

Frontend:
- Vercel

Backend:
- Server deployment platform

Database:
- MongoDB Atlas

---

#  Project Structure

```
Chef-Mind

├── client
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   ├── types
│   │   └── utils
│   └── package.json
│
└── server
    ├── src
    │   ├── index.ts
    │   ├── routes
    │   └── lib
    └── package.json
```

---

#  API Features

## Recipe APIs

### Get All Recipes

```
GET /recipes
```

Supports:

- Search
- Category filtering
- Cuisine filtering
- Difficulty filtering
- Sorting
- Pagination


### Get Single Recipe

```
GET /recipes/:id
```


### Create Recipe

```
POST /recipes
```


### Update Recipe

```
PATCH /recipes/:id
```


### Delete Recipe

```
DELETE /recipes/:id
```

---

## Saved Recipe APIs

### Save Recipe

```
POST /saved-recipes
```


### Get Saved Recipes

```
GET /saved-recipes
```


### Remove Saved Recipe

```
DELETE /saved-recipes/:id
```

---

## AI API

Generate AI recipe insights:

```
POST /ai/recipe-summary
```

Example Response:

```json
{
  "summary": "A delicious recipe...",
  "healthBenefits": [
    "Rich in protein"
  ],
  "chefTip": "Use fresh ingredients",
  "pairing": "Best served with juice"
}
```

---

#  Environment Variables

Create `.env` file inside server:

```env
PORT=5000

MONGO_DB_URI=your_mongodb_connection_string

AUTH_DB_NAME=your_database_name

GEMINI_API_KEY=your_gemini_api_key
```

---

#  Installation & Setup

## Clone Repository

```bash
git clone https://github.com/rsdrahi/Chef-Mind-Client
```

---

## Install Frontend Dependencies

```bash
cd client

npm install
```

Run:

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

## Install Backend Dependencies

```bash
cd server

npm install
```

Run:

```bash
npm run dev
```

Backend:

```
http://localhost:5000
```

---

#  Learning Outcomes

Through this project, I practiced:

- Building a full-stack application with TypeScript
- Designing REST APIs with Express
- Working with MongoDB collections
- Integrating Generative AI features
- Creating reusable React components
- Managing complex filtering and searching logic
- Deploying production-ready applications

---

#  Future Improvements

- User authentication
- AI recipe generation from ingredients
- Nutrition calculator
- Meal planning system
- User profile dashboard
- Recipe recommendation engine

---

#  Author

**Rasheduzzaman Rahi**

Frontend Developer | MERN Stack Developer

GitHub:
https://github.com/rsdrahi

LinkedIn:
https://www.linkedin.com/in/rsdrahi/

---

 If you like this project, consider giving it a star!

