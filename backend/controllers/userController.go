package controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"react-go-backend/internal/db"
	"react-go-backend/models"
	"react-go-backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func getUser(ctx *gin.Context) models.User {
	val, exists := ctx.Get("currentUser")
	if !exists {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
	}
	user, ok := val.(models.User)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
	}
	return user
}

func GetUserProfile(ctx *gin.Context) {
	user := getUser(ctx)
	db.DB.Preload("Tweets").First(&user)

	ctx.JSON(http.StatusOK, user)
}

func PutUserProfile(ctx *gin.Context) {
	var input map[string]any
	if err := ctx.BindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	delete(input, "id")
	delete(input, "password")
	delete(input, "createdAt")

	user := getUser(ctx)
	db.DB.Model(&user).Updates(&input)

	ctx.JSON(http.StatusOK, user)
}

func DeleteUserProfile(ctx *gin.Context) {
	user := getUser(ctx)

	if err := db.DB.Delete(&user).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User and their tweets deleted"})
}

func GetUserTweets(ctx *gin.Context) {
	user := getUser(ctx)

	if err := db.DB.Preload("Tweets.User").First(&user).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	responses := utils.TweetsToResponses(user.Tweets)
	ctx.JSON(http.StatusOK, responses)
}

func PostUserTweet(ctx *gin.Context) {
	user := getUser(ctx)

	var tweet models.Tweet
	if err := ctx.BindJSON(&tweet); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tweet.UserID = user.ID
	db.DB.Create(&tweet)

	db.DB.Preload("Tweets").First(&user)
	ctx.JSON(http.StatusOK, user.Tweets)
}

func PostProfilePic(ctx *gin.Context) {
	user := getUser(ctx)

	file, _ := ctx.FormFile("file")
	filename := uuid.New().String() + filepath.Ext(file.Filename)
	destination := filepath.Join("./uploads", filename)

	if err := ctx.SaveUploadedFile(file, destination); err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
		return
	}

	fileURL := fmt.Sprintf("http://localhost:8080/static/%s", filename)

	user.ProfilePicUrl = fileURL
	db.DB.Updates(&user)

	ctx.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully!", "url": fileURL})
}
