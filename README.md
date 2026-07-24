# lifthouse

This is a personal gym progress tracking app that is tailoured to the way I train. Previously, I used Google spreedsheets to track my progress, but I found that everything seemed so manual, so I dedicated time to create this application to streamline the same processes I do for my Google Sheets. You probably won't find this useful, or even UI/UX friendly, but it works for me :)

This application is takes the mobile-first design prinicple, so ideally you should use the application on mobile.

# Tech Stack

- React
- NextJS
- Supabase (using a postgres db and their authentication service)
- Vercel for deployment (which you can find [here](https://lifthouse.vercel.app/))

# My Training

Most of my training knowledge comes from [Alex Leonidas](https://www.youtube.com/@AlexLeonidas). He advocates for strength training in various exercises such as SBD, OHP, Z-Press, Zercher Squat, Box Squats, and many more. Highly specialised training to strengthen weak points and build an naturally appleaing body (overemphasising shoulder, tricep, forearm and neck muscles or known as yoke training). My application is loosely built on exercises that he recommends and rep schemes but in no way his programme e.g. I follow a 4 day split, he recommends full body 2 day split. If you want to know more about him, I suggest going to his [website](https://outalpha.com/)

# Features

## Workouts and 531 Program

<table>
  <tr>
    <td colspan="3">Create workout plans, log sets against them, and review progress as a stacked chart, line chart or raw table. Enter your one-rep maxes and follow the 531 program across its 4-week block, logging each lift as you go.</td>
  </tr>
  <tr>
    <td align="center"><img src="/docs/shows/main.gif" alt="Browsing workout plans" width="250"></td>
    <td width="40"></td>
    <td align="center"><img src="/docs/shows/531.gif" alt="Setting up the 531 program" width="250"></td>
  </tr>
</table>

## Meals and Weight Tracking

<table>
  <tr>
    <td colspan="3">Log meals and track calories, protein, carbs and fat for the day. Log weigh-ins on a calendar and track your trend over time, with a weekly goal based on your Sunday weigh-in.</td>
  </tr>
  <tr>
    <td align="center"><img src="/docs/shows/today.gif" alt="Logging meals for the day" width="250"></td>
    <td width="40"></td>
    <td align="center"><img src="/docs/shows/charts.gif" alt="Weight trend chart and weekly goal" width="250"></td>
  </tr>
</table>

# Contributions

I don't really accept contributions for this project as it is my own personal application. But I am happy to accept UI/UX recommendations
