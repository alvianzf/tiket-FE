# ✈️ TiketQ Frontend

TiketQ is a modern, premium web application for booking flights and ferries. It features a sleek glassmorphism UI, smooth Framer Motion animations, and robust error handling.

> **Note:** Real application screenshots are intended to be placed below. Due to system browser automation limits at the time of writing, please capture and place your snapshots here.

### 📸 Application Snapshots
*(Place `landing_page.png` and `history_lookup.png` in the `/public/docs/` folder to display here)*

![Landing Page](./public/docs/landing_page.png)
![History Lookup](./public/docs/history_lookup.png)


## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (React 18)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Glassmorphism aesthetics
- **UI Components:** [NextUI v2](https://nextui.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State/Query Management:** [React Query v5](https://tanstack.com/query/latest)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone git@github.com:alvianzf/tiket-FE.git
   cd tiket-FE
   ```

2. **Install dependencies:**
   Make sure you are using `npm` (Yarn is discouraged to prevent conflicting resolutions).
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file based on the local configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🌍 Production Deployment (Ubuntu + PM2 + Nginx)

Follow this guide to securely expose your Next.js application to the internet using Nginx as a reverse proxy and PM2 as a process manager.

### 1. Prerequisites
Ensure you have Node.js (v18+), npm, Nginx, and PM2 installed on your Ubuntu server.

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install PM2 globally
sudo npm install -g pm2
```

### 2. Build the Application
Navigate to your project directory on the server, install dependencies, and build the Next.js production bundle.

```bash
cd /var/www/tiket-FE
npm install
npm run build
```

### 3. Start with PM2
Use PM2 to run the Next.js application in the background so it automatically restarts if the server crashes or reboots.

```bash
# Start the application on port 3000
pm2 start npm --name "tiket-frontend" -- run start

# Save the PM2 list so it resurrects on reboot
pm2 save
pm2 startup
```

### 4. Configure Nginx
Create a new server block configuration for Nginx to proxy HTTP requests from port 80 to your Next.js app running on port 3000.

```bash
sudo nano /etc/nginx/sites-available/tiket-fe
```

Paste the following configuration (replace `yourdomain.com` with your actual domain or IP address):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type-Options "nosniff";
    }
}
```

Enable the configuration and restart Nginx:

```bash
# Create a symlink to enable the site
sudo ln -s /etc/nginx/sites-available/tiket-fe /etc/nginx/sites-enabled/

# Test Nginx config for syntax errors
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 5. Secure with SSL (Optional but Recommended)
Use Certbot to automatically provision and install Let's Encrypt SSL certificates.

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Your TiketQ frontend is now live, secured, and running flawlessly in production! 🎉
