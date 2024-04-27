package repository

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"os"
)

type DAO interface {
	NewPostQuery() PostQuery
}

type dao struct {
	mysqldb *gorm.DB
}

func NewDAO(db *gorm.DB) DAO {
	return &dao{
		mysqldb: db,
	}
}

func SetupDB() *gorm.DB {
	var dbHost = os.Getenv("DB_HOST")
	var dbName = os.Getenv("DB_NAME")
	var dbUsername = os.Getenv("DB_USERNAME")
	var dbPassword = os.Getenv("DB_PASSWORD")
	var dbPort = os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUsername, dbPassword, dbHost, dbPort, dbName)

	var err error
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database: " + err.Error())
	}

	sqlDB, err := db.DB()
	if err != nil {
		panic("Failed to connect to get DB instance: " + err.Error())
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)

	log.Println("[MySQL] Connected to DB instance")
	return db
}

func (d *dao) NewPostQuery() PostQuery {
	return NewPostQuery(d.mysqldb)
}
