import { NextRequest, NextResponse } from "next/server";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "🚀 Next.js API - Swagger Docs",
    version: "1.0.0",
    description: "Tài liệu API của dự án Gas",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
};

const options = {
    swaggerDefinition,
    apis: ["src/app/api/**/*.ts"],
  }

const swaggerSpec = swaggerJSDoc(options);

export async function GET(req: NextRequest) {
  return NextResponse.json(swaggerSpec);
}
