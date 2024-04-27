# ShareVision Fullstack Test
A simple fullstack CRUD app for articles / posts

## Creating Manual Database Table
Located at `backend/initialize_db.sh`
```sh
CREATE TABLE posts (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(200),
    Content TEXT,
    Category VARCHAR(100),
    Created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Status VARCHAR(100) CHECK(Status IN ('Publish', 'Draft', 'Thrash'))
);
```

## Demo (Video)

## Postman Collection
Located in the `postman` folder

## How to Use
1. Clone or fork this repository
```sh
git@github.com:NicholasLiem/Fullstack_T_SharingVision.git
```

2. Initialize .env file using the template given (.env.example)
```sh
cp .env.example .env
```

3. Run docker compose to build all the images
```sh
docker compose up --build
```

4. To access the backend just hit this url
```sh
http://localhost:3001/article
```

5. To access the frontend just hit this url
```sh
http://localhost:5000
```
