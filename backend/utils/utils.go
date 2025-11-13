package utils

import (
	"errors"
	"react-go-backend/models"
)

func TweetToResponse(tweet models.Tweet) (models.TweetResponse, error) {
	var tweetResponse models.TweetResponse

	if tweet.User == nil {
		return tweetResponse, errors.New("user field not preloaded")
	}

	tweetResponse = models.TweetResponse{
		ID:        tweet.ID,
		CreatedAt: tweet.CreatedAt,
		UpdatedAt: tweet.UpdatedAt,
		Message:   tweet.Message,
		User: &models.UserResponse{
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

	return tweetResponse, nil
}

func TweetsToResponses(tweets []models.Tweet) ([]models.TweetResponse, error) {
	responses := make([]models.TweetResponse, len(tweets))

	if tweets[0].User == nil {
		return responses, errors.New("user field not preloaded")
	}

	for i, t := range tweets {
		res, err := TweetToResponse(t)
		if err != nil {
			return responses, err
		}
		responses[i] = res
	}

	return responses, nil
}
