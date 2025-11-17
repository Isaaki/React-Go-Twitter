package utils

import (
	"errors"
	"log"
	"react-go-backend/models"
)

func TweetToResponse(tweet models.Tweet) models.TweetResponse {
	var tweetResponse models.TweetResponse

	tweetResponse = models.TweetResponse{
		ID:        tweet.ID,
		CreatedAt: tweet.CreatedAt,
		UpdatedAt: tweet.UpdatedAt,
		Message:   tweet.Message,
		User:      nil,
		Likes:     tweet.Likes,
		Replies:   tweet.Replies,
		Retweets:  tweet.Retweets,
		Views:     tweet.Views,
	}

	return tweetResponse
}

func TweetsToResponses(tweets []models.Tweet) []models.TweetResponse {
	responses := make([]models.TweetResponse, len(tweets))
	for i, t := range tweets {
		responses[i] = TweetToResponse(t)
	}

	return responses
}

func TweetToResponseUser(tweet models.Tweet) (models.TweetResponse, error) {
	var tweetResponse models.TweetResponse
	if tweet.User == nil {
		log.Print("User field not preloaded")
		return tweetResponse, errors.New("User field not preloaded")
	}

	tweetResponse = TweetToResponse(tweet)
	tweetResponse.User = &models.UserResponse{
		ID:            tweet.User.ID,
		Username:      tweet.User.Username,
		Name:          tweet.User.Name,
		ProfilePicUrl: tweet.User.ProfilePicUrl,
	}

	return tweetResponse, nil
}

func TweetsToResponsesUser(tweets []models.Tweet) ([]models.TweetResponse, error) {
	responses := make([]models.TweetResponse, len(tweets))
	for i, t := range tweets {
		res, err := TweetToResponseUser(t)
		if err != nil {
			return responses, err
		}
		responses[i] = res
	}

	return responses, nil
}

func UserToResponse(user models.User) models.UserResponse {
	return models.UserResponse{
		ID:            user.ID,
		Username:      user.Username,
		Name:          user.Name,
		Tweets:        nil,
		ProfilePicUrl: user.ProfilePicUrl,
	}
}

func UsersToResponses(users []models.User) []models.UserResponse {
	responses := make([]models.UserResponse, len(users))
	for i, u := range users {
		responses[i] = UserToResponse(u)
	}
	return responses
}

func UserToResponseTweets(user models.User) (models.UserResponse, error) {
	var userResponse models.UserResponse
	userTweets, err := TweetsToResponsesUser(user.Tweets)
	if err != nil {
		return userResponse, err
	}

	userResponse = UserToResponse(user)
	userResponse.Tweets = userTweets

	return userResponse, nil
}

func UsersToResponsesTweets(users []models.User) ([]models.UserResponse, error) {
	responses := make([]models.UserResponse, len(users))
	for i, u := range users {
		res, err := UserToResponseTweets(u)
		if err != nil {
			return responses, err
		}
		responses[i] = res
	}
	return responses, nil
}
