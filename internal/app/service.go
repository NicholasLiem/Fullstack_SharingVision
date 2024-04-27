package app

import "github.com/NicholasLiem/BE_T_SharingVision/internal/service"

type MicroserviceServer struct {
	postService service.PostService
}

func NewMicroservice(
	postService service.PostService,
) *MicroserviceServer {
	return &MicroserviceServer{
		postService: postService,
	}
}
