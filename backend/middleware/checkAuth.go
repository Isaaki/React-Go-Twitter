package middleware

import (
	"fmt"
	"net/http"
	"os"
	"react-go-backend/internal/db"
	"react-go-backend/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func CheckAuth(ctx *gin.Context) {
	tokenString, err := ctx.Cookie("session_token")
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Session_token not found"})
		ctx.Abort()
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET")), nil
	})
	if err != nil || !token.Valid {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
		ctx.Abort()
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		ctx.Abort()
		return
	}

	if float64(time.Now().Unix()) > claims["exp"].(float64) {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "token expired"})
		ctx.Abort()
		return
	}

	var user models.User
	db.DB.Where("ID=?", claims["id"]).Find(&user)

	if user.ID == 0 {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	ctx.Set("currentUser", user)

	ctx.Next()
}
