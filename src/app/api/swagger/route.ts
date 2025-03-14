import { NextRequest, NextResponse } from "next/server";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "🚀 Tài liệu API - Dự án website GAS",
    version: "1.0.0",
    description: "Tài liệu API của dự án website GAS",
  },
  servers: [
    {
      url: "http://localhost:3000",
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
