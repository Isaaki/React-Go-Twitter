package utils

import (
	"react-go-backend/models"
)

func TweetToResponse(tweet models.Tweet) models.TweetResponse {
	return models.TweetResponse{
		ID:        tweet.ID,
		CreatedAt: tweet.CreatedAt,
		UpdatedAt: tweet.UpdatedAt,
		Message:   tweet.Message,
		User: &models.APIUser{
			ID:            tweet.User.ID,
			Username:      tweet.User.Username,
			Name:          tweet.User.Name,
			ProfilePicUrl: tweet.User.ProfilePicUrl,
		},
		Likes:    tweet.Likes,
		Replies:  tweet.Replies,
		Retweets: tweet.Retweets,
		Views:    tweet.Views,
	}
}

func TweetsToResponses(tweets []models.Tweet) []models.TweetResponse {
	responses := make([]models.TweetResponse, len(tweets))
	for i, t := range tweets {
		responses[i] = TweetToResponse(t)
	}

	return responses
}
