import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "School Website API",
      version: "1.0.0",
      description:
        "REST API endpoints for the public school website and admin management dashboard.",
    },
    servers: [
      {
        url: "/",
        description: "Current Server",
      },
    ],
    paths: {
      "/api/auth/login": {
        post: {
          summary: "Admin Login",
          description:
            "Authenticates admin and returns a secure HTTP-only session cookie.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: { type: "string", example: "admin" },
                    password: { type: "string", example: "admin123" },
                  },
                  required: ["username", "password"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful.",
              headers: {
                "Set-Cookie": {
                  schema: { type: "string" },
                  description:
                    "HTTP-only session cookie named `school_admin_session`",
                },
              },
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          username: { type: "string", example: "admin" },
                          role: { type: "string", example: "admin" },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: { description: "Missing username or password." },
            401: { description: "Invalid credentials." },
          },
        },
      },
      "/api/auth/logout": {
        post: {
          summary: "Admin Logout",
          description: "Clears the active session cookie.",
          responses: {
            200: {
              description: "Logged out successfully.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: {
                        type: "string",
                        example: "Logged out successfully",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/auth/me": {
        get: {
          summary: "Get Current Admin Session",
          description: "Returns profile of currently logged-in administrator.",
          security: [{ CookieAuth: [] }],
          responses: {
            200: {
              description: "User is authenticated.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      authenticated: { type: "boolean", example: true },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          username: { type: "string", example: "admin" },
                          role: { type: "string", example: "admin" },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Not authenticated." },
          },
        },
      },
      "/api/upload": {
        post: {
          summary: "Upload File",
          description:
            "Uploads an attachment PDF or media image to local disk (`public/uploads/`).",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    file: { type: "string", format: "binary" },
                  },
                  required: ["file"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Upload successful.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      url: {
                        type: "string",
                        example: "/uploads/1720235941-23849102.pdf",
                      },
                      name: { type: "string", example: "science-fair.pdf" },
                      size: { type: "integer", example: 10452 },
                      mimeType: { type: "string", example: "application/pdf" },
                    },
                  },
                },
              },
            },
            400: { description: "No file uploaded." },
            401: { description: "Unauthorized admin session." },
          },
        },
      },
      "/api/notices": {
        get: {
          summary: "Get Notices list",
          description:
            "Retrieve a list of notices. Sorted by pinned status and creation date.",
          parameters: [
            {
              name: "pinned",
              in: "query",
              description: "Filter by pinned status ('true' or 'false')",
              required: false,
              schema: { type: "string" },
            },
            {
              name: "search",
              in: "query",
              description: "Search keyword matching title",
              required: false,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "List of notices.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Notice" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create Notice",
          description: "Add a new notice.",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "PTA Meeting" },
                    content: {
                      type: "string",
                      example: "Details about parent meeting",
                    },
                    attachmentUrl: {
                      type: "string",
                      nullable: true,
                      example: "/uploads/file.pdf",
                    },
                    isPinned: { type: "boolean", example: true },
                  },
                  required: ["title", "content"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Notice created successfully.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      notice: { $ref: "#/components/schemas/Notice" },
                    },
                  },
                },
              },
            },
            400: { description: "Invalid parameters." },
            401: { description: "Unauthorized." },
          },
        },
        put: {
          summary: "Update Notice",
          description: "Modify an existing notice.",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    title: { type: "string", example: "Updated PTA Meeting" },
                    content: { type: "string", example: "Updated details" },
                    attachmentUrl: { type: "string", nullable: true },
                    isPinned: { type: "boolean" },
                  },
                  required: ["id", "title", "content"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Notice updated successfully.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      notice: { $ref: "#/components/schemas/Notice" },
                    },
                  },
                },
              },
            },
            404: { description: "Notice not found." },
            401: { description: "Unauthorized." },
          },
        },
        delete: {
          summary: "Delete Notice",
          description: "Remove a notice.",
          security: [{ CookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "query",
              required: true,
              schema: { type: "integer" },
              description: "Notice ID to delete",
            },
          ],
          responses: {
            200: {
              description: "Notice deleted.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: { type: "string" },
                      notice: { $ref: "#/components/schemas/Notice" },
                    },
                  },
                },
              },
            },
            404: { description: "Notice not found." },
          },
        },
      },
      "/api/events": {
        get: {
          summary: "Get Events list",
          description: "Retrieve school events.",
          parameters: [
            {
              name: "filter",
              in: "query",
              description: "Filter: 'upcoming' or 'past'",
              required: false,
              schema: { type: "string", enum: ["upcoming", "past"] },
            },
          ],
          responses: {
            200: {
              description: "List of events.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Event" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create Event",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    date: {
                      type: "string",
                      format: "date",
                      example: "2026-08-15",
                    },
                    location: { type: "string" },
                    imageUrl: { type: "string", nullable: true },
                  },
                  required: ["title", "description", "date", "location"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Event created.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      event: { $ref: "#/components/schemas/Event" },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          summary: "Update Event",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    description: { type: "string" },
                    date: { type: "string", format: "date" },
                    location: { type: "string" },
                    imageUrl: { type: "string", nullable: true },
                  },
                  required: ["id", "title", "description", "date", "location"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Event updated.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      event: { $ref: "#/components/schemas/Event" },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete Event",
          security: [{ CookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "query",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "Event deleted." },
          },
        },
      },
      "/api/blog": {
        get: {
          summary: "Get Blog Posts list",
          parameters: [
            { name: "search", in: "query", schema: { type: "string" } },
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", default: 10 },
            },
            {
              name: "offset",
              in: "query",
              schema: { type: "integer", default: 0 },
            },
          ],
          responses: {
            200: {
              description: "List of blog posts.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      blogs: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Blog" },
                      },
                      pagination: {
                        type: "object",
                        properties: {
                          total: { type: "integer" },
                          limit: { type: "integer" },
                          offset: { type: "integer" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create Blog Post",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    content: { type: "string" },
                    author: { type: "string" },
                    imageUrl: { type: "string", nullable: true },
                  },
                  required: ["title", "content"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Blog post created.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      blog: { $ref: "#/components/schemas/Blog" },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          summary: "Update Blog Post",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    content: { type: "string" },
                    author: { type: "string" },
                    imageUrl: { type: "string", nullable: true },
                  },
                  required: ["id", "title", "content"],
                },
              },
            },
          },
          responses: {
            200: { description: "Blog post updated." },
          },
        },
        delete: {
          summary: "Delete Blog Post",
          security: [{ CookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "query",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "Blog post deleted." },
          },
        },
      },
      "/api/blog/{id}": {
        get: {
          summary: "Get Single Blog Post",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: {
              description: "Blog post detail.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Blog" },
                },
              },
            },
            404: { description: "Blog post not found." },
          },
        },
      },
      "/api/gallery": {
        get: {
          summary: "Get Gallery media",
          parameters: [
            {
              name: "type",
              in: "query",
              schema: { type: "string", enum: ["photo", "video"] },
            },
            { name: "category", in: "query", schema: { type: "string" } },
          ],
          responses: {
            200: {
              description: "List of media items.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Media" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Add Gallery Media",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    type: { type: "string", enum: ["photo", "video"] },
                    url: { type: "string" },
                    caption: { type: "string", nullable: true },
                    category: { type: "string" },
                  },
                  required: ["type", "url"],
                },
              },
            },
          },
          responses: {
            200: { description: "Media added." },
          },
        },
        delete: {
          summary: "Delete Gallery Media",
          description:
            "Remove media metadata and delete the local file if applicable.",
          security: [{ CookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "query",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "Media deleted." },
          },
        },
      },
      "/api/inquiries": {
        post: {
          summary: "Submit Contact Inquiry",
          description: "Public contact form submission. (No auth required)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    subject: { type: "string" },
                    message: { type: "string" },
                  },
                  required: ["name", "email", "subject", "message"],
                },
              },
            },
          },
          responses: {
            200: { description: "Inquiry submitted." },
          },
        },
        get: {
          summary: "Get Inquiries list",
          security: [{ CookieAuth: [] }],
          responses: {
            200: {
              description: "List of contact messages.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Inquiry" },
                  },
                },
              },
            },
          },
        },
        patch: {
          summary: "Update Inquiry Read Status",
          security: [{ CookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    isRead: { type: "boolean" },
                  },
                  required: ["id", "isRead"],
                },
              },
            },
          },
          responses: {
            200: { description: "Inquiry status updated." },
          },
        },
        delete: {
          summary: "Delete Inquiry",
          security: [{ CookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "query",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "Inquiry deleted." },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        CookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "school_admin_session",
          description: "Admin session authorization cookie",
        },
      },
      schemas: {
        Notice: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            content: { type: "string" },
            attachmentUrl: { type: "string", nullable: true },
            isPinned: { type: "boolean" },
            createdAt: { type: "string" },
          },
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            date: { type: "string" },
            location: { type: "string" },
            imageUrl: { type: "string", nullable: true },
            createdAt: { type: "string" },
          },
        },
        Blog: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            content: { type: "string" },
            author: { type: "string" },
            imageUrl: { type: "string", nullable: true },
            createdAt: { type: "string" },
          },
        },
        Media: {
          type: "object",
          properties: {
            id: { type: "integer" },
            type: { type: "string", enum: ["photo", "video"] },
            url: { type: "string" },
            caption: { type: "string", nullable: true },
            category: { type: "string" },
            createdAt: { type: "string" },
          },
        },
        Inquiry: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            subject: { type: "string" },
            message: { type: "string" },
            isRead: { type: "boolean" },
            createdAt: { type: "string" },
          },
        },
      },
    },
  };

  return NextResponse.json(spec);
}
