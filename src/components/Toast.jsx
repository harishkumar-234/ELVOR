import React from 'react';
import { CheckCircle, Info, ShoppingBag } from 'lucide-react';

export default function Toast({ toastList }) {
  if (!toastList || toastList.length === 0) return null;

  return (
    <div className="toast-container">
      {toastList.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.type === 'cart' ? (
            <ShoppingBag size={18} color="#f4eee5" />
          ) : toast.type === 'success' ? (
            <CheckCircle size={18} color="#4ade80" />
          ) : (
            <Info size={18} color="#60a5fa" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
