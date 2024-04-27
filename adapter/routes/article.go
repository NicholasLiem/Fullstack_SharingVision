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
				server.CreateArticle,
				true,
			},
			{
				"Show article with paging",
				"GET",
				"",
				server.ShowArticleWithPaging,
				true,
			},
			{
				"Show article with a specific id",
				"POST",
				"",
				server.ShowArticle,
				true,
			},
			{
				"Update article with new data",
				"PATCH",
				"",
				server.UpdateArticle,
				true,
			},
			{
				"Delete article with specific id",
				"DELETE",
				"",
				server.DeleteArticle,
				true,
			},
		},
	}
}
