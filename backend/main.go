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

	router.GET("/api/user/:id", func(ctx *gin.Context) {
		strId := ctx.Param("id")
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

	router.GET("/api/users", func(ctx *gin.Context) {
		var users []db.User
		db.DB.Find(&users)
		ctx.JSON(http.StatusOK, users)
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

	router.PUT("/api/user/:id", func(ctx *gin.Context) {
		strId := ctx.Param("id")
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

	router.Run(":8080") // listens on 0.0.0.0:8080 by default
}
