# 🚀 GigConnect

**GigConnect** is a modern and elegant freelance marketplace platform where **freelancers** can post their gigs and **clients** can explore and purchase those gigs with ease. Designed with a sleek UI and responsive design, GigConnect bridges the gap between talented individuals and those seeking their skills.

![GigConnect Logo](./logo.svg)

---

## 🌐 Live Demo

> [gigconnect.vercel.app](https://gigconnect.vercel.app/)

---

## 🎯 Key Features

### 👤 For Freelancers

1. **Create your professional profile**  
   Showcase your expertise, skills, and experience.

2. **Post compelling gigs with portfolios**  
   Add detailed services, visuals, and pricing to attract clients.

3. **Accept orders and collaborate**  
   Communicate with clients directly and deliver work efficiently.

4. **Deliver excellence and grow**  
   Build a reputation through consistent delivery and client feedback.

---

### 🧑‍💼 For Clients

1. **Browse curated talent marketplace**  
   Discover freelancers across various skills and domains.

2. **Choose perfect match and hire**  
   Purchase gigs from professionals that match your needs.

3. **Collaborate through built-in tools**  
   Seamless messaging and order tracking to manage tasks.

4. **Track progress and receive results**  
   Stay updated on your order and receive deliverables effortlessly.

---

### 🛠️ Common Features

- User authentication (JWT)
- Role-based access (Freelancer, Client)
- Realtime chat (socket.io)
- orders Status & delivery links
- Responsive design for desktop & mobile

---

## 🧰 Tech Stack

| Tech                     | Usage               |
| ------------------------ | ------------------- |
| **MongoDB**              | Database            |
| **Express.js**           | Backend API         |
| **React.js**             | Frontend            |
| **Node.js**              | Server runtime      |
| **Tailwind CSS**         | Styling             |
| **Mongoose**             | MongoDB ORM         |
| **Socket.io**            | Real-time messaging |
| **Multer(localstorage)** | Image uploads       |

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gigconnect.git
cd gigconnect
```

cd backend
npm install
npx nodemon

# Create .envsample

MONGODB_URI="mongodb+srv://<username>@cluster0.yf6a6yh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
SECRET_KEY = "sjadkagddasjdggfakdjfdjkasdflaskdfgsakdgfcxnmzgdskdjfgk"
PORT_NUMBER = 3000

# frontend

cd frontend
npm install

# Create .envsample

REACT_APP_BACKEND_URI = "http://localhost:3000"

npm run dev

### ✨Future Features

Cloudinary Integration(image storage)

Admin dashboard

Payments integration (Razorpay, Stripe)

Gig ratings and reviews

Email & push notifications

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

💡 Inspiration
GigConnect was built with the idea of making freelancing accessible, elegant, and effective — especially in a world where remote work is the new normal.

📄 License
This project is licensed under the MIT License.