package app

import "github.com/NicholasLiem/BE_T_SharingVision/internal/service"

type MicroserviceServer struct {
	articleService service.ArticleService
}

func NewMicroservice(
	articleService service.ArticleService,
) *MicroserviceServer {
	return &MicroserviceServer{
		articleService: articleService,
	}
}
