package main

import (
	"react-go-backend/internal/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"net/http"
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

	router.GET("/api/user/first", func(ctx *gin.Context) {
		var user db.User
		db.DB.First(&user)
		ctx.JSON(http.StatusOK, user)
	})

	router.POST("/api/users", func(ctx *gin.Context) {
		var user db.User
		if error := ctx.BindJSON(&user); error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": error.Error()})
			return
		}

		db.DB.Create(&user)
		ctx.JSON(http.StatusOK, user)
	})

	router.Run(":8080") // listens on 0.0.0.0:8080 by default
}
