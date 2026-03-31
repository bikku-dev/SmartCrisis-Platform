# 🚨 Crisis AI – Emergency Management System

Crisis AI is a backend system designed to handle real-life emergencies like accidents, medical issues, and disaster situations.

The goal of this project is simple:  
👉 Help people get quick assistance using smart backend + AI

---

## 🎯 What this project does

- Users can raise an emergency request  
- System detects the type of emergency using AI  
- Finds nearest hospital  
- Assigns a volunteer  
- Tracks the status of the emergency  

---

## 🧠 Main Features

- Emergency request system  
- Hospital data (beds, ICU, blood)  
- Volunteer support system  
- AI-based emergency detection  
- Secure login using JWT  
- Fast performance using Redis  

---

## 🧱 Project Structure
crisis-ai/
│
├── gateway-service/
├── auth-service/
├── core-service/
├── ai-service/
│
└── docker-compose.yml


---

## ⚙️ Tech Stack

- Spring Boot  
- Spring Security (JWT)  
- PostgreSQL  
- Redis  
- Spring Cloud Gateway  
- Docker  

---

## 🔄 How it works (Flow)

1. User sends emergency request  
2. Request goes through API Gateway  
3. Auth is verified  
4. Core service:
   - saves data  
   - calls AI service  
   - finds nearest hospital  
   - assigns volunteer  
5. Response is sent back  

---


