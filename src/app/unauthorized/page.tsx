
'use client'
export default function Unauthorized() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
      <p className="mt-4">Bạn không có quyền truy cập vào trang này.</p>
    </div>
  )
}
