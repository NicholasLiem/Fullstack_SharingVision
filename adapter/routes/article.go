package routes

import (
	"github.com/NicholasLiem/BE_T_SharingVision/adapter/structs"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/app"
)

func ArticleRoutes(server app.MicroserviceServer) structs.RoutePrefix {
	return structs.RoutePrefix{
		Prefix: "/article",
		SubRoutes: []structs.Route{
			{
				"Create a new article",
				"POST",
				"",
				server.CreatePost,
				true,
			},
			{
				"Show article with paging",
				"GET",
				"",
				server.ShowPostWithPaging,
				true,
			},
			{
				"Show article with a specific id",
				"POST",
				"",
				server.ShowPost,
				true,
			},
			{
				"Update article with new data",
				"PATCH",
				"",
				server.UpdatePost,
				true,
			},
			{
				"Delete article with specific id",
				"DELETE",
				"",
				server.DeletePost,
				true,
			},
		},
	}
}
