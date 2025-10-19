package db

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

type User struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Name     string
	Username string  `gorm:"not null"`
	Email    string  `gorm:"unique;not null"`
	Tweets   []Tweet `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type Tweet struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Message string `gorm:"not null"`
	UserID  uint   `gorm:"not null"`
	User    *User
}

func InitDB() {
	database, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.Exec("PRAGMA foreign_keys = ON")

	database.AutoMigrate(&User{}, &Tweet{})

	DB = database
}
