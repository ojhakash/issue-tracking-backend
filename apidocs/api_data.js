define({ "api": [
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "delete",
    "url": "/api/v1/comment/:commentId/remove",
    "title": "api for get all comments belong to a issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "commentId",
            "optional": false,
            "field": "commentId",
            "description": "<p>commentId of the issue to be watched. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Successfully remove the Comment\",\n    \"status\": 200,\n    \"data\": {\n        \"commentId\": \"IU318PYxL\",\n        \"comment\": \"comment 4\",\n        \"issue\": \"6VtFkzpcn\",\n        \"commentedBy\": \"5c03b14c4d98b205d3fa971f\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/comment.js",
    "groupTitle": "comment",
    "name": "DeleteApiV1CommentCommentidRemove"
  },
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/comment/:issueId/all",
    "title": "api for get all comments belong to a issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "issueId",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue to be watched. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sucessfully added the issue\",\n    \"status\": 200,\n    \"data\": {\n        \"watcherAddedTime\": \"2018-12-07T15:29:03.000Z\",\n        \"_id\": \"5c0a91bf86dd5204a320e6ae\",\n        \"watcherId\": \"iC8xT7yP3\",\n        \"watcher\": \"_3kGgiCCB\",\n        \"issue\": \"6VtFkzpcn\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/comment.js",
    "groupTitle": "comment",
    "name": "GetApiV1CommentIssueidAll"
  },
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/watcher/add",
    "title": "api for add comment.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sucessfully added the comment\",\n    \"status\": 200,\n    \"data\": {\n        \"commentId\": \"0GcUkpFEA\",\n        \"comment\": \"it's just a alot comment\",\n        \"issue\": \"6VtFkzpcn\",\n        \"commentedBy\": \"5c03b14c4d98b205d3fa971f\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/comment.js",
    "groupTitle": "comment",
    "name": "PostApiV1WatcherAdd"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "delete",
    "url": "/api/v1/issue/:issueId/remove",
    "title": "api for get single issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"Issue details updated\",\n   \"status\": 200,\n   \"data\": \n       {\n           \"description\": \"<p><span style=\\\"color:red;\\\">Hello</span>, world! i &#39;m there my bug</p>\",\n           \"status\": \"done\",\n           \"createdAt\": \"2018-12-02T10:18:11.000Z\",\n           \"issueId\": \"wfyJR2mJh\",\n           \"title\": \"asfsdgh\",\n           \"reportedBy\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           },\n           \"assignedTo\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           }\n       }\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issue",
    "name": "DeleteApiV1IssueIssueidRemove"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/all/:pageNo",
    "title": "api for add issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "pageNo",
            "optional": false,
            "field": "number",
            "description": "<p>pageNo of issue . (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All Issue Details Found\",\n   \"status\": 200,\n   \"data\": [\n       {\n           \"description\": \"<p><span style=\\\"color:red;\\\">Hello</span>, world! i &#39;m there my bug</p>\",\n           \"status\": \"done\",\n           \"createdAt\": \"2018-12-02T10:18:11.000Z\",\n           \"issueId\": \"wfyJR2mJh\",\n           \"title\": \"asfsdgh\",\n           \"reportedBy\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           },\n           \"assignedTo\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           }\n       },\n       {\n           \"description\": \"<p><span style=\\\"color:red;\\\">Hello</span>, world!</p>\",\n           \"status\": \"inProgress\",\n           \"createdAt\": \"2018-12-02T11:40:58.000Z\",\n           \"issueId\": \"3cKJvM5MY\",\n           \"title\": \"asfsdgh\",\n           \"reportedBy\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           },\n           \"assignedTo\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           }\n       }]\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueAllPageno"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/all/:pageNo",
    "title": "api for add issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "pageNo",
            "optional": false,
            "field": "number",
            "description": "<p>pageNo of issue . (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All Issue Details Found\",\n   \"status\": 200,\n   \"data\": [\n       {\n           \"description\": \"<p><span style=\\\"color:red;\\\">Hello</span>, world! i &#39;m there my bug</p>\",\n           \"status\": \"done\",\n           \"createdAt\": \"2018-12-02T10:18:11.000Z\",\n           \"issueId\": \"wfyJR2mJh\",\n           \"title\": \"asfsdgh\",\n           \"reportedBy\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           },\n           \"assignedTo\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           }\n       },\n       {\n           \"description\": \"<p><span style=\\\"color:red;\\\">Hello</span>, world!</p>\",\n           \"status\": \"inProgress\",\n           \"createdAt\": \"2018-12-02T11:40:58.000Z\",\n           \"issueId\": \"3cKJvM5MY\",\n           \"title\": \"asfsdgh\",\n           \"reportedBy\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           },\n           \"assignedTo\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           }\n       }]\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueAllPageno"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/:issueId",
    "title": "api for get single issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"Issue Details Found\",\n   \"status\": 200,\n   \"data\": \n       {\n           \"description\": \"<p><span style=\\\"color:red;\\\">Hello</span>, world! i &#39;m there my bug</p>\",\n           \"status\": \"done\",\n           \"createdAt\": \"2018-12-02T10:18:11.000Z\",\n           \"issueId\": \"wfyJR2mJh\",\n           \"title\": \"asfsdgh\",\n           \"reportedBy\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           },\n           \"assignedTo\": {\n               \"firstName\": \"Akash\",\n               \"lastName\": \"Ojha\"\n           }\n       }\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueIssueid"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issue/add",
    "title": "api for add issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "description",
            "optional": false,
            "field": "html",
            "description": "<p>description of the description. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "assignedTo",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user to whome the issue is assigned. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sucessfully added the issue\",\n    \"status\": 200,\n    \"data\": {\n        \"issueId\": \"-I-1lKsdI\",\n        \"title\": \"xzcxvcb\",\n        \"assignedTo\": \"5c03b14c4d98b205d3fa971f\",\n        \"reportedBy\": \"5c03b14c4d98b205d3fa971f\",\n        \"status\": \"inProgress\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issue",
    "name": "PostApiV1IssueAdd"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/issue/:issueId/edit",
    "title": "api for get single issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "description",
            "optional": false,
            "field": "html",
            "description": "<p>description of the description. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "assignedTo",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user to whome the issue is assigned. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sucessfully added the issue\",\n    \"status\": 200,\n    \"data\": {\n        \"issueId\": \"-I-1lKsdI\",\n        \"title\": \"xzcxvcb\",\n        \"assignedTo\": \"5c03b14c4d98b205d3fa971f\",\n        \"reportedBy\": \"5c03b14c4d98b205d3fa971f\",\n        \"status\": \"inProgress\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issue",
    "name": "PutApiV1IssueIssueidEdit"
  },
  {
    "group": "notification",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/notification/all",
    "title": "api for get notifications of logged in user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All Notification Details Found\",\n    \"status\": 200,\n    \"data\": {\n        {\n            issueId: \"3cKJvM5MY\",\n            notification: \"issue named asfsdgh gets updated\",\n            notificationAddedTime: \"2018-12-09T06:27:55.000Z\",\n            notificationId: \"Q4tvoFnFtq\",\n            userId: \"_3kGgiCCB\",\n            \"__v\": 0\n        },\n        {\n            issueId: \"miXRuu1dx\",\n            notification: \"comment added to the issue named g hjvh\",\n            notificationAddedTime: \"2018-12-09T06:51:19.000Z\",\n            notificationId: \"jerJwIbBpr\",\n            userId: \"_3kGgiCCB\",\n            __v: 0\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/notification.js",
    "groupTitle": "notification",
    "name": "GetApiV1NotificationAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/details",
    "title": "api for get the user details of logged-in user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"_3kGgiCCB\",\n        \"firstName\": \"Akash\",\n        \"lastName\": \"Ojha\",\n        \"createdOn\": \"2018-12-02T10:17:48.000Z\",\n        \"email\": \"akashojha15@gmail.com\",\n        \"mobileNumber\": \"7687886627\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersDetails"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "api for get all users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All User Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"userId\": \"_3kGgiCCB\",\n            \"firstName\": \"Akash\",\n            \"lastName\": \"Ojha\",\n            \"createdOn\": \"2018-12-02T10:17:48.000Z\",\n            \"email\": \"akashojha15@gmail.com\",\n            \"mobileNumber\": \"7687886627\",\n            \"password\": \"$2b$10$bLYDCBEpUb1dcAEXlGYSR.SyPisf8Nq3Dnz65DrGw8Chks3mFXhF6\"\n        },\n        {\n            \"userId\": \"p3fDV7qKJj\",\n            \"firstName\": \"Jennifer\",\n            \"lastName\": \"Harvey\",\n            \"createdOn\": \"2018-12-04T11:45:30.000Z\",\n            \"email\": \"Chester1@yahoo.com\",\n            \"mobileNumber\": \"6984040419\",\n            \"password\": \"$2b$10$lg.yeBXCO7EhA4PN3FV2GOdZ.RSsBEYmDWyLWQMUniv76DZ9LnnIu\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"Login Successful\",\n   \"status\": 200,\n   \"data\": {\n       \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InlFYzRrQW8zYyIsImlhdCI6MTU0NDE5MzM2OTg5NiwiZXhwIjoxNTQ0Mjc5NzY5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6Il8za0dnaUNDQiIsImZpcnN0TmFtZSI6IkFrYXNoIiwibGFzdE5hbWUiOiJPamhhIiwiZW1haWwiOiJha2FzaG9qaGExNUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI3Njg3ODg2NjI3In19.vpGfx2f_O2--wwy9Ala68tBbtNs5F0Aajc5Z4Ur_VtA\",\n       \"userDetails\": {\n           \"userId\": \"_3kGgiCCB\",\n           \"firstName\": \"Akash\",\n           \"lastName\": \"Ojha\",\n           \"email\": \"akashojha15@gmail.com\",\n           \"mobileNumber\": \"7687886627\"\n       }\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api for user logout.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "firstName",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "lastName",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "mobileNumber",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"TBOwVGeI2\",\n        \"firstName\": \"Akash\",\n        \"lastName\": \"Ojha\",\n        \"createdOn\": \"2018-12-07T14:26:25.000Z\",\n        \"_id\": \"5c0a8311131ed3009fdd2c9c\",\n        \"email\": \"akashojha@gmail.com\",\n        \"mobileNumber\": \"7687886625\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "delete",
    "url": "/api/v1/watcher/remove/:issueId",
    "title": "api for unfollow a issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "issueId",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue to be watched. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Successfully unfollow this issue\",\n    \"status\": 200,\n    \"data\": {\n        \"watcherAddedTime\": \"2018-12-07T15:29:03.000Z\",\n        \"_id\": \"5c0a91bf86dd5204a320e6ae\",\n        \"watcherId\": \"iC8xT7yP3\",\n        \"watcher\": \"_3kGgiCCB\",\n        \"issue\": \"6VtFkzpcn\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/watcher.js",
    "groupTitle": "watcher",
    "name": "DeleteApiV1WatcherRemoveIssueid"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/watcher/:issueId",
    "title": "api for check user is watcher.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "issueId",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue to be watched. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Sucessfully verify the watcher\",\n    \"status\": 200,\n    \"data\": {\n        \"watcherAddedTime\": \"2018-12-07T15:29:03.000Z\",\n        \"_id\": \"5c0a91bf86dd5204a320e6ae\",\n        \"watcherId\": \"iC8xT7yP3\",\n        \"watcher\": \"_3kGgiCCB\",\n        \"issue\": \"6VtFkzpcn\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/watcher.js",
    "groupTitle": "watcher",
    "name": "GetApiV1WatcherIssueid"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/watcher/add",
    "title": "api for user add watcher.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "authToken",
            "optional": false,
            "field": "string",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "issueId",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue to be watched. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sucessfully added the issue\",\n    \"status\": 200,\n    \"data\": {\n        \"watcherAddedTime\": \"2018-12-07T15:29:03.000Z\",\n        \"_id\": \"5c0a91bf86dd5204a320e6ae\",\n        \"watcherId\": \"iC8xT7yP3\",\n        \"watcher\": \"_3kGgiCCB\",\n        \"issue\": \"6VtFkzpcn\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/watcher.js",
    "groupTitle": "watcher",
    "name": "PostApiV1WatcherAdd"
  }
] });
