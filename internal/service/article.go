package service

import (
	"github.com/NicholasLiem/BE_T_SharingVision/internal/datastruct"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/repository"
	"github.com/NicholasLiem/BE_T_SharingVision/utils"
)

type ArticleService interface {
	CreateArticle(Article datastruct.Article) (*datastruct.Article, *utils.HttpError)
	UpdateArticle(ArticleID uint) (*datastruct.Article, *utils.HttpError)
	DeleteArticle(ArticleID uint) (*datastruct.Article, *utils.HttpError)
	GetArticle(ArticleID uint) (*datastruct.Article, *utils.HttpError)
}

type articleService struct {
	dao repository.DAO
}

func NewArticleService(dao repository.DAO) ArticleService {
	return &articleService{dao: dao}
}

func (as *articleService) CreateArticle(article datastruct.Article) (*datastruct.Article, *utils.HttpError) {
	return nil, nil
}

func (as *articleService) UpdateArticle(articleID uint) (*datastruct.Article, *utils.HttpError) {
	return nil, nil
}

func (as *articleService) DeleteArticle(articleID uint) (*datastruct.Article, *utils.HttpError) {
	return nil, nil
}

func (as *articleService) GetArticle(articleID uint) (*datastruct.Article, *utils.HttpError) {
	return nil, nil
}
