import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const termosAceitos = localStorage.getItem("termosAceitos");
    if (!termosAceitos) {
      navigate("/termos-de-uso");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Bem-vindo ao seu painel de controle da Token Imobi.</p>
        
        {/* Conteúdo do dashboard aqui */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <p className="text-center text-muted-foreground">
            Área em desenvolvimento. Em breve você poderá gerenciar seus tokens e acompanhar seus investimentos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
