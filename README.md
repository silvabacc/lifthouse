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

# Screenshots

## Dashboard

<table>
  <tr>
    <td align="center"><img src="/docs/images/dashboard.png" alt="Dashboard with the 5 feature cards on mobile" ></td>
    <td align="center"><img src="/docs/images/dashboard_desktop.png" alt="Dashboard on desktop with the side nav" ></td>
  </tr>
</table>

## Workouts

Create workout plans, log sets against them, and review progress as a stacked chart, line chart or raw table.

<table>
  <tr>
    <td align="center"><img src="/docs/images/workouts.png" alt="List of workout plans" ></td>
    <td align="center"><img src="/docs/images/workout_charts.png" alt="Workout page showing per-exercise progress charts" ></td>
    <td align="center"><img src="/docs/images/workout_table.png" alt="Logged sets shown in a table view" ></td>
  </tr>
  <tr>
    <td align="center"><img src="/docs/images/workout_record.png" alt="Recording sets and reps for a workout" ></td>
    <td align="center"><img src="/docs/images/workout_templates.png" alt="Applying a pre-built workout template" ></td>
    <td align="center"><img src="/docs/images/workout_edit_exercises.png" alt="Reordering and editing exercises in a plan" ></td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><img src="/docs/images/workouts_desktop.png" alt="Workout plans on desktop" ></td>
    <td align="center"><img src="/docs/images/workout_charts_desktop.png" alt="Workout progress charts on desktop" ></td>
  </tr>
</table>

## Exercises

Browse the full exercise library and search by name or muscle group.

<table>
  <tr>
    <td align="center"><img src="/docs/images/exercises.png" alt="Exercise library on mobile" ></td>
    <td align="center"><img src="/docs/images/exercises_desktop.png" alt="Exercise library on desktop" ></td>
  </tr>
</table>

## 531 Program

Enter your one-rep maxes and follow the 531 program across its 4-week block, logging each lift as you go.

<table>
  <tr>
    <td align="center"><img src="/docs/images/program_531.png" alt="531 program overview with training maxes and week progress" ></td>
    <td align="center"><img src="/docs/images/program_531_record.png" alt="Recording a 531 lift" ></td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><img src="/docs/images/program_531_desktop.png" alt="531 program on desktop" ></td>
  </tr>
</table>

## Meals

Log meals and track calories, protein, carbs and fat for the day.

<table>
  <tr>
    <td align="center"><img src="/docs/images/meals.png" alt="Meals page with macro breakdown" ></td>
    <td align="center"><img src="/docs/images/meals_desktop.png" alt="Meals page on desktop" ></td>
  </tr>
</table>

## Weight

Log weigh-ins on a calendar and track your trend over time, with a weekly goal based on your Sunday weigh-in.

<table>
  <tr>
    <td align="center"><img src="/docs/images/weight.png" alt="Weight trend and calendar on mobile" ></td>
    <td align="center"><img src="/docs/images/weight_desktop.png" alt="Weight trend and calendar on desktop" ></td>
  </tr>
</table>

# Contributions

I don't really accept contributions for this project as it is my own personal application. But I am happy to accept UI/UX recommendations
