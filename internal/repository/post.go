package repository

import (
	"github.com/NicholasLiem/BE_T_SharingVision/internal/datastruct"
	"gorm.io/gorm"
)

type PostQuery interface {
	CreatePost(post datastruct.Post) (bool, error)
	UpdatePost(postId uint, updatedPost datastruct.Post) (bool, error)
	DeletePost(postId uint) (bool, error)
	GetPost(postId uint) (*datastruct.Post, error)
}

type postQuery struct {
	mysqldb *gorm.DB
}

func NewPostQuery(mysql *gorm.DB) PostQuery {
	return &postQuery{
		mysqldb: mysql,
	}
}

func (pq *postQuery) CreatePost(post datastruct.Post) (bool, error) {
	result := pq.mysqldb.Create(&post)
	if result.Error != nil {
		return false, result.Error
	}
	return true, nil
}

func (pq *postQuery) UpdatePost(postId uint, updatedPost datastruct.Post) (bool, error) {
	var post datastruct.Post
	if err := pq.mysqldb.First(&post, postId).Error; err != nil {
		return false, err
	}

	result := pq.mysqldb.Model(&post).Updates(updatedPost)
	if result.Error != nil {
		return false, result.Error
	}
	return true, nil
}

func (pq *postQuery) DeletePost(postId uint) (bool, error) {
	var post datastruct.Post
	if err := pq.mysqldb.First(&post, postId).Error; err != nil {
		return false, err
	}

	result := pq.mysqldb.Delete(&post)
	if result.Error != nil {
		return false, result.Error
	}
	return true, nil
}

func (pq *postQuery) GetPost(postId uint) (*datastruct.Post, error) {
	var post datastruct.Post
	if err := pq.mysqldb.First(&post, postId).Error; err != nil {
		return nil, err
	}
	return &post, nil
}
