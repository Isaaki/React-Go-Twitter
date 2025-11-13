package models

import "time"

type Tweet struct {
	ID        uint      `json:"id" gorm:"primarykey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`

	Message string `json:"message" gorm:"not null"`
	UserID  uint   `json:"userId" gorm:"not null"`
	User    *User  `json:"user"`

	Likes    uint `json:"likes"`
	Replies  uint `json:"replies"`
	Retweets uint `json:"retweets"`
	Views    uint `json:"views"`
}

type TweetResponse struct {
	ID        uint      `json:"id" gorm:"primarykey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`

	Message string   `json:"message" gorm:"not null"`
	User    *APIUser `json:"user"`

	Likes    uint `json:"likes"`
	Replies  uint `json:"replies"`
	Retweets uint `json:"retweets"`
	Views    uint `json:"views"`
}
