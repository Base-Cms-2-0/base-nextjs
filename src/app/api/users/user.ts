import { NextRequest, NextResponse } from "next/server";

let users = [
  { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
  { id: 2, name: "Trần Thị B", email: "b@example.com" },
];

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách users
 *     description: Trả về danh sách tất cả users
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
export async function GET(req: NextRequest) {
  return NextResponse.json(users);
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Thêm user mới
 *     description: Tạo một user mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User được tạo thành công
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const newUser = { id: users.length + 1, ...body };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin user
 *     description: Cập nhật thông tin user dựa trên ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User được cập nhật thành công
 */
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split("/").pop() || "");
  const body = await req.json();

  users = users.map((user) => (user.id === id ? { ...user, ...body } : user));
  return NextResponse.json({ message: "Cập nhật thành công" });
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa user
 *     description: Xóa user theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User đã bị xóa
 */
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split("/").pop() || "");

  users = users.filter((user) => user.id !== id);
  return NextResponse.json({ message: "Xóa thành công" });
}
