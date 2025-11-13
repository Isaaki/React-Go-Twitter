package models

import "time"

type User struct {
	ID        uint      `json:"id" gorm:"primarykey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`

	Username string  `json:"username" gorm:"unique;not null"`
	Password string  `json:"-"`
	Name     string  `json:"name"`
	Email    string  `json:"email" gorm:"unique;not null"`
	Tweets   []Tweet `json:"tweets" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`

	ProfilePicUrl string `json:"profilePicUrl"`
}

type APIUser struct {
	ID            uint   `json:"id" gorm:"primarykey"`
	Username      string `json:"username" gorm:"unique;not null"`
	Name          string `json:"name"`
	ProfilePicUrl string `json:"profilePicUrl"`
}
