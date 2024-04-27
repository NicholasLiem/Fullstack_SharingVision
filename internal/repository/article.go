package repository

import (
	"github.com/NicholasLiem/BE_T_SharingVision/internal/datastruct"
	"gorm.io/gorm"
)

type ArticleQuery interface {
	CreateArticle(article datastruct.Article) (*datastruct.Article, error)
	UpdateArticle(articleId uint) (*datastruct.Article, error)
	DeleteArticle(articleId uint) (*datastruct.Article, error)
	GetArticle(articleId uint) (*datastruct.Article, error)
}

type articleQuery struct {
	mysqldb *gorm.DB
}

func NewArticleQuery(mysql *gorm.DB) ArticleQuery {
	return &articleQuery{
		mysqldb: mysql,
	}
}

func (aq *articleQuery) CreateArticle(article datastruct.Article) (*datastruct.Article, error) {
	return nil, nil
}

func (aq *articleQuery) UpdateArticle(articleId uint) (*datastruct.Article, error) {
	return nil, nil
}

func (aq *articleQuery) DeleteArticle(articleId uint) (*datastruct.Article, error) {
	return nil, nil
}

func (aq *articleQuery) GetArticle(articleId uint) (*datastruct.Article, error) {
	return nil, nil
}
