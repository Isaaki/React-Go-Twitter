package main

import (
	"react-go-backend/internal/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"net/http"
	"strconv"
	"time"
)

func main() {
	router := gin.Default()

	db.InitDB()

	// https://github.com/gin-gonic/gin/blob/master/docs/doc.md#dont-trust-all-proxies
	router.SetTrustedProxies(nil)

	// CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/api/users", func(ctx *gin.Context) {
		var users []db.User
		db.DB.Find(&users)
		ctx.JSON(http.StatusOK, users)
	})

	router.GET("/api/user/:userId", func(ctx *gin.Context) {
		strId := ctx.Param("userId")
		id, err := strconv.ParseUint(strId, 10, 64)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"Invalid ID": err.Error()})
			return
		}

		var user db.User
		user.ID = uint(id)
		db.DB.Find(&user)
		ctx.JSON(http.StatusOK, user)
	})

	router.GET("/api/tweets", func(ctx *gin.Context) {
		var tweets []db.Tweet
		db.DB.Find(&tweets)
		ctx.JSON(http.StatusOK, tweets)
	})

	router.GET("/api/tweets/:userId", func(ctx *gin.Context) {
		strId := ctx.Param("userId")
		userId, err := strconv.ParseUint(strId, 10, 64)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"Invalid ID": err.Error()})
			return
		}

		var tweets []db.Tweet
		db.DB.Where(&db.Tweet{UserID: uint(userId)}).Find(&tweets)
		ctx.JSON(http.StatusOK, tweets)
	})

	router.GET("/api/tweet/:tweetId", func(ctx *gin.Context) {
		strId := ctx.Param("tweetId")
		tweetId, err := strconv.ParseUint(strId, 10, 64)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"Invalid ID": err.Error()})
			return
		}

		var tweet db.Tweet
		tweet.ID = uint(tweetId)
		db.DB.Find(&tweet)
		ctx.JSON(http.StatusOK, tweet)
	})

	router.POST("/api/user", func(ctx *gin.Context) {
		var user db.User
		if err := ctx.BindJSON(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		db.DB.Create(&user)
		ctx.JSON(http.StatusOK, user)
	})

	router.POST("/api/tweet", func(ctx *gin.Context) {
		var tweet db.Tweet
		if err := ctx.BindJSON(&tweet); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		db.DB.Create(&tweet)
		ctx.JSON(http.StatusOK, tweet)
	})

	router.PUT("/api/user/:userId", func(ctx *gin.Context) {
		strId := ctx.Param("userId")
		id, err := strconv.ParseUint(strId, 10, 64)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"Invalid ID": err.Error()})
		}

		var user db.User
		if err := ctx.BindJSON(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		user.ID = uint(id)
		db.DB.Updates(&user)
		ctx.JSON(http.StatusOK, user)
	})

	router.DELETE("/api/users", func(ctx *gin.Context) {
		var users []db.User
		db.DB.Find(&users)
		db.DB.Delete(&users)
		ctx.JSON(http.StatusOK, nil)
	})

	router.DELETE("/api/tweets", func(ctx *gin.Context) {
		var tweets []db.Tweet
		db.DB.Find(&tweets)
		db.DB.Delete(&tweets)
		ctx.JSON(http.StatusOK, nil)
	})

	router.Run(":8080") // listens on 0.0.0.0:8080 by default
}
