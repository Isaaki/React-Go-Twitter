package db

import (
	"log"
	"react-go-backend/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.Exec("PRAGMA foreign_keys = ON")
	database.AutoMigrate(&models.User{}, &models.Tweet{})

	DB = database
}
