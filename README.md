# Grandma's Kitchen - Recipe Website

A cozy recipe website built with Vue.js that helps you discover and explore delicious recipes. The application features a beautiful, responsive interface and integrates with the Spoonacular API to provide a vast collection of recipes.

## Features

- Search recipes by keywords
- Filter by cuisine types (American, Italian, Chinese, etc.)
- Responsive design for all devices
- Beautiful UI with smooth transitions
- Detailed recipe pages with:
  - Ingredients list
  - Step-by-step instructions
  - Dietary information (Vegan, Vegetarian, Dairy-Free, Gluten-Free)
  - High-quality images

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spoonacular API key ([Get it here](https://spoonacular.com/food-api))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/herbertph/recipeWebsite.git
   cd recipe-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Spoonacular API key:
   ```
   VITE_SPOONACULAR_API_KEY=your_api_key_here
   ```

## Development

To run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Technologies Used

- Vue.js 3 - Frontend framework
- Vue Router - Navigation
- Tailwind CSS - Styling
- Vite - Build tool and development server
- Spoonacular API - Recipe data

## Project Structure

- `/src` - Source code
  - `/components` - Reusable Vue components
  - `/pages` - Page components
  - `/services` - API services
  - `/router` - Route configuration
  - `/assets` - Static assets and global styles

## Contributing

Feel free to submit issues and enhancement requests!