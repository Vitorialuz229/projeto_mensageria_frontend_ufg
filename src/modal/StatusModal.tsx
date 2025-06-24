import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface StatusModalProps {
  status: "success" | "error";
  onClose: () => void;
}

export default function StatusModal({ status, onClose }: StatusModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-md p-6 flex items-center gap-4 shadow-lg max-w-sm">
        {status === "success" ? (
          <CheckCircle className="w-8 h-8 text-green-600" />
        ) : (
          <XCircle className="w-8 h-8 text-red-600" />
        )}
        <div>
          {status === "success" ? (
            <>
              <p className="font-semibold text-green-700">Pedido realizado com sucesso!</p>
              <p className="text-sm text-green-600">Você receberá um e-mail com os detalhes da compra.</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-red-700">Erro ao finalizar o pedido.</p>
              <p className="text-sm text-red-600">Tente novamente em instantes.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
