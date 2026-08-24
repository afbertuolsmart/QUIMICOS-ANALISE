import React from "react";
import { Card } from "@/components/ui/card";
import { fmtQty } from "@/lib/dashboardData";
import { Boxes, Package, Warehouse, ShoppingCart, Activity, Globe2 } from "lucide-react";

export function SummaryCards({ summary }) {
  const cards = [
    { label: "Estoque Total", value: summary.estoque, icon: Boxes, color: "text-blue-600", bg: "bg-blue-50", sub: "Nacional + Paraguai + EADI" },
    { label: "Estoque Nacional", value: summary.estoqueNacional, icon: Package, color: "text-slate-700", bg: "bg-slate-100", sub: "Estoque físico nacional" },
    { label: "Estoque Paraguai", value: summary.estoqueParaguai, icon: Globe2, color: "text-emerald-600", bg: "bg-emerald-50", sub: "Estoque físico Paraguai" },
    { label: "Estoque EADI", value: summary.estoqueEadi, icon: Warehouse, color: "text-violet-600", bg: "bg-violet-50", sub: "Estoque físico EADI" },
    { label: "Compras", value: summary.compras, icon: ShoppingCart, color: "text-amber-600", bg: "bg-amber-50", sub: `Nacional ${fmtQty(summary.comprasNacional)} • PY ${fmtQty(summary.comprasParaguai)}` },
    { label: "Consumo 12M", value: summary.consumo, icon: Activity, color: "text-orange-600", bg: "bg-orange-50", sub: "Últimos 12 meses" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="p-4">
          <div className={`inline-flex rounded-lg p-2 ${card.bg}`}>
            <card.icon className={`h-5 w-5 ${card.color}`} />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">{card.label}</div>
          <div className="mt-1 text-2xl font-bold">{fmtQty(card.value)}</div>
          <div className="mt-1 text-[11px] leading-4 text-muted-foreground">{card.sub}</div>
        </Card>
      ))}
    </div>
  );
}
