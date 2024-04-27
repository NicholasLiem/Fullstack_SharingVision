package repository

import (
	"github.com/NicholasLiem/BE_T_SharingVision/internal/datastruct"
	"gorm.io/gorm"
)

type PostQuery interface {
	CreatePost(Post datastruct.Post) (*datastruct.Post, error)
	UpdatePost(PostId uint) (*datastruct.Post, error)
	DeletePost(PostId uint) (*datastruct.Post, error)
	GetPost(PostId uint) (*datastruct.Post, error)
}

type postQuery struct {
	mysqldb *gorm.DB
}

func NewPostQuery(mysql *gorm.DB) PostQuery {
	return &postQuery{
		mysqldb: mysql,
	}
}

func (aq *postQuery) CreatePost(post datastruct.Post) (*datastruct.Post, error) {
	return nil, nil
}

func (aq *postQuery) UpdatePost(postId uint) (*datastruct.Post, error) {
	return nil, nil
}

func (aq *postQuery) DeletePost(postId uint) (*datastruct.Post, error) {
	return nil, nil
}

func (aq *postQuery) GetPost(postId uint) (*datastruct.Post, error) {
	return nil, nil
}
