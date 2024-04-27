package app

import (
	"encoding/json"
	"github.com/NicholasLiem/BE_T_SharingVision/internal/datastruct"
	"gorm.io/gorm"
	"net/http"
)

func (m *MicroserviceServer) CreatePost(rw http.ResponseWriter, r *http.Request) {
	var article datastruct.Post
	err := json.NewDecoder(r.Body).Decode(&article)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusBadRequest)
		return
	}

	db := r.Context().Value("db").(*gorm.DB)
	if result := db.Create(&article); result.Error != nil {
		http.Error(rw, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	rw.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(rw).Encode(article)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (m *MicroserviceServer) ShowPostWithPaging(rw http.ResponseWriter, r *http.Request) {
	err := json.NewEncoder(rw).Encode("Hello")
	if err != nil {
		return
	}
}

func (m *MicroserviceServer) ShowPost(rw http.ResponseWriter, r *http.Request) {
	err := json.NewEncoder(rw).Encode("Hello")
	if err != nil {
		return
	}
}
func (m *MicroserviceServer) UpdatePost(rw http.ResponseWriter, r *http.Request) {
	err := json.NewEncoder(rw).Encode("Hello")
	if err != nil {
		return
	}
}
func (m *MicroserviceServer) DeletePost(rw http.ResponseWriter, r *http.Request) {
	err := json.NewEncoder(rw).Encode("Hello")
	if err != nil {
		return
	}
}
