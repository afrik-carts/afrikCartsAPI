## Afrik Carts API

Afrik Carts, a food ordering/delivery app. Seamlessly manage orders, including placing, updating, and canceling orders, ensuring a smooth user experience.. Efficiently handle restaurant profiles, menus, and availability to provide users with accurate and up-to-date information.

 # prerequisite

Make sure you have nodejs 14+ installed, preferrably nodejs 18+. also make sure you have postgres installed on your machine.

List of needed services
- nodejs 14+ (preferrably 18+, 20+) [https://nodejs.org/en/download]
- postgres [https://www.postgresql.org/download/]

Rename .env.example to .env and fill in the required data in the .env file.

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/afrikcarts?schema=public"
PORT=5005
APP_SECRET="$%secretkeyforjwttokendecode%$"
GOOGLE_MAP_API_KEY=""
```
 make sure you input your own data in *GOOGLE_MAP_API_KEY* and *DATABASE_URL*. you can leave the *APP_SECRET* and *PORT* as it is.
 for *DATABASE_URL* after installing postgres you can just change that username in the example url to your postgres username. do not set a password so that you can access it easily.

# installation

After you are done with the steps above you need to install the necessary dependencies for the API to run on your machine locally. The below commands should be ran just once, think of it as an initial installation process.

 ```bash
 npm install
 ```

 Next, run a migration to generate/create the database tables 

 ```bash
 npm run migrate
 ```

 # Running the API

 Now that the application is fully setup in your machine locally, you can run the command below anytime you want to start the API

 ```bash
npm run dev
 ```

 # Viewing your database

 You can use prisma built in database viewer called prisma studio to browse your db.

 ```bash
 npm run studio
 ```