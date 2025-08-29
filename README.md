# 💯 100 Days of Code Platform

A **full-stack coding progress tracker** built with **React, Redux Toolkit, RTK Query, Express.js, MongoDB, and GraphQL**.  
The platform helps developers stay consistent during the **100 Days of Code challenge** by tracking their progress in real-time, integrating with **LeetCode’s GraphQL API**, and providing leaderboards & contests.

---

## 🚀 Features

- **Real-time Progress Tracking**  
  - Integrated **LeetCode GraphQL API** to fetch daily coding activity.  
  - Tracks solved problems, contests, and submission history.  

- **Seamless Authentication**  
  - Implemented **Google OAuth login** with **Passport.js** for secure and easy access.  

- **Scalable Backend Modules**  
  - **Problems Module** – Manage problem sets with difficulty levels.  
  - **Contests Module** – Organize timed challenges and coding competitions.  
  - **Leaderboards** – Track rankings, daily streaks, and overall progress.  

- **Accessible & Modern UI**  
  - Built with **ShadCN** for clean, minimal design.  
  - Centralized state management using **Redux Toolkit + RTK Query**.  

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, RTK Query, ShadCN, TailwindCSS  
- **Backend:** Express.js, MongoDB, GraphQL  
- **Auth:** Google OAuth (Passport.js)  
- **Other:** TypeScript, Node.js  

---





## 📸 Screenshots & 🎥 Demo

https://github.com/user-attachments/assets/223d7d6f-76db-4a2d-819c-f3814d5137da

---

## 🧩 Architecture

```mermaid
flowchart TD
    User[User] --> UI[React + ShadCN UI]
    UI --> State[Redux Toolkit + RTK Query]
    State --> API[Express.js Backend]
    API --> DB[MongoDB]
    API --> LeetCode[LeetCode GraphQL API]
    API --> Auth[Google OAuth (Passport.js)]
    API --> Modules[Problems | Contests | Leaderboards]
