package datastruct

import (
	"errors"
	"gorm.io/gorm"
	"time"
)

type Article struct {
	ID          uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Title       string    `gorm:"size:200;not null" json:"title"`
	Content     string    `gorm:"type:text;not null" json:"content"`
	Category    string    `gorm:"size:100;not null" json:"category"`
	CreatedDate time.Time `gorm:"default:current_timestamp" json:"created_date"`
	UpdatedDate time.Time `gorm:"default:current_timestamp on update current_timestamp" json:"updated_date"`
	Status      string    `gorm:"type:varchar(100);not null;check:status in ('Publish','Draft','Thrash')" json:"status"`
}

func (a *Article) BeforeSave(tx *gorm.DB) (err error) {
	if len(a.Title) < 20 {
		return errors.New("the title must be at least 20 characters long")
	}
	if len(a.Content) < 200 {
		return errors.New("the content must be at least 200 characters long")
	}

	if len(a.Category) < 3 {
		return errors.New("the category must be at least 3 characters long")
	}

	validStatus := map[string]bool{"publish": true, "draft": true, "thrash": true}
	if _, ok := validStatus[a.Status]; !ok {
		return errors.New("invalid status, must be 'publish', 'draft', or 'thrash'")
	}

	return nil

}
