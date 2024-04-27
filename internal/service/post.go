package service

import (
	"github.com/NicholasLiem/BE_T_SharingVision/internal/datastruct"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/repository"
	"github.com/NicholasLiem/BE_T_SharingVision/utils"
)

type PostService interface {
	CreatePost(post datastruct.Post) (*datastruct.Post, *utils.HttpError)
	UpdatePost(postID uint) (*datastruct.Post, *utils.HttpError)
	DeletePost(PostID uint) (*datastruct.Post, *utils.HttpError)
	GetPost(postID uint) (*datastruct.Post, *utils.HttpError)
}

type postService struct {
	dao repository.DAO
}

func NewPostService(dao repository.DAO) PostService {
	return &postService{dao: dao}
}

func (as *postService) CreatePost(post datastruct.Post) (*datastruct.Post, *utils.HttpError) {
	return nil, nil
}

func (as *postService) UpdatePost(postID uint) (*datastruct.Post, *utils.HttpError) {
	return nil, nil
}

func (as *postService) DeletePost(postID uint) (*datastruct.Post, *utils.HttpError) {
	return nil, nil
}

func (as *postService) GetPost(postID uint) (*datastruct.Post, *utils.HttpError) {
	return nil, nil
}
