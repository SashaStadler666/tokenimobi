
import { motion } from "framer-motion";
import { Home, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InfoGraphicSection = () => {
  const steps = [
    {
      icon: Home,
      title: "Escolha sua propriedade",
      description: "Navegue entre opções urbanas e rurais tokenizadas. Veja detalhes, localização e rentabilidade estimada.",
      ariaLabel: "Ícone casa"
    },
    {
      icon: ShieldCheck,
      title: "Invista com segurança",
      description: "A partir de R$1.000 você pode adquirir frações tokenizadas registradas em blockchain, com total transparência.",
      ariaLabel: "Ícone segurança"
    },
    {
      icon: TrendingUp,
      title: "Acompanhe seus ganhos",
      description: "Veja rendimentos, valorização, histórico de distribuição e negocie suas frações no marketplace quando quiser.",
      ariaLabel: "Ícone crescimento"
    }
  ];

  return (
    <section className="bg-white text-zinc-900 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona a Tokenização Imobiliária</h2>
        <p className="text-zinc-600 max-w-2xl mx-auto mb-12">
          Entenda de forma simples como investir em imóveis com tecnologia blockchain a partir de R$1.000.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-6 rounded-xl shadow-lg border border-zinc-200 bg-white"
            >
              <div className="flex justify-center mb-3">
                <step.icon className="h-10 w-10 text-primary" aria-label={step.ariaLabel} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/tokens">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
              Comece a Investir Agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InfoGraphicSection;
