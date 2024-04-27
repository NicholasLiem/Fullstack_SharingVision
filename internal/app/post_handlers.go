package app

import (
	"encoding/json"
	"net/http"
)

func (m *MicroserviceServer) CreatePost(rw http.ResponseWriter, r *http.Request) {
	rw.WriteHeader(http.StatusCreated)
	err := json.NewEncoder(rw).Encode("hello")
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
