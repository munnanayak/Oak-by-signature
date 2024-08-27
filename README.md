
**Outh token for github as password**
>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

**1:#push project into github**
> git intit
> git add .
> git remote set-url origin https://github.com/SignatureHotels/Oakhotel.git
> git commit -m "Initial commit"
> git push -u origin master

**2:# install puttygen and putty**

>pass pharase for SSh key = oak_sshkye

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
>sudo apt-get upgrade -y


**7:Install Node.js and npm:**
>curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
>sudo apt-get install -y nodejs

**8:Install MySQL Server:**
>sudo apt-get install mysql-server -y
>sudo mysql_secure_installation

9:Install Nginx:
>sudo apt-get install nginx -y

10: Configure MySQL for Your Application if not created
sudo mysql -u root -p
CREATE DATABASE oakhotel_db;
CREATE USER 'oakhotel_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON oakhotel_db.* TO 'oakhotel_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

11: Clone Your Project from GitHub
 cd /var/www/
 git clone https://github.com/SignatureHotels/Oakhotel.git
cd Oakhotel

12: Set Up the Backend
cd backend-Oak_hotel
npm install




