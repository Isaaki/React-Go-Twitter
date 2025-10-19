package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

type User struct {
	gorm.Model
	Name     string
	Username string
	Email    string
}

type Tweet struct {
	gorm.Model
	Message string
	UserID  uint
}

func InitDB() {
	database, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(&User{}, &Tweet{})

	DB = database
}
