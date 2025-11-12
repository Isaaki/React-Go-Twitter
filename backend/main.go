package main

import (
	"fmt"
	"net/http"
	"path/filepath"
	"react-go-backend/controllers"
	"react-go-backend/internal/db"
	"react-go-backend/middleware"
	"react-go-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"time"
)

func main() {
	router := gin.Default()

	db.InitDB()

	// https://github.com/gin-gonic/gin/blob/master/docs/doc.md#dont-trust-all-proxies
	router.SetTrustedProxies(nil)

	// Set uploads to static URL
	router.Static("/static", "./uploads")

	// CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.POST("/auth/login", controllers.Login)
	router.POST("/auth/signup", controllers.CreateUser)

	router.GET("/user/profile", middleware.CheckAuth, controllers.GetUserProfile)
	router.PUT("/user/profile", middleware.CheckAuth, controllers.PutUserProfile)
	router.DELETE("/user/profile", middleware.CheckAuth, controllers.DeleteUserProfile)

	router.GET("/user/tweet", middleware.CheckAuth, controllers.GetUserTweets)
	router.POST("/user/tweet", middleware.CheckAuth, controllers.PostUserTweet)

	router.POST("/user/profilePicture", middleware.CheckAuth, controllers.PostProfilePic)

	// User Routes
	router.GET("/api/users", func(ctx *gin.Context) {
		var users []models.User
		db.DB.Preload("Tweets").Find(&users)
		ctx.JSON(http.StatusOK, users)
	})

	router.GET("/api/user/:userId", func(ctx *gin.Context) {
		var user models.User
		if err := db.DB.Preload("Tweets").First(&user, ctx.Param("userId")).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		ctx.JSON(http.StatusOK, user)
	})

	router.GET("/api/user/:userId/tweets", func(ctx *gin.Context) {
		var user models.User
		if err := db.DB.Preload("Tweets").First(&user, ctx.Param("userId")).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		ctx.JSON(http.StatusOK, user.Tweets)
	})

	router.GET("/api/user/", func(ctx *gin.Context) {
		var user models.User

		username := ctx.Query("username")
		tweets := ctx.Query("tweets")

		if username != "" {
			if err := db.DB.Preload("Tweets").Where("Username = ?", username).First(&user).Error; err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			if tweets == "true" {
				ctx.JSON(http.StatusOK, user.Tweets)
				return
			}

			ctx.JSON(http.StatusOK, user)
			return
		}

		ctx.JSON(http.StatusNotFound, "No user found")
	})

	router.POST("/api/user", func(ctx *gin.Context) {
		var user models.User
		if err := ctx.BindJSON(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.DB.Create(&user)
		ctx.JSON(http.StatusOK, user)
	})

	router.POST("/api/user/:userId/profilePicture", middleware.CheckAuth, func(ctx *gin.Context) {
		var user models.User
		if err := db.DB.First(&user, ctx.Param("userId")).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

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
	})

	router.PUT("/api/user/:userId", func(ctx *gin.Context) {
		var user models.User
		if err := ctx.BindJSON(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		db.DB.First(&user, ctx.Param("userId")).Updates(&user)
		ctx.JSON(http.StatusOK, user)
	})

	router.DELETE("/api/user/:userId", func(ctx *gin.Context) {
		var user models.User
		if err := db.DB.First(&user, ctx.Param("userId")).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		if err := db.DB.Delete(&user).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"message": "User and their tweets deleted"})
	})

	router.DELETE("/api/users", func(ctx *gin.Context) {
		var users []models.User
		db.DB.Delete(&users)
		ctx.JSON(http.StatusOK, nil)
	})

	// Tweet Routes
	router.GET("/api/tweets", func(ctx *gin.Context) {
		var tweets []models.Tweet
		db.DB.Preload("User").Find(&tweets)
		ctx.JSON(http.StatusOK, tweets)
	})

	router.POST("/api/tweet", func(ctx *gin.Context) {
		var tweet models.Tweet
		if err := ctx.ShouldBindJSON(&tweet); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user models.User
		if err := db.DB.First(&user, tweet.UserID).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		db.DB.Create(&tweet)

		db.DB.Preload("Tweets").First(&user)
		ctx.JSON(http.StatusOK, user)
	})

	router.GET("/api/tweet/:tweetId", func(ctx *gin.Context) {
		var tweet models.Tweet
		if err := db.DB.Preload("Tweets").First(&tweet, ctx.Param("tweetId")).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Tweet not found"})
			return
		}
		ctx.JSON(http.StatusOK, tweet)
	})

	router.DELETE("/api/tweet/:tweetId", func(ctx *gin.Context) {
		var tweet models.Tweet
		db.DB.First(&tweet, ctx.Param("tweetId")).Delete(&tweet)
		ctx.JSON(http.StatusOK, "Succsesfully Deleted")
	})

	router.DELETE("/api/tweets", func(ctx *gin.Context) {
		if err := db.DB.Where("1 = 1").Delete(&models.Tweet{}).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"message": "All users deleted"})
	})

	router.Run(":8080")
}
