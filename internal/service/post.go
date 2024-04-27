package service

import (
	"github.com/NicholasLiem/BE_T_SharingVision/internal/datastruct"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/repository"
	"github.com/NicholasLiem/BE_T_SharingVision/utils"
	"net/http"
)

type PostService interface {
	CreatePost(post datastruct.Post) (bool, *utils.HttpError)
	UpdatePost(postID uint, updatedPost datastruct.Post) (bool, *utils.HttpError)
	DeletePost(postID uint) (bool, *utils.HttpError)
	GetPost(postID uint) (*datastruct.Post, *utils.HttpError)
	GetPagedPost(limit int, offset int) (*[]datastruct.PostResponse, *utils.HttpError)
}

type postService struct {
	dao repository.DAO
}

func NewPostService(dao repository.DAO) PostService {
	return &postService{dao: dao}
}

func (ps *postService) CreatePost(post datastruct.Post) (bool, *utils.HttpError) {
	success, err := ps.dao.NewPostQuery().CreatePost(post)
	if err != nil || success == false {
		return false, &utils.HttpError{Message: "Error creating post: " +
			err.Error(), StatusCode: http.StatusInternalServerError}
	}
	return true, nil
}

func (ps *postService) UpdatePost(postID uint, updatedPost datastruct.Post) (bool, *utils.HttpError) {
	success, err := ps.dao.NewPostQuery().UpdatePost(postID, updatedPost)
	if err != nil || success == false {
		return false, &utils.HttpError{Message: "Error updating post: " +
			err.Error(), StatusCode: http.StatusInternalServerError}
	}
	return true, nil
}

func (ps *postService) DeletePost(postID uint) (bool, *utils.HttpError) {
	success, err := ps.dao.NewPostQuery().DeletePost(postID)
	if err != nil || success == false {
		return false, &utils.HttpError{Message: "Error deleting post: " +
			err.Error(), StatusCode: http.StatusInternalServerError}
	}
	return true, nil
}

func (ps *postService) GetPost(postID uint) (*datastruct.Post, *utils.HttpError) {
	post, err := ps.dao.NewPostQuery().GetPost(postID)
	if err != nil {
		return nil, &utils.HttpError{Message: "Error getting post: " +
			err.Error(), StatusCode: http.StatusInternalServerError}
	}
	return post, nil
}

func (ps *postService) GetPagedPost(limit int, offset int) (*[]datastruct.PostResponse, *utils.HttpError) {
	posts, err := ps.dao.NewPostQuery().GetPagedPost(limit, offset)
	if err != nil {
		return nil, &utils.HttpError{Message: "Error getting post: " +
			err.Error(), StatusCode: http.StatusInternalServerError}
	}

	var responses []datastruct.PostResponse
	for _, post := range *posts {
		responses = append(responses, *post.ToPostResponse())
	}

	return &responses, nil
}
