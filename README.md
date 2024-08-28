
**Outh token for github as password**
>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

**1:#push project into github**
> git intit
> git add .
> git remote set-url origin https://github.com/SignatureHotels/Oakhotel.git
> git commit -m "Initial commit"
> git push -u origin master

**2:# install puttygen and putty**

>pass pharase for SSh key = oak_sshkey

**3: # Create droplet**
**4: give the ip adress from the droplet in the putty**
      > give it a name and save
     > connetions
     > sshkey
     >upload private key in brom bwoser
     > click on open

 **5: login as: root**
 give the pass phrase: oak_sshkye

**6: root@ubuntu-s-1vcpu-1gb-blr1-01-oakhotel:~#** 
**Update the System Packages:**
>sudo apt-get update
>
>sudo apt-get upgrade -y


**7:Install Node.js and npm:**
>curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
>
>sudo apt-get install -y nodejs

**8:Install MySQL Server:**
>sudo apt-get install mysql-server -y
>sudo mysql_secure_installation

**9:Install Nginx:**
>sudo apt-get install nginx -y

**10: Configure MySQL for Your Application if not created**
sudo mysql -u root -p
CREATE DATABASE oakhotel_db;
CREATE USER 'oakhotel_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON oakhotel_db.* TO 'oakhotel_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

**11: Clone Your Project from GitHub**
 cd /var/www/
 git clone https://github.com/munnanayak/Oak-by-signature.git
cd Oakhotel

**12: Set Up the Backend**
cd backend-Oak_hotel
npm install

**13:Create the .env File:**
nano .env
Add the following content to the file, then save and exit (CTRL + O, Enter, CTRL + X)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS='N1a2y#a$@1'
DB_NAME=oakhoteldb
RAZORPAY_KEY_ID=rzp_test_kSxeaCRWjnIZhD
RAZORPAY_KEY_SECRET=9ycHwJsnmN7A19PWZPMcWySo
APP_PORT=5000

**14:Run Database Migrations:**
npx sequelize-cli db:migrate

**15:Start the Backend with pm2:**
sudo npm install -g pm2
pm2 start (app/server).js --name backend-Oak_hotel
pm2 save
pm2 startup

**16:Set Up the Frontend**
cd ../frontend-Oak
npm install
npm run build
sudo cp -r build/* /var/www/html/
**17:Configure Nginx**
sudo nano /etc/nginx/sites-available/default

**18:Update the Nginx Configuration:**

server {
    listen 80;
    server_name your_domain_or_ip; (if u have a domine)

    location / {
        root /var/www/html;
        index index.html index.htm;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;  # Your backend port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

sudo nginx -t
sudo systemctl restart nginx

**19:Set Up SSL with Let's Encrypt (Optional but Recommended)**
sudo apt-get install certbot python3-certbot-nginx -y

**20:Obtain and Install SSL Certificate:**
sudo certbot --nginx -d your_domain

**21:Verify that the Backend is Running:**
pm2 list

**22:Monitor Nginx and pm2 logs to ensure everything is running smoothly**
sudo tail -f /var/log/nginx/error.log
pm2 logs



