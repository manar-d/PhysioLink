import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
لو مافيه
role
 يعني زائر 
 home
 */

export default function PrivateRoute({ role, children }) {
// عشان لو في خلل يظهر قبل احول النص الى object
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ماسجل دخول ارجع لصفحة تسجيل الخروج 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // لو عنده رابط لصفحه غير مسموح له دخولها وده لصفحة الرئيسيه 
  if (role && user.role !== role) { // مثال لو هو مريض وحاول يدخل صفحه متخصص
    return <Navigate to="/" replace />;
  }

  // غير كذا دخله 
  return children;
}
