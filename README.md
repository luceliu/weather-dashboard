## Architectural decisions

- Set up two different routes (/api/weather and /api/geocoding) to reflect two very different functions we're calling an external API for, getting weather data and getting city lat/lon data
- Extracted dashboard components into their own files
- Separated internal and external API types into different folders
- Created two API client files to handle the fetch requests to the internal routes (/api/weather and /api/geocoding)
- Since the OpenWeatherMap OneCall API doesn't allow you to specify how many days of weather data you want (it just gives you the maximum number of days), I chose to pass the whole array to the frontend -- if the user wants to see more days in the forecast, they would be able to do so without an additional API request
- Chose not to have a data access layer for calling the external APIs as the data fetching and transformation are simple enough to do in the service layer
  - For a similar reason, I co-located the transformer/adapter functions in the service methods/files (also, they're not going to be used elsewhere)
- Chose not to create interfaces for request params as the params are simple enough
- Extracted dashboard functionality into `useWeatherDashboard` to keep `WeatherDashboard.tsx` clean
- Extracted utility formatting functions into their own file `formatters.ts`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
