package main

import (
	"net/http"
	"testing"

	"github.com/gavv/httpexpect"
	"github.com/mantil-team/demo-chat/api/ping"
)

func TestPing(t *testing.T) {
	api := httpexpect.New(t, apiURL)

	api.POST("/ping").
		Expect().
		Status(http.StatusOK).
		Body().Equal("pong")

	api.POST("/ping/hello").
		Expect().
		Status(http.StatusOK).
		Body().Equal("Hello, ")

	api.POST("/ping/hello").
		WithBytes([]byte("World")).
		Expect().
		Status(http.StatusOK).
		Body().Equal("Hello, World")

	req := ping.Request{Name: "My Name"}
	api.POST("/ping/reqrsp").
		WithJSON(req).
		Expect().
		ContentType("application/json").
		Status(http.StatusOK).
		JSON().Object().
		Value("Response").String().Equal("Hello, My Name")

	// method which returns error
	api.POST("/ping/reqrsp2").
		Expect().
		ContentType("application/json").
		Status(http.StatusInternalServerError).
		Header("x-api-error").Equal("request not found")

	// method which don't exists
	api.POST("/ping/non-existent-method").
		Expect().
		Status(http.StatusNotImplemented)
}
