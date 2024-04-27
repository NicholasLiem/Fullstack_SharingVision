package main

import (
	"github.com/NicholasLiem/BE_T_SharingVision/adapter"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/app"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/datastruct"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/repository"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/service"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

func main() {
	/**
	Load env file
	*/
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	/**
	DB setup
	*/
	db := repository.SetupDB()

	/**
	Registering DAO's and Services
	*/
	dao := repository.NewDAO(db)

	articleService := service.NewArticleService(dao)
	/**
	Registering Services to Server
	*/
	server := app.NewMicroservice(
		articleService,
	)

	/**
	DB Migration
	*/
	datastruct.Migrate(db, &datastruct.Article{})
	serverRouter := adapter.NewRouter(*server)

	port := os.Getenv("PORT")
	log.Println("Running the server on port " + port)

	if os.Getenv("ENVIRONMENT") == "DEVELOPMENT" {
		log.Fatal(http.ListenAndServe("127.0.0.1:"+port, serverRouter))
	}
	log.Fatal(http.ListenAndServe(":"+port, serverRouter))
}
